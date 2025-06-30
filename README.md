
![Banner](./front/public/images/BannerWB.png)

# Configurações do Projeto

### Rodando o Backend

1. Abra um terminal e navegue até a pasta do **backend**:

```bash
cd back
```

2. Instale as dependências do projeto:

```bash
npm install
```

3. **Configure o banco de dados**: O backend requer uma variável de ambiente chamada `DATABASE_URL` para se conectar ao banco de dados MySQL. Para isso, crie um arquivo `.env` na pasta `back` e adicione a URL de conexão do seu banco de dados:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
```

Substitua `usuario`, `senha` e `nome_do_banco` pelos dados do seu banco de dados.

4. **Crie as tabelas e adicione dados iniciais**: Execute as migrações e gere o Prisma Client para garantir que o banco de dados esteja configurado corretamente. Em seguida, execute o seed para popular o banco com dados iniciais:

```bash
npx prisma migrate deploy   # Executa as migrações
npx prisma generate         # Gera o Prisma Client
npm run seed                # Popula o banco com dados iniciais
```

5. **Inicie o backend**: Depois de configurar tudo, você pode iniciar o servidor do backend:

```bash
npm run dev
```

---

### Rodando o Frontend

1. Abra outro terminal e navegue até a pasta do **frontend**:

```bash
cd front
```

2. Instale as dependências do frontend:

```bash
npm install
```

3. **Inicie o servidor do frontend**:

```bash
npm start
```

O frontend estará disponível em `http://localhost:3000` (ou na porta configurada no seu projeto).
