import prisma from '../models/prisma/client'

export interface ClienteInput {
  nome: string
  nomeSocial: string
  genero: string
  cpf: {
    valor: string
    dataEmissao: Date
  }
  rg?: {
    valor: string
    dataEmissao: Date
  }[]
  telefone?: {
    ddd: string
    numero: string
  }[]
}

export const buscarTodosClientes = async () => {
  return await prisma.cliente.findMany({
    include: {
      cpf: true,
      rg: true,
      telefone: true,
      produto: true,
      servico: true
    }
  })
}

export const buscarTodosClientesPorGenero = async (genero: string) => {
  return await prisma.cliente.findMany({
    where: { genero },
    include: {
      cpf: true,
      rg: true,
      telefone: true,
      produto: true,
      servico: true
    }
  })
}

export const buscarClientePorCPF = async (cpf: string) => {
  return await prisma.cliente.findFirst({
    where: {
      cpf: {
        valor: cpf
      }
    },
    include: {
      cpf: true,
      rg: true,
      telefone: true,
      produto: true,
      servico: true
    }
  })
}

export const criarCliente = async (dados: ClienteInput) => {
  return await prisma.cliente.create({
    data: {
      nome: dados.nome,
      nomeSocial: dados.nomeSocial,
      genero: dados.genero,
      cpf: {
        create: {
          valor: dados.cpf.valor,
          dataEmissao: new Date(dados.cpf.dataEmissao)
        }
      },
      rg: {
        create: dados.rg?.map(r => ({
          valor: r.valor,
          dataEmissao: new Date(r.dataEmissao)
        })) || []
      },
      telefone: {
        create: dados.telefone || []
      }
    },
    include: {
      cpf: true,
      rg: true,
      telefone: true,
      produto: true,
      servico: true
    }
  })
}


export const adicionarRG = async (clienteId: number, valor: string, dataEmissao: Date) => {
  return await prisma.rg.create({
    data: {
      valor,
      dataEmissao,
      clienteId
    }
  })
}

export const adicionarTelefone = async (clienteId: number, ddd: string, numero: string) => {
  return await prisma.telefone.create({
    data: {
      ddd,
      numero,
      clienteId
    }
  })
}

export const adicionarServico = async (clienteId: number, servicoId: number) => {
  return await prisma.cliente.update({
    where: { id: clienteId },
    data: {
      servico: {
        connect: { id: servicoId }
      }
    }
  })
}

export const adicionarProduto = async (clienteId: number, produtoId: number) => {
  return await prisma.cliente.update({
    where: { id: clienteId },
    data: {
      produto: {
        connect: { id: produtoId }
      }
    }
  })
}

export interface ClienteConsumidor {
  id: number
  nome: string
  nomeSocial: string
  totalConsumido: number
}

export const listarTop10ClientesMaisConsumidores = async (): Promise<ClienteConsumidor[]> => {
  const clientes = await prisma.cliente.findMany({
    include: {
      produto: true,
      servico: true,
    }
  })

  const clientesOrdenados = clientes
    .map(cliente => ({
      id: cliente.id,
      nome: cliente.nome,
      nomeSocial: cliente.nomeSocial,
      totalConsumido: cliente.produto.length + cliente.servico.length,
    }))
    .sort((a, b) => b.totalConsumido - a.totalConsumido)
    .slice(0, 10)

  return clientesOrdenados
}


export const listarTop10ClientesMenosConsumidores = async (): Promise<ClienteConsumidor[]> => {
  const clientes = await prisma.cliente.findMany({
    include: {
      produto: true,
      servico: true,
    }
  })

  const clientesOrdenados = clientes
    .map(cliente => ({
      id: cliente.id,
      nome: cliente.nome,
      nomeSocial: cliente.nomeSocial,
      totalConsumido: cliente.produto.length + cliente.servico.length,
    }))
    .sort((a, b) => a.totalConsumido - b.totalConsumido)
    .slice(0, 10)

  return clientesOrdenados
}

export interface ClienteMaisGasto {
  id: number
  nome: string
  nomeSocial: string
  valorTotalGasto: number
}

export const listarTop5ClientesPorGastoTotal = async (): Promise<ClienteMaisGasto[]> => {
  const clientes = await prisma.cliente.findMany({
    include: {
      produto: true,
      servico: true,
    },
  })

  const clientesOrdenados = clientes
    .map(cliente => {
      const totalProdutos = cliente.produto.reduce((soma, p) => soma + p.preco, 0)
      const totalServicos = cliente.servico.reduce((soma, s) => soma + s.preco, 0)

      return {
        id: cliente.id,
        nome: cliente.nome,
        nomeSocial: cliente.nomeSocial,
        valorTotalGasto: totalProdutos + totalServicos
      }
    })
    .sort((a, b) => b.valorTotalGasto - a.valorTotalGasto)
    .slice(0, 5)

  return clientesOrdenados
}


export interface AtualizarClienteInput {
  nome?: string
  nomeSocial?: string
  genero?: string
  cpf?: {
    valor: string
    dataEmissao: string
  }
  rgs?: {
    id?: number
    valor: string
    dataEmissao: string
  }[]
  telefones?: {
    id?: number
    ddd: string
    numero: string
  }[]
}

export const atualizarClientePorCpfCompleto = async (cpf: string, dados: AtualizarClienteInput) => {
  const cliente = await prisma.cliente.findFirst({
    where: {
      cpf: {
        valor: cpf
      }
    },
    include: {
      cpf: true,
      rg: true,
      telefone: true
    }
  })

  if (!cliente) throw new Error("Cliente não encontrado pelo CPF")

  const clienteAtualizado = await prisma.cliente.update({
    where: { id: cliente.id },
    data: {
      nome: dados.nome,
      nomeSocial: dados.nomeSocial,
      genero: dados.genero
    }
  })

  if (dados.cpf) {
    await prisma.cpf.update({
      where: { id: cliente.cpfId },
      data: {
        valor: dados.cpf.valor,
        dataEmissao: new Date(dados.cpf.dataEmissao)
      }
    })
  }

  if (dados.rgs) {
    await prisma.rg.deleteMany({ where: { clienteId: cliente.id } })
    for (const rg of dados.rgs) {
      await prisma.rg.create({
        data: {
          valor: rg.valor,
          dataEmissao: new Date(rg.dataEmissao),
          clienteId: cliente.id
        }
      })
    }
  }

  if (dados.telefones) {
    await prisma.telefone.deleteMany({ where: { clienteId: cliente.id } })
    for (const tel of dados.telefones) {
      await prisma.telefone.create({
        data: {
          ddd: tel.ddd,
          numero: tel.numero,
          clienteId: cliente.id
        }
      })
    }
  }

  return clienteAtualizado
}

export const deletarClientePorCpf = async (cpf: string) => {
  const cliente = await prisma.cliente.findFirst({
    where: {
      cpf: {
        valor: cpf
      }
    },
    include: {
      rg: true,
      telefone: true,
      produto: true,
      servico: true
    }
  });

  if (!cliente) throw new Error("Cliente com CPF não encontrado.");

  // Deleta relacionamentos
  await prisma.rg.deleteMany({ where: { clienteId: cliente.id } });
  await prisma.telefone.deleteMany({ where: { clienteId: cliente.id } });

  // Remove associações N:N com produtos e serviços
  await prisma.cliente.update({
    where: { id: cliente.id },
    data: {
      produto: { set: [] },
      servico: { set: [] }
    }
  });

  // Por fim, deletar o cliente
  return await prisma.cliente.delete({
    where: { id: cliente.id }
  });
};
