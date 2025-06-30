import { FastifyInstance } from 'fastify'
import { adicionarCliente, adicionarProdutoHandler, adicionarRGHandler, adicionarServicoHandler, adicionarTelefoneHandler, atualizarClienteCompletoHandler, buscarClientePorCPFHandler, deletarClientePorCpfHandler, listarClientes, listarClientesPorGeneroHandler, listarTop10ClientesMaisConsumidoresHandler, listarTop10ClientesMenosConsumidoresHandler, listarTop5ClientesGastoTotalHandler } from './controller/clienteController'
import { atualizarProdutoHandler, atualizarProdutoPorNomeHandler, criarProduto, deletarProdutoHandle, deletarProdutoPorNomeHandler, listarMaisVendidosHandler, listarProdutos, obterProdutoPorNomeHandler, produtosMaisVendidosPorGeneroHandler } from './controller/produtoController'
import { atualizarServicoHandler, atualizarServicoPorNomeHandler, criarServico, deletarServicoHandler, deletarServicoPorNomeHandler, listarServicos, listarServicosMaisVendidosHandler, obterServicoPorNomeHandler, servicosMaisVendidosPorGeneroHandler } from './controller/servicoController'

export default async function clienteRoutes(app: FastifyInstance) {
  app.get('/clientes', listarClientes)
  app.get('/clientes/genero/:genero', listarClientesPorGeneroHandler)
  app.get('/clientes/topMaioresConsumidoresQuantidade', listarTop10ClientesMaisConsumidoresHandler)
  app.get('/clientes/topMenoresConsumidoresQuantidade', listarTop10ClientesMenosConsumidoresHandler)
  app.get('/clientes/topGasto', listarTop5ClientesGastoTotalHandler)
  app.get('/clientes/cpf/:cpf',buscarClientePorCPFHandler)

  app.post('/clientes', adicionarCliente)

  app.post('/clientes/:id/rg', adicionarRGHandler)
  app.post('/clientes/:id/telefone', adicionarTelefoneHandler)
  app.post('/clientes/:id/servicos', adicionarServicoHandler)
  app.post('/clientes/:id/produtos', adicionarProdutoHandler)

  app.put('/clientes/cpf/:cpf', atualizarClienteCompletoHandler)

  app.delete('/clientes/cpf/:cpf', deletarClientePorCpfHandler)

}


export async function produtoRoutes(app: FastifyInstance) {
  app.get('/produtos', listarProdutos)
  app.get('/produtos/:nome',obterProdutoPorNomeHandler)
  app.get('/produtos/maisVendidos', listarMaisVendidosHandler)
  app.get("/produtos/maisVendidosPorGenero/:genero", produtosMaisVendidosPorGeneroHandler)

  app.post('/produtos', criarProduto)

  app.put('/produtos/:id', atualizarProdutoHandler)
  app.put('/produtosPorNome/:nome', atualizarProdutoPorNomeHandler)
  app.delete('/produtos/:id', deletarProdutoHandle)
  app.delete('/produtosPorNome/:nome', deletarProdutoPorNomeHandler)
}


export async function servicoRoutes(app: FastifyInstance) {
  app.get('/servicos', listarServicos)
  app.get('/servicos/:nome', obterServicoPorNomeHandler)
  app.get("/servicos/maisVendidos", listarServicosMaisVendidosHandler)
  app.get("/servicos/maisVendidosPorGenero/:genero", servicosMaisVendidosPorGeneroHandler)

  app.post('/servicos', criarServico)

  app.put('/servicos/:id', atualizarServicoHandler)
  app.put('/servicosPorNome/:nome', atualizarServicoPorNomeHandler)

  app.delete('/servicos/:id', deletarServicoHandler)
  app.delete("/servicosPorNome/:nome", deletarServicoPorNomeHandler)
}