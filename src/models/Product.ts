type Product = {
    title: string,
    price: number
};
//CRIANDO  UMA VARIÁVEL GENÉRICA PARA SUBSTITUIR O(S) BANCO(S) DE DADOS 
const data: Product[] = [
    {title: 'headPhones', price: 50},
    {title: 'charger', price: 35},
    {title: 'penDrive', price: 60},
    {title: 'cellPhone', price: 2800}
];

export const Product = {
    // FUNÇÃO PARA PEGAR TODOS OS PRODUTOS QUE TEM NO BANCO DE DADOS
    getAll: (): Product[] => {
        return data;
    },
    // FUNÇÃO PARA FILTRAR POR PREÇO
    getFromPriceAfter: (price: number): Product[] => {
        return data.filter(item => item.price >= price);
    }
};