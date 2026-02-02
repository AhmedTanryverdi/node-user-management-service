import {UserModel} from "../models/usersModel";
import {UserResponse} from "../../types/index.types";

export const registerUserService = async (userData: any): Promise<UserResponse> =>{
    const {email} = userData;
    const {success, message} = await UserModel.findUserByEmail(email);

    if(success){
        return { success: false, message };
    }
    return  UserModel.registerUser(userData);
}

export const loginUserService = async (
    email: string,
    password: string
): Promise<UserResponse> => {
    const {user} = await UserModel.findUserByEmail(email);

    if (!user) {
        return { success: false, user: null, message: 'Неверное имя пользователя или пароль' };
    }

    const isValid = await UserModel.verifyPassword(user.password, password);
    if (!isValid) {
        return { success: false, user: null, message: 'Неверный пароль' };
    }

    return { success: true, user, message: 'Вход успешен' };
};

export const getUsersService = async (role: string):Promise<UserResponse> =>{
    if(role !== "admin"){
        return {success: false, users: null, message: "Нет прав на получения списка пользователей!"}
    }
    return await UserModel.getUsers();
}

export const getUserByIdService = async (requestedId: number, currentId: number, role: string): Promise<UserResponse>=>{
    if(requestedId !== currentId && role !== "admin"){
        return {success: false, user: null, message: "Нет прав на получения пользователя!"}
    }

    return UserModel.getUserById(requestedId);
}

export const blockUserService = async (blockedId: number, currentId: number, currentRole: string): Promise<UserResponse>=>{
    if(blockedId !== currentId && currentRole !== "admin"){
        return {success: false, message: "Нет прав для выполнения операции!"}
    }

    return UserModel.blockUser(blockedId, currentId);
}