/**
 * @swagger
 * /projetos:
 *   get:
 *     summary: Lista todos os projetos
 *     tags: [Projetos]
 *     responses:
 *       200:
 *         description: Lista de projetos obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Projeto'
 *
 *   post:
 *     summary: Cria um novo projeto
 *     tags: [Projetos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Projeto'
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
 *
 * /projetos/{id}:
 *   get:
 *     summary: Obtém um projeto pelo ID
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do projeto
 *     responses:
 *       200:
 *         description: Projeto obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Projeto'
 *
 *   put:
 *     summary: Atualiza um projeto pelo ID
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do projeto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Projeto'
 *     responses:
 *       200:
 *         description: Projeto atualizado com sucesso
 *
 *   delete:
 *     summary: Deleta um projeto pelo ID
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do projeto
 *     responses:
 *       200:
 *         description: Projeto deletado com sucesso
 *
 * components:
 *   schemas:
 *     Projeto:
 *       type: object
 *       required:
 *         - name
 *         - orcamento
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do projeto
 *         name:
 *           type: string
 *           description: Nome do projeto
 *         descricao:
 *           type: string
 *           description: Descrição do projeto
 *         orcamento:
 *           type: number
 *           description: Orçamento do projeto
 *         data_inicio:
 *           type: string
 *           format: date
 *           description: Data de início do projeto
 *         data_fim:
 *           type: string
 *           format: date
 *           description: Data de fim do projeto
 *         status:
 *           type: string
 *           description: Status do projeto
 */
