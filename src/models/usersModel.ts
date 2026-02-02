import {sqlServer} from '../config/database';
import bcrypt from 'bcryptjs';
import {UserResponse} from "../../types/index.types";

export class UserModel{
    static async getUsers():Promise<UserResponse> {
        try{
            const result = await sqlServer.query`SELECT * FROM users`;
            return {success: true, users: result.recordset, message: "Запрос выполнен!"}
        }catch(err: unknown){
            const message = err instanceof Error ? err.message: String(err);
            return {success: false, users: null, message: `Не удалось выпольнить запрос! Ошибка: ${message}`}
        }
    }

    static async getUserById(id: number):Promise<UserResponse> {
        try{
            const result = await sqlServer.query`
                select * 
                from users as u 
                where u.id = ${id}
            `
            return {success: true, user: result.recordset[0], message: "Запрос успешно выполнен!"};
        }catch (err: unknown){
            const message = err instanceof Error ? err.message: String(err);
            return {success: false, user: null, message: `Ошибка запроса: ${message}`};
        }
    }

    static async blockUser(blockedId: number, currentId:number): Promise<UserResponse>{
        const currentDate = new Date();
        try{
            await  sqlServer.query`
                INSERT INTO blocked_users (user_id, blocked_at, unblocked_at, blocked_by)
                VALUES (${blockedId}, ${currentDate}, null, ${currentId});
            `
            return {success: true, message: `Пользователь с id ${blockedId} заблокирован!`}
        }catch (err: unknown){
            const message = err instanceof Error ? err.message: String(err);
            return {success: false, message: `Операция блокировки не выполнена: ${message}`}
        }
    }

    static async registerUser(userData: any): Promise<UserResponse>{
        const {id, firstname, lastname, patronym, birthday,email, password, role, is_active} = userData;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        try {
            await sqlServer.query`
                INSERT INTO users (id, 
                                   firstname, 
                                   lastname, 
                                   patronym, 
                                   birthday,
                                   email, 
                                   password, 
                                   role, 
                                   is_active)
                VALUES (${id},
                        ${firstname}, 
                        ${lastname}, 
                        ${patronym}, 
                        ${birthday}, 
                        ${email}, 
                        ${passwordHash}, 
                        ${role}, 
                        ${is_active})
            `;
            return {success: true, message: 'Регистрация прошла успешно'};
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message: String(err);
            return {success: false, message: `Ошибка при регистрации: ${message}`};
        }
    }

    static async findUserByEmail(email: string): Promise<UserResponse>{
        try {
            const result = await sqlServer.query`
            SELECT * FROM users WHERE email = ${email}
            `;

            return {success: Boolean(result.recordset.length), user: result.recordset[0], message: 'Запрос выполнен!'};
        }catch (err: unknown){
            const message = err instanceof Error ? err.message: String(err);
            return {success: false, user: null, message: `Ошибка запроса: ${message}`}
        }
    }

    static async verifyPassword(
        storedHash: string,
        providedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(providedPassword, storedHash);
    }
}