-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `nomeSocial` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `cpfId` INTEGER NOT NULL,
    `dataCadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Cliente_cpfId_key`(`cpfId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cpf` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` VARCHAR(191) NOT NULL,
    `dataEmissao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CPF_valor_key`(`valor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,

    UNIQUE INDEX `produto_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rg` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` VARCHAR(191) NOT NULL,
    `dataEmissao` DATETIME(3) NOT NULL,
    `clienteId` INTEGER NOT NULL,

    UNIQUE INDEX `RG_valor_key`(`valor`),
    INDEX `RG_clienteId_fkey`(`clienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,

    UNIQUE INDEX `servico_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ddd` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `clienteId` INTEGER NOT NULL,

    INDEX `Telefone_clienteId_fkey`(`clienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_produtosconsumidos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_produtosconsumidos_AB_unique`(`A`, `B`),
    INDEX `_produtosconsumidos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_servicosconsumidos` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_servicosconsumidos_AB_unique`(`A`, `B`),
    INDEX `_servicosconsumidos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `Cliente_cpfId_fkey` FOREIGN KEY (`cpfId`) REFERENCES `cpf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rg` ADD CONSTRAINT `RG_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `telefone` ADD CONSTRAINT `Telefone_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_produtosconsumidos` ADD CONSTRAINT `_produtosconsumidos_A_fkey` FOREIGN KEY (`A`) REFERENCES `cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_produtosconsumidos` ADD CONSTRAINT `_produtosconsumidos_B_fkey` FOREIGN KEY (`B`) REFERENCES `produto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_servicosconsumidos` ADD CONSTRAINT `_servicosconsumidos_A_fkey` FOREIGN KEY (`A`) REFERENCES `cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_servicosconsumidos` ADD CONSTRAINT `_servicosconsumidos_B_fkey` FOREIGN KEY (`B`) REFERENCES `servico`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
