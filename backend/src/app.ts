/**
 * @swagger
 * tags:
 *   name: Atendentes
 *   description: API para gerenciar atendentes
 */

/**
 * @swagger
 * tags:
 *   name: Solicitações
 *   description: API para gerenciar solicitações de atendimento
 */

/**
 * @swagger
 * /atendentes:
 *   post:
 *     summary: Registra um novo atendente.
 *     tags: [Atendentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               time:
 *                 type: string
 *                 enum: [Cartões, Empréstimos, Outros Assuntos]
 *             example:
 *               nome: João
 *               time: Cartões
 *     responses:
 *       200:
 *         description: Atendente registrado com sucesso.
 *       400:
 *         description: Time inválido.
 */

/**
 * @swagger
 * /solicitacao:
 *   post:
 *     summary: Recebe uma nova solicitação de atendimento.
 *     tags: [Solicitações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assunto:
 *                 type: string
 *             example:
 *               assunto: Problemas com cartão
 *     responses:
 *       200:
 *         description: Solicitação recebida.
 */

/**
 * @swagger
 * /proximo_atendimento/{time}/{nome}:
 *   get:
 *     summary: Obtém o próximo atendimento disponível para um atendente.
 *     tags: [Solicitações]
 *     parameters:
 *       - in: path
 *         name: time
 *         required: true
 *         description: O time do atendente.
 *         schema:
 *           type: string
 *           enum: [Cartões, Empréstimos, Outros Assuntos]
 *       - in: path
 *         name: nome
 *         required: true
 *         description: O nome do atendente.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Próximo atendimento obtido com sucesso.
 *       404:
 *         description: Atendente não encontrado ou time não encontrado.
 */

/**
 * @swagger
 * /finalizar_atendimento/{time}/{nome}:
 *   post:
 *     summary: Finaliza um atendimento de um atendente.
 *     tags: [Solicitações]
 *     parameters:
 *       - in: path
 *         name: time
 *         required: true
 *         description: O time do atendente.
 *         schema:
 *           type: string
 *           enum: [Cartões, Empréstimos, Outros Assuntos]
 *       - in: path
 *         name: nome
 *         required: true
 *         description: O nome do atendente.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Atendimento finalizado com sucesso.
 *       404:
 *         description: Atendente não encontrado ou time não encontrado.
 */

/**
 * @swagger
 * /atendentes/{time}:
 *   get:
 *     summary: Lista os atendentes disponíveis em um time.
 *     tags: [Atendentes]
 *     parameters:
 *       - in: path
 *         name: time
 *         required: true
 *         description: O time dos atendentes.
 *         schema:
 *           type: string
 *           enum: [Cartões, Empréstimos, Outros Assuntos]
 *     responses:
 *       200:
 *         description: Lista de atendentes disponíveis.
 *       404:
 *         description: Time não encontrado.
 */

/**
 * @swagger
 * /fila/{time}:
 *   get:
 *     summary: Lista as solicitações na fila de um time.
 *     tags: [Solicitações]
 *     parameters:
 *       - in: path
 *         name: time
 *         required: true
 *         description: O time das solicitações.
 *         schema:
 *           type: string
 *           enum: [Cartões, Empréstimos, Outros Assuntos]
 *     responses:
 *       200:
 *         description: Lista de solicitações na fila.
 *       404:
 *         description: Time não encontrado.
 */
