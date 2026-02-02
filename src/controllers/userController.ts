import {Request, Response} from "express";
import {getUsersService, registerUserService, loginUserService, getUserByIdService, blockUserService} from "../services/userService";
import {generateToken} from "../utils/jwt";

export const registerUserController = async (req: any, res: any) => {
    try {
        const userdata = req.body;
        const {id, firstname, lastname, patronym, birthday,email, password, role} = userdata;

        if (!id || !firstname || !lastname || !patronym || !birthday || !email || !password || !role) {
            return res.status(400).json({
                error: 'Required fields: id, firstname, lastname, patronym, birthday, email, password, role'
            });
        }
        const result = await registerUserService(userdata);

        res.status(result.success ? 201 : 400).json(result);
    } catch (err: unknown) {
        const mess = err instanceof Error ? err.message : String(err);
        res.status(500).json({ message: `Ошибка сервера: ${mess}` });
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Required fields: email, password'
            });
        }

        const result = await loginUserService(email, password);

        if (result.success && result.user) {
            // Генерируем JWT-токен
            const token = generateToken({
                id: result.user.id,
                firstname: result.user.firstname,
                lastname: result.user.lastname,
                email: result.user.email,
                role: result.user.role
            });

            res.json({
                message: result.message,
                user: {
                    id: result.user.id,
                    firstname: result.user.firstname,
                    lastname: result.user.lastname,
                    email: result.user.email,
                    role: result.user.role
                },
                token: token,
                expiresIn: '1h'
            });
        } else {
            res.status(401).json({ message: result.message });
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        res.status(500).json({ message: `Ошибка сервера: ${message}` });
    }
};

export const getUserByIdController = async (req: Request, res: Response) =>{
    try{
        const requestedId = req.params.id;
        if(!requestedId){
            return res.status(400).json({error: 'В запросе указан некорректный параметр id!'});
        }

        const {id: currentId, role: currentRole} = {...req.user};
        if(!currentId || !currentRole){
            return res.status(400).json({error: 'id или role текущего пользователя некоректны!'})
        }

        const result = await getUserByIdService(+requestedId, +currentId, currentRole);
        res.status(result.success ? 201 : 400).json(result);
    }catch (err: unknown){
        const message = err instanceof Error ? err.message: String(err);
        res.status(500).json({message: `Ошибка сервера: ${message}`});
    }
}

export const getUsersController = async (req: any, res: any)=>{
    try{
        const {role} = {...req.user};

        if (!role) {
            return res.status(401).json({ error: 'значение role неккоректен!' });
        }
        const result = await getUsersService(role);

        res.status(200).json(result);

    }catch(err: unknown) {
        const mess = err instanceof Error ? err.message: String(err);
        res.status(500).json({success: false, users: null, message: `Ошибка сервера: ${mess}`});
    }
}

export const blockUserController = async (req: Request, res: Response)=>{
    const blockedId = Number(req.params.id);

    if(!blockedId){
        res.status(401).json({success: false, message: 'Некоректный параметр id!'})
    }

    const {id: currentId, role: currentRole} = {...req.user};

    const result = await blockUserService(blockedId, Number(currentId), String(currentRole));

    if(!result.success){
        res.status(401).json({success: false, message: `Нет прав на выполнение!`})
    }
    res.status(201).json({success: true, message: `Пользователь c id ${blockedId} заблокирован!`})
}
