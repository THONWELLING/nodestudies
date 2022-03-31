import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';


// para criar o type específico para o usuário no meu model e estender com o type do Model do próprio sequelize precisamos usar o interface
export interface UserInstance extends Model {
    id: number;
    firstname: string;
    age: number;
    lastname: string;
}


//ensinando o sequelize a manipular  o banco de dados
//
// 1º parâmetro colocamos o nome do m model no caso é User
// 2º parâmetro colocamos algumas configurações  onde dizemos para o sequelize os  campos da tabela no banco de dados.
// 3º parâmetro  colocamos propriedades específicas para o próprio sequelize

export const User = sequelize.define<UserInstance>("User", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 18
    }
}, {
    tableName: 'users',  // colocamos aqui o nome exato da tabela 
    timestamps: false    // aqui nós  determinamos que não existe os campos ceatedAt e o updatedAt
});