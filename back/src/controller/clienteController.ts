import { FastifyReply, FastifyRequest } from 'fastify'
import { adicionarProduto, adicionarRG, adicionarServico, adicionarTelefone, AtualizarClienteInput, atualizarClientePorCpfCompleto, buscarClientePorCPF, buscarTodosClientes, buscarTodosClientesPorGenero, ClienteInput, criarCliente, deletarClientePorCpf, listarTop10ClientesMaisConsumidores, listarTop10ClientesMenosConsumidores, listarTop5ClientesPorGastoTotal } from '../services/clienteService'


export const listarClientes = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const clientes = await buscarTodosClientes()
    reply.code(200).send(clientes)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao buscar clientes', detalhes: err.message })
  }
}

export const listarClientesPorGeneroHandler = async (
  request: FastifyRequest<{Params: {genero: string}}>,
  reply: FastifyReply
) => {
  try {
    const {genero} = request.params
    const clientes = await buscarTodosClientesPorGenero(genero)
    reply.code(200).send(clientes)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao buscar clientes', detalhes: err.message })
  }
}

export const buscarClientePorCPFHandler = async (
  request: FastifyRequest<{Params: {cpf: string}}>,
  reply: FastifyReply
) => {
  try {
    const {cpf} = request.params
    const cliente = await buscarClientePorCPF(cpf)
    reply.code(200).send(cliente)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao buscar cliente', detalhes: err.message })
  }
}

export const adicionarCliente = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const dados = request.body as ClienteInput

    const novoCliente = await criarCliente(dados)
    reply.code(201).send(novoCliente)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao criar cliente', detalhes: err.message })
  }
}

export const adicionarRGHandler = async (
  request: FastifyRequest<{ Params: { id: string }; Body: { valor: string; dataEmissao: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  const { valor, dataEmissao } = request.body

  try {
    const rg = await adicionarRG(Number(id), valor, new Date(dataEmissao))
    reply.code(201).send(rg)
  } catch (error) {
    reply.code(500).send({ erro: 'Erro ao adicionar RG', detalhe: error })
  }
}

export const adicionarTelefoneHandler = async (
  request: FastifyRequest<{ Params: { id: string }; Body: { ddd: string; numero: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  const { ddd, numero } = request.body

  try {
    const telefone = await adicionarTelefone(Number(id), ddd, numero)
    reply.code(201).send(telefone)
  } catch (error) {
    reply.code(500).send({ erro: 'Erro ao adicionar telefone', detalhe: error })
  }
}

export const adicionarServicoHandler = async (
  request: FastifyRequest<{ Params: { id: string }; Body: { servicoId: number } }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  const { servicoId } = request.body

  try {
    const clienteAtualizado = await adicionarServico(Number(id), servicoId)
    reply.code(200).send(clienteAtualizado)
  } catch (error) {
    reply.code(500).send({ erro: 'Erro ao adicionar serviço', detalhe: error })
  }
}

export const adicionarProdutoHandler = async (
  request: FastifyRequest<{ Params: { id: string }; Body: { produtoId: number } }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  const { produtoId } = request.body

  try {
    const clienteAtualizado = await adicionarProduto(Number(id), produtoId)
    reply.code(200).send(clienteAtualizado)
  } catch (error) {
    reply.code(500).send({ erro: 'Erro ao adicionar produto', detalhe: error })
  }
}

export const listarTop10ClientesMaisConsumidoresHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const clientes = await listarTop10ClientesMaisConsumidores()
    reply.code(200).send(clientes)
  } catch (err: any) {
    reply.code(500).send({ error: "Erro ao buscar os top 10 clientes", detalhes: err.message })
  }
}

export const listarTop10ClientesMenosConsumidoresHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const clientes = await listarTop10ClientesMenosConsumidores()
    reply.code(200).send(clientes)
  } catch (err: any) {
    reply.code(500).send({ error: "Erro ao buscar os top 10 clientes", detalhes: err.message })
  }
}

export const listarTop5ClientesGastoTotalHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const clientes = await listarTop5ClientesPorGastoTotal()
    reply.code(200).send(clientes)
  } catch (err: any) {
    reply.code(500).send({ error: "Erro ao buscar os top 5 clientes por gasto total", detalhes: err.message })
  }
}

export const atualizarClienteCompletoHandler = async (
  request: FastifyRequest<{ Params: { cpf: string }; Body: any }>,
  reply: FastifyReply
) => {
  try {
    const { cpf } = request.params
    const dados = request.body as AtualizarClienteInput
    const cliente = await atualizarClientePorCpfCompleto(cpf, dados)
    reply.code(200).send(cliente)
  } catch (err: any) {
    reply.code(500).send({ error: "Erro ao atualizar cliente completo", detalhes: err.message })
  }
}

export const deletarClientePorCpfHandler = async (
  request: FastifyRequest<{ Params: { cpf: string } }>,
  reply: FastifyReply
) => {
  try {
    const { cpf } = request.params
    const clienteDeletado = await deletarClientePorCpf(cpf)
    reply.code(200).send(clienteDeletado)
  } catch (err: any) {
    reply.code(500).send({ error: "Erro ao deletar cliente por CPF", detalhes: err.message })
  }
}