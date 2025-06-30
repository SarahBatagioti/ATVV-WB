import { FastifyReply, FastifyRequest } from "fastify"
import { adicionarProduto, atualizarProduto, atualizarProdutoPorNome, buscarTodosProdutos, deletarProduto, deletarProdutoPorNome, listarProdutosMaisVendidos, obterProdutoPorNome, ProdutoInput, produtosMaisVendidosPorGenero } from "../services/produtoService"

export const criarProduto = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const dados = request.body as ProdutoInput

    const novoProduto = await adicionarProduto(dados)
    reply.code(201).send(novoProduto)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao criar o produto', detalhes: err.message })
  }
}

export const listarProdutos = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const produtos = await buscarTodosProdutos()
    reply.code(200).send(produtos)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao buscar produto', detalhes: err.message })
  }
}

export const obterProdutoPorNomeHandler = async (request: FastifyRequest<{Params: {nome: string}}>, reply: FastifyReply) => {
  try {
    const {nome} = request.params

    const cliente = await obterProdutoPorNome(nome)
    reply.code(200).send(cliente)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao buscar produto', detalhes: err.message })
  }
}

export const atualizarProdutoHandler = async (request: FastifyRequest<{ Params: { id: string }; Body: ProdutoInput }>, reply: FastifyReply) => {
  try {
    const { id } = request.params
    const dados = request.body

    const produtoAtualizado = await atualizarProduto(Number(id), dados)
    reply.code(200).send(produtoAtualizado)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao atualizar produto', detalhes: err.message })
  }
}

export const deletarProdutoHandle = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const { id } = request.params

    const produtoDeletado = await deletarProduto(Number(id))
    reply.code(200).send(produtoDeletado)
  } catch (err: any) {
    reply.code(500).send({ error: 'Erro ao deletar produto', detalhes: err.message })
  }
}

export const listarMaisVendidosHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const produtos = await listarProdutosMaisVendidos()
    reply.code(200).send(produtos)
  } catch (err: any) {
    reply.code(500).send({
      error: 'Erro ao listar os produtos mais vendidos',
      detalhes: err.message
    })
  }
}

export const atualizarProdutoPorNomeHandler = async (
  request: FastifyRequest<{ Params: { nome: string }; Body: ProdutoInput }>,
  reply: FastifyReply
) => {
  try {
    const { nome } = request.params
    const dados = request.body

    const produtoAtualizado = await atualizarProdutoPorNome(nome, dados)
    reply.code(200).send(produtoAtualizado)
  } catch (err: any) {
    reply.code(500).send({
      error: "Erro ao atualizar produto por nome",
      detalhes: err.message,
    })
  }
}

export const deletarProdutoPorNomeHandler = async (
  request: FastifyRequest<{ Params: { nome: string } }>,
  reply: FastifyReply
) => {
  try {
    const { nome } = request.params

    const produtoDeletado = await deletarProdutoPorNome(nome)
    reply.code(200).send(produtoDeletado)
  } catch (err: any) {
    reply.code(500).send({
      error: "Erro ao deletar produto por nome",
      detalhes: err.message,
    })
  }
}

export const produtosMaisVendidosPorGeneroHandler = async (
  request: FastifyRequest<{ Params: { genero: string } }>,
  reply: FastifyReply
) => {
  try {
    const { genero } = request.params

    if (!genero) {
      return reply.status(400).send({ error: "Parâmetro 'genero' é obrigatório." })
    }

    const produtos = await produtosMaisVendidosPorGenero(genero)
    reply.code(200).send(produtos)
  } catch (err: any) {
    reply.code(500).send({
      error: "Erro ao buscar produtos mais vendidos por gênero",
      detalhes: err.message,
    })
  }
}
