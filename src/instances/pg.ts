/*
    Este arquivo é onde criaremos a nossa conexão  de maneira que ela fique em um arquivo separado e poderemos usar em qualquer lugar no nosso sistema
 */

import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize(
    process.env.PG_DB as string, //1º parâmetro é o nome do banco de dados
    process.env.PG_USER as string,//2º parâmetro é o nome de usuário do banco de dados
    process.env.PG_PASSWORD as string,//3º parâmetro é a senha do banco de dados
    {             //O 4º parâmetro é um objeto com configurações especificas 
        dialect: 'postgres', // qual é o banco de dados que usaremos
        port: parseInt(process.env.PG_PORT as string)
    }
)