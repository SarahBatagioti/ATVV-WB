import CPF from "./CPF"
import Produto from "./Produto"
import RG from "./RG"
import Servico from "./Servico"
import Telefone from "./Telefone"

export default class Cliente{
    public nome: string
    public nomeSocial: string
    public genero: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>

    public set setCpf(cpf: CPF){
        this.cpf = cpf
    }

    constructor(nome: string, nomeSocial: string, genero: string, cpf: CPF) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.genero = genero
        this.cpf = cpf
        this.rgs = []
        this.dataCadastro = new Date()
        this.telefones = []
        this.produtosConsumidos = []
        this.servicosConsumidos = []
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }

    public adicionarServicoConsumido(servico: Servico): void{
        this.servicosConsumidos.push(servico)
    }

    public adicionarProdutoConsumido(produto: Produto): void{
        this.produtosConsumidos.push(produto)
    }

    public adicionarRG(valor: string, dataEmissao: Date): void{
        let rg = new RG(valor,dataEmissao)
        this.rgs.push(rg)
    }

    public adicionarTelefone(ddd: string, numero: string):void{
        let telefone = new Telefone(ddd,numero)
        this.telefones.push(telefone)
    }
}