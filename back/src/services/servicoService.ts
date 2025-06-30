import prisma from "../models/prisma/client"

export interface ServicoInput {
    nome: string
    preco: number
}

export const adicionarServico = async (dados: ServicoInput) => {
    return await prisma.servico.create({
        data: {
            nome: dados.nome,
            preco: dados.preco
        }
    })
}

export const buscarTodosServicos = async () => {
    return await prisma.servico.findMany()
}

export const obterServicoPorNome = async (nome: string) => {
    return await prisma.servico.findUnique({
        where:{nome}
    })
}

export const atualizarServico = async (id: number, dados: ServicoInput) => {
    return await prisma.servico.update({
        where: { id },
        data: {
            nome: dados.nome,
            preco: dados.preco
        }
    })
}

export const atualizarServicoPorNome = async (nome: string, dados: ServicoInput) => {
    return await prisma.servico.update({
        where: { nome },
        data: {
            nome: dados.nome,
            preco: dados.preco,
        },
    });
};

export const deletarServico = async (id: number) => {
    return await prisma.servico.delete({
        where: { id }
    })
}

export const deletarServicoPorNome = async (nome: string) => {
    return await prisma.servico.delete({
        where: { nome },
    });
};

export const listarServicosMaisVendidos = async () => {
    const servicosMaisVendidos = await prisma.servico.findMany({
        include: {
            cliente: true
        }
    })

    const servicosOrdenados = servicosMaisVendidos
        .map(servico => ({
            id: servico.id,
            nome: servico.nome,
            preco: servico.preco,
            quantidadeVendida: servico.cliente.length
        }))
        .sort((a, b) => b.quantidadeVendida - a.quantidadeVendida)

    return servicosOrdenados
}

interface ServicoMaisVendido {
    id: number
    nome: string
    preco: number
    totalClientes: number
}

export const servicosMaisVendidosPorGenero = async (genero: string): Promise<ServicoMaisVendido[]> => {
    const resultados = await prisma.$queryRaw<any[]>`
    SELECT
      s.id,
      s.nome,
      s.preco,
      COUNT(DISTINCT c.id) AS totalClientes
    FROM servico s
    JOIN _servicosconsumidos sc ON sc.B = s.id
    JOIN cliente c ON c.id = sc.A
    WHERE TRIM(LOWER(c.genero)) = TRIM(LOWER(${genero}))
    GROUP BY s.id, s.nome, s.preco
    ORDER BY totalClientes DESC
  `

    return resultados.map((servico) => ({
        ...servico,
        totalClientes: Number(servico.totalClientes)
    }))
}
