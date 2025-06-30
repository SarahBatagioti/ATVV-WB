import prisma from './models/prisma/client';

async function main() {
  // Produtos de beleza
  const produtos = await prisma.produto.createMany({
  data: [
    { nome: "Shampoo", preco: 29.9 },
    { nome: "Condicionador", preco: 35.5 },
    { nome: "Pomada", preco: 22.0 },
    { nome: "Creme corporal", preco: 40.0 },
    { nome: "Gel de cabelo", preco: 18.0 },
    { nome: "Máscara capilar", preco: 50.0 },
    { nome: "Esfoliante facial", preco: 45.0 },
    { nome: "Hidratante facial", preco: 60.0 },
    { nome: "Pó compacto", preco: 80.0 },
    { nome: "Rímel", preco: 45.0 },
    { nome: "Base líquida", preco: 70.0 },
    { nome: "Lábios Matte", preco: 25.0 },
    { nome: "Protetor solar facial", preco: 55.0 },
    { nome: "Lixa de unha", preco: 10.0 },
    { nome: "Cotonetes", preco: 5.0 },
    { nome: "Tônico facial", preco: 35.0 },
    { nome: "Kit pincéis de maquiagem", preco: 90.0 },
    { nome: "Limpador facial", preco: 40.0 },
    { nome: "Desodorante roll-on", preco: 15.0 },
    { nome: "Batom hidratante", preco: 30.0 }
  ],
  skipDuplicates: true
}).then(() => prisma.produto.findMany());


// Serviços de beleza
const servicos = await prisma.servico.createMany({
  data: [
    { nome: "Corte de cabelo", preco: 45.0 },
    { nome: "Barba", preco: 25.0 },
    { nome: "Escova", preco: 60.0 },
    { nome: "Manicure", preco: 35.0 },
    { nome: "Pedicure", preco: 40.0 },
    { nome: "Limpeza de pele", preco: 70.0 },
    { nome: "Design de sobrancelhas", preco: 50.0 },
    { nome: "Maquiagem", preco: 100.0 },
    { nome: "Tratamento capilar", preco: 80.0 },
    { nome: "Alisamento", preco: 120.0 },
    { nome: "Penteado", preco: 85.0 },
    { nome: "Descoloração de cabelo", preco: 150.0 },
    { nome: "Bronzeamento artificial", preco: 90.0 },
    { nome: "Depilação facial", preco: 45.0 },
    { nome: "Depilação com cera", preco: 60.0 },
    { nome: "Hidratação capilar", preco: 50.0 },
    { nome: "Tratamento de acne", preco: 75.0 },
    { nome: "Sobrancelhas com henna", preco: 40.0 },
    { nome: "Massagem relaxante", preco: 70.0 },
    { nome: "Pedicure com spa", preco: 50.0 }
  ],
  skipDuplicates: true
}).then(() => prisma.servico.findMany());


  const criarCliente = async (
    nome: string,
    nomeSocial: string,
    genero: string,
    cpfValor: string,
    cpfData: string,
    rgValor: string,
    rgData: string,
    ddd: string,
    numero: string,
    produtos: any[] = [],
    servicos: any[] = []
  ) => {
    return await prisma.cliente.create({
      data: {
        nome,
        nomeSocial,
        genero,
        dataCadastro: new Date(),
        cpf: {
          create: {
            valor: cpfValor,
            dataEmissao: new Date(cpfData)
          }
        },
        rg: {
          create: {
            valor: rgValor,
            dataEmissao: new Date(rgData)
          }
        },
        telefone: {
          create: {
            ddd,
            numero
          }
        },
        produto: {
          connect: produtos.map(p => ({ id: p.id }))
        },
        servico: {
          connect: servicos.map(s => ({ id: s.id }))
        }
      }
    });
  };

  // Criando 15 clientes
await criarCliente("João da Silva", "Joãozinho", "Masculino", "12345678901", "2000-01-01", "RG123456", "2001-01-01", "12", "988888888", [produtos[0], produtos[2]], [servicos[0], servicos[1]]);
await criarCliente("Maria Oliveira", "Mari", "Feminino", "98765432100", "2001-02-02", "RG654321", "2002-02-02", "13", "977777777", [produtos[3], produtos[6]], [servicos[2], servicos[4]]);
await criarCliente("Carlos Souza", "Carlão", "Masculino", "11122233344", "1999-03-03", "RG111222", "2000-03-03", "14", "966666666", [produtos[1], produtos[5]], [servicos[3], servicos[7]]);
await criarCliente("Ana Paula", "Aninha", "Feminino", "22233344455", "1998-04-04", "RG333444", "2001-04-04", "15", "955555555", [produtos[5], produtos[7]], [servicos[5], servicos[6]]);
await criarCliente("Lucas Pereira", "Luquinhas", "Masculino", "33344455566", "1997-05-05", "RG444555", "2002-05-05", "16", "944444444", [], [servicos[6], servicos[8]]);
await criarCliente("Juliana Souza", "Ju", "Feminino", "44455566677", "2000-06-06", "RG555666", "2001-06-06", "17", "933333333", [produtos[7], produtos[8]], [servicos[7], servicos[9]]);
await criarCliente("Eduardo Lima", "Dudu", "Masculino", "55566677788", "2001-07-07", "RG666777", "2002-07-07", "18", "922222222", [produtos[8], produtos[2]], [servicos[0], servicos[4]]);
await criarCliente("Carla Rodrigues", "Carlita", "Feminino", "66677788899", "2002-08-08", "RG777888", "2003-08-08", "19", "911111111", [produtos[2], produtos[3]], [servicos[1], servicos[8]]);
await criarCliente("Felipe Gomes", "Fefê", "Masculino", "77788899900", "2003-09-09", "RG888999", "2004-09-09", "20", "900000000", [], [servicos[3], servicos[6]]);
await criarCliente("Sofia Santos", "Sofi", "Feminino", "88899900011", "2004-10-10", "RG999000", "2005-10-10", "21", "988888888", [produtos[9], produtos[1]], [servicos[9], servicos[2]]);
await criarCliente("Ricardo Martins", "Rick", "Masculino", "99900011122", "2005-11-11", "RG000111", "2006-11-11", "22", "977777777", [produtos[0], produtos[4]], [servicos[5], servicos[7]]);
await criarCliente("Beatriz Almeida", "Bia", "Feminino", "10111213141", "2006-12-12", "RG111112", "2007-12-12", "23", "966666666", [produtos[3], produtos[7]], [servicos[6], servicos[1]]);
await criarCliente("Tiago Costa", "Titi", "Masculino", "12131415161", "2007-01-13", "RG131415", "2008-01-13", "24", "955555555", [produtos[6], produtos[9]], [servicos[2], servicos[0]]);
await criarCliente("Roberta Silva", "Beta", "Feminino", "14151617181", "2008-02-14", "RG151617", "2009-02-14", "25", "944444444", [produtos[4], produtos[0]], [servicos[1], servicos[5]]);
await criarCliente("Marcos Oliveira", "Marcão", "Masculino", "16171819101", "2009-03-15", "RG171819", "2010-03-15", "26", "933333333", [produtos[5], produtos[3]], [servicos[0], servicos[9]]);
await criarCliente("Fernanda Lima", "Nanda", "Feminino", "12378945601", "1995-01-01", "RG987654", "2000-01-01", "11", "9191919191", [produtos[1], produtos[4]], [servicos[0], servicos[2]]);
await criarCliente("Roberto Silva", "Beto", "Masculino", "22345678910", "1994-02-15", "RG654321", "1995-02-15", "12", "9272727272", [produtos[2], produtos[7]], [servicos[1], servicos[3]]);
await criarCliente("Larissa Costa", "Lari", "Feminino", "34567890123", "1998-03-20", "RG123123", "1999-03-20", "13", "9383838383", [produtos[3], produtos[6]], [servicos[4], servicos[6]]);
await criarCliente("Victor Santos", "Vico", "Masculino", "45678901234", "1997-04-25", "RG543210", "1998-04-25", "14", "9494949494", [produtos[0], produtos[9]], [servicos[2], servicos[7]]);
await criarCliente("Juliana Almeida", "Juju", "Feminino", "56789012345", "1996-05-30", "RG654987", "1997-05-30", "15", "9606060606", [produtos[5], produtos[8]], [servicos[3], servicos[5]]);
await criarCliente("Gustavo Martins", "Gus", "Masculino", "67890123456", "1999-06-10", "RG876543", "2000-06-10", "16", "9717171717", [produtos[1], produtos[4]], [servicos[4], servicos[6]]);
await criarCliente("Patrícia Oliveira", "Pati", "Feminino", "78901234567", "1995-07-22", "RG123654", "1996-07-22", "17", "9828282828", [produtos[2], produtos[6]], [servicos[5], servicos[9]]);
await criarCliente("Ricardo Lima", "Rick", "Masculino", "89012345678", "1994-08-30", "RG543789", "1995-08-30", "18", "9939393939", [produtos[3], produtos[7]], [servicos[0], servicos[8]]);
await criarCliente("Natália Ferreira", "Nati", "Feminino", "90123456789", "2000-09-18", "RG654123", "2001-09-18", "19", "9040404040", [produtos[8], produtos[9]], [servicos[1], servicos[2]]);
await criarCliente("André Souza", "Dre", "Masculino", "11223344556", "1998-10-12", "RG876321", "1999-10-12", "20", "9151515151", [produtos[0], produtos[5]], [servicos[3], servicos[7]]);
await criarCliente("Mariana Barbosa", "Mari", "Feminino", "22334455667", "1997-11-14", "RG123765", "1998-11-14", "21", "9262626262", [produtos[6], produtos[3]], [servicos[2], servicos[9]]);
await criarCliente("Felipe Rocha", "Felipão", "Masculino", "33445566778", "1996-12-28", "RG987321", "1997-12-28", "22", "9373737373", [produtos[2], produtos[8]], [servicos[0], servicos[6]]);
await criarCliente("Bruna Cardoso", "Bru", "Feminino", "44556677889", "1999-01-05", "RG654852", "2000-01-05", "23", "9484848484", [produtos[4], produtos[7]], [servicos[4], servicos[3]]);
await criarCliente("Felipe Pereira", "Filipe", "Masculino", "55667788990", "1998-02-19", "RG852741", "1999-02-19", "24", "9595959595", [produtos[1], produtos[3]], [servicos[1], servicos[8]]);
await criarCliente("Renata Costa", "Rê", "Feminino", "66778899001", "1995-03-27", "RG741852", "1996-03-27", "25", "9706060606", [produtos[6], produtos[9]], [servicos[2], servicos[5]]);
await criarCliente("Tiago Ribeiro", "Tião", "Masculino", "77889900112", "1997-04-14", "RG987456", "1998-04-14", "26", "9817171717", [produtos[0], produtos[5]], [servicos[4], servicos[7]]);

  console.log("Banco populado");
}

main()
  .catch((e) => {
    console.error("Erro ao popular:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
