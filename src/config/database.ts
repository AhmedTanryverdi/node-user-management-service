import sql from 'mssql';
import {DbConfigTypes} from '../../types/index.types';
import dotenv from 'dotenv';

dotenv.config();

export const config: DbConfigTypes = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DATABASE,
    port: process.env.DB_PORT && parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}

export const connectDB = async ()=>{

    try{
        if (!config.user) {
            throw new Error('Отсутствует DB_USER');
        }
        if (!config.password) {
            throw new Error('Отсутствует DB_PASSWORD');
        }
        if (!config.server) {
            throw new Error('Отсутствует DB_SERVER');
        }
        if (!config.database) {
            throw new Error('Отсутствует DATABASE');
        }

        const dbConfig: sql.config = {
            user: config.user,
            password: config.password,
            server: config.server,
            database: config.database,
            port: config.port,
            options: config.options
        };

        await sql.connect(dbConfig);
        console.log("Подключено к SQL Server");
    }catch(err: unknown){
        const message = err instanceof Error ? err.message : String(err);
        console.error("Ошибка подключения к SQL:", message);
        process.exit(1);
    }
}

export const sqlServer = sql;