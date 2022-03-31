import { Request, Response } from 'express';
//import { sequelize } from '../instances/pg';
import { Op } from 'sequelize';
import { Product } from '../models/Product';
import { User } from '../models/User';

export const home = async (req: Request, res: Response) => {
//atualizando  dados -PARA ISSO USAREMOS A FUNÇÃO UPDATE.
//ESSA FUNÇÃO TEM 2 PARÂMETROS SENDO QUE: O 1º SÃO OS DADOS A SEREM ALTERADOS E
//O 2º SÃO AS CONDIÇÕES PARA ENCONTRAR O(OS) ITEM(NS)
    // await User.update({ lastname: 'Xico'}, {
    //     where: {
    //         id: 15
    //     }
    // })

    //ATUALIZANDO DADOS DE UM REGISTRO ESPECÍFICO

    let results = await User.findAll({ where: {id: 18 }})
        if(results.length > 0) {
			let user = results[0]
            user.age = 45
	        await user.save()
		}	

    // DELETANDO DADOS  DE FORMA GERAL 
        // await User.destroy({
//           where: {
//              id: 10,
//              firstname: 'Bianca'
//           }
//       })

    // DELETANDO DADOS  DE UM USUÁRIO ESPECÍFICO
        // let result = await User.findAll({ where: {firstname: 'Matheus'}})
        // if(result.length > 0) {
        //     let user = result[0]
        //     await user.destroy()
        // }	


        /* 
        TESTANDO  A CONEXÃO COM O BANCO DE DADOS 
     try {
        await sequelize.authenticate()
         console.log('Conection Sucessfully Established!')
     } catch(error) {
         console.log('Houston, we have a problem: ', error)
     }

     let users = await User.findAll();
*/

    // PEGANDO TODOS OS USUÁRIOS DO ABANCO DE DADOS
    // let users = await User.findAll()

    //PEGANDO SOMENTE DADOS QUE VAMOS UTILIZAR
    //SUPONDO QUE A QUANTIDADE DE DADOS QUE VEM DO BANCO DE DADOS SEJA MUITO EXTENSA E NÃO VAMOS UTILIZAR TODAS NÃO PRECISAMOS PEGAR TODAS.ENTÃO PARA SELECIONARMOS QUAIS INFORMAÇÕES QUEREMOS BUSCAR DO BANCO DE DADOS  CONFIGURAMOS UM OBJETO DENTRO DA FUNÇÃO  COMO ABAIXO:

    // let users = await User.findAll({
    //     attributes: ['firstname', 'lastname']
    // })
    
    //PARA FAZER UMA FILTRAGEM usando && OPERADOR (E)
    //   let users = await User.findAll({
    //     where: { firstname: 'Dani', age: 14 }
    //  })
     //PARA FAZER UMA FILTRAGEM usando || OPERADOR (OU)
    //     let users = await User.findAll({
    //     where: { 
    //         [Op.or]: [
    //             { firstname: 'Dani' },
    //             { age: 14 }
    //         ]
    //      }
    //  })

  //PARA PEGAR UM NOME ONDE O USUÁRIO DIGITOU EM UM CAMPO DE BUSCA SOMENTE PARTE DO NOME 
// let searchName = 'Th'
// let users = await User.findAll({
//         where: { 
//            firstname: {
//                [Op.like]: `%${searchName}%`
//            } 
//          }
//      })


    let users = await User.findAll({
         order: [
             ['firstname', 'ASC'],// para ordenar em ordem alfabetica ascendente
    //          ['age', 'DESC']// para ordenar em ordem alfabetica descecendente
         ],
    //      offset: 4, // quantos itens ele vai pular 
    //      limit: 2   // quantos itens  ele vai exibir por página
    })

// INSERINDO  DADOS COM SEQUELIZE 
        //BUILD + SAVE

        /*const user = User.build({
            id: 13,
            firstname: 'Walisson',
            lastname: 'Oliveira',
            age: 32
        })
        await user.save()*/

        // //create
        // const user = await User.create({
        //     firstname: 'ingrid',
        //     lastname: 'Oliveira',
        //     age: 30
        // })


    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(50);

    res.render('pages/home', {
        name: 'Thowelling   ',
        lastName: 'Dani',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};
// PARA CRIAR UM NOVO USUÁRIO 
export const novoUsuario = async (req: Request, res: Response) => {
    let { firstname, lastname, age } = req.body;

    if(firstname && lastname) {
        const newUser = User.build({ firstname, lastname });

        if(age) {
            newUser.age = parseInt(age);
        }

        await newUser.save();
    }

    res.redirect('/');
}