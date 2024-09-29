/**
 * @swagger
 * /tarefas:
 *   get:
 *     summary: Lista todas as tarefas
 *     tags: [Tarefas]
 *     responses:
 *       200:
 *         description: Lista de tarefas obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarefa'
 *
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarefa'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *
 * /tarefas/{id}:
 *   get:
 *     summary: Obtém uma tarefa pelo ID
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *
 *   put:
 *     summary: Atualiza uma tarefa pelo ID
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tarefa'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *
 *   delete:
 *     summary: Deleta uma tarefa pelo ID
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *
 * components:
 *   schemas:
 *     Tarefa:
 *       type: object
 *       required:
 *         - title
 *         - projeto_id
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da tarefa
 *         title:
 *           type: string
 *           description: Título da tarefa
 *         descricao:
 *           type: string
 *           description: Descrição da tarefa
 *         data_inicio:
 *           type: string
 *           format: date
 *           description: Data de início da tarefa
 *         data_fim:
 *           type: string
 *           format: date
 *           description: Data de fim da tarefa
 *         status:
 *           type: string
 *           description: Status da tarefa
 *         projeto_id:
 *           type: string
 *           description: ID do projeto ao qual a tarefa pertence
 */
