import {UserModel} from "../models/usersModel";
import {IRecordSet} from "mssql";

export const registerUser = async (userData: any): Promise<{ success: boolean; message: string }> =>{
    const {email} = userData;

    const existingUser = await UserModel.findUserByEmail(email);

    if(existingUser){
        return { success: false, message: 'Пользователь уже существует' };
    }

    return  UserModel.registerUser(userData);
}

export const loginUser = async (
    email: string,
    password: string
): Promise<{ success: boolean; user: any | null; message: string }> => {
    const user = await UserModel.findUserByEmail(email);
    if (!user) {
        return { success: false, user: null, message: 'Неверное имя пользователя или пароль' };
    }

    const isValid = await UserModel.verifyPassword(user.password, password);
    if (!isValid) {
        return { success: false, user: null, message: 'Неверный пароль' };
    }

    return { success: true, user, message: 'Вход успешен' };
};

export const getUsersService = async (role: string):Promise<{success: boolean, users: IRecordSet<any> | null, message: string}> =>{
    if(role !== "admin"){
        return {success: false, users: null, message: "Нет прав на получения списка пользователей!"}
    }
    return await UserModel.getUsers();
}

export const getUserByIdService = async (requestedId: number, currentId: number, role: string): Promise<{success: boolean, user: IRecordSet<any> | null, message: string}>=>{
    if(requestedId !== currentId && role !== "admin"){
        return {success: false, user: null, message: "Нет прав на получения пользователя!"}
    }

    return UserModel.getUserById(requestedId);
}

export const blockUserService = async (blockedId: number, currentId: number, currentRole: string): Promise<{success: boolean, message: string}>=>{
    if(blockedId !== currentId && currentRole !== "admin"){
        return {success: false, message: "Нет прав для выполнения операции!"}
    }

    return UserModel.blockUser(blockedId, currentId);
}