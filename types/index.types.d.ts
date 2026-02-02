export interface DbConfigTypes {
    user: string | undefined;
    password: string | undefined;
    server: string | undefined;
    database: string | undefined;
    port: number;
    options: {
        encrypt: boolean;
        trustServerCertificate: boolean;
    };
}

export interface IUser {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}

export interface UserResponse {
    success: boolean;
    users?: IUser[] | null;
    user?: IUser | null;
    message: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string | number;
                firstname?: string;
                lastname?: string;
                email?: string;
                role?: string;
                // Другие свойства пользователя...
            };
        }
    }
}
