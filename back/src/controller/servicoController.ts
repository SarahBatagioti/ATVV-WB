import { FastifyReply, FastifyRequest } from "fastify"
import {
  adicionarServico,
  atualizarServico,
  atualizarServicoPorNome,
  buscarTodosServicos,
  deletarServico,
  deletarServicoPorNome,
  listarServicosMaisVendidos,
  obterServicoPorNome,
  ServicoInput,
  servicosMaisVendidosPorGenero
} from "../services/servicoService"

export const criarServico = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const dados = request.body as ServicoInput

    const novoServico = await adicionarServico(dados)
    reply.code(201).send(novoServico)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao criar o serviço', detalhes: err.message })
  }
}

export const listarServicos = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const servicos = await buscarTodosServicos()
    reply.code(200).send(servicos)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao buscar serviços', detalhes: err.message })
  }
}

export const obterServicoPorNomeHandler = async(
  request: FastifyRequest<{Params: {nome: string}}>,
  reply: FastifyReply
) => {
    try {
    const {nome} = request.params
    const servico = await obterServicoPorNome(nome)
    reply.code(200).send(servico)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao buscar serviço', detalhes: err.message })
  }
}

export const atualizarServicoHandler = async (
  request: FastifyRequest<{ Params: { id: string }; Body: ServicoInput }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params
    const dados = request.body

    const servicoAtualizado = await atualizarServico(Number(id), dados)
    reply.code(200).send(servicoAtualizado)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao atualizar serviço', detalhes: err.message })
  }
}

export const deletarServicoHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params

    const servicoDeletado = await deletarServico(Number(id))
    reply.code(200).send(servicoDeletado)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao deletar serviço', detalhes: err.message })
  }
}

export const atualizarServicoPorNomeHandler = async (
  request: FastifyRequest<{ Params: { nome: string }; Body: ServicoInput }>,
  reply: FastifyReply
) => {
  try {
    const { nome } = request.params
    const dados = request.body

    const servicoAtualizado = await atualizarServicoPorNome(nome, dados)
    reply.code(200).send(servicoAtualizado)
  } catch (err: any) {
    reply.code(500).send({
      error: "Erro ao atualizar o serviço por nome",
      detalhes: err.message,
    })
  }
}

export const deletarServicoPorNomeHandler = async (
  request: FastifyRequest<{ Params: { nome: string } }>,
  reply: FastifyReply
) => {
  try {
    const { nome } = request.params
    const servicoDeletado = await deletarServicoPorNome(nome)
    reply.code(200).send(servicoDeletado)
  } catch (err: any) {
    reply.code(500).send({ error: "Erro ao deletar serviço", detalhes: err.message })
  }
}

export const listarServicosMaisVendidosHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const servicos = await listarServicosMaisVendidos()
    reply.code(200).send(servicos)
  } catch (err: any) {
    reply.code(500).send({ error: "Erro ao buscar serviços mais vendidos", detalhes: err.message })
  }
}

export const servicosMaisVendidosPorGeneroHandler = async (
  request: FastifyRequest<{ Params: { genero: string } }>,
  reply: FastifyReply
) => {
  try {
    const { genero } = request.params
    const servicos = await servicosMaisVendidosPorGenero(genero)
    reply.code(200).send(servicos)
  } catch (err: any) {
    reply.code(500).send({ error: "Erro ao buscar por gênero", detalhes: err.message })
  }
}
