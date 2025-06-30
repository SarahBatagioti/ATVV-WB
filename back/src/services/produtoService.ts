import prisma from "../models/prisma/client"

export interface ProdutoInput {
    nome: string
    preco: number
}

export const adicionarProduto = async (dados: ProdutoInput) => {
    return await prisma.produto.create({
        data: {
            nome: dados.nome,
            preco: dados.preco
        }
    })
}

export const obterProdutoPorNome = async(nome: string) => {
    return await prisma.produto.findUnique({
        where:{nome}
    })
}

export const buscarTodosProdutos = async () => {
    return await prisma.produto.findMany()
}

export const atualizarProduto = async (id: number, dados: ProdutoInput) => {
    return await prisma.produto.update(
        {
            where: { id },
            data: {
                nome: dados.nome,
                preco: dados.preco
            }
        }
    )
}

export const atualizarProdutoPorNome = async (nome: string, dados: ProdutoInput) => {
    return await prisma.produto.update({
        where: { nome },
        data: {
            nome: dados.nome,
            preco: dados.preco,
        },
    });
};


export const deletarProduto = async (id: number) => {
    return await prisma.produto.delete({
        where: { id }
    })
}

export const deletarProdutoPorNome = async (nome: string) => {
    return await prisma.produto.delete({
        where: { nome },
    });
};


export const listarProdutosMaisVendidos = async () => {
    const produtosMaisVendidos = await prisma.produto.findMany({
        include: {
            cliente: true
        }
    })

    const produtosOrdenados = produtosMaisVendidos
        .map(produto => ({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidadeVendida: produto.cliente.length
        }))
        .sort((a, b) => b.quantidadeVendida - a.quantidadeVendida)

    return produtosOrdenados
}


interface ProdutoMaisVendido {
  id: number
  nome: string
  preco: number
  totalClientes: number
}

export const produtosMaisVendidosPorGenero = async (genero: string): Promise<ProdutoMaisVendido[]> => {
  const resultados = await prisma.$queryRaw<any[]>`
    SELECT
      p.id,
      p.nome,
      p.preco,
      COUNT(DISTINCT c.id) AS totalClientes
    FROM produto p
    JOIN _produtosconsumidos pc ON pc.B = p.id
    JOIN cliente c ON c.id = pc.A
    WHERE TRIM(LOWER(c.genero)) = TRIM(LOWER(${genero}))
    GROUP BY p.id, p.nome, p.preco
    ORDER BY totalClientes DESC
  `

  return resultados.map((produto) => ({
    ...produto,
    totalClientes: Number(produto.totalClientes)
  }))
}

