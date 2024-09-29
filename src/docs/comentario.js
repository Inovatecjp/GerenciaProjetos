/**
 * @swagger
 * /comentarios:
 *   get:
 *     summary: Lista todos os comentários
 *     tags: [Comentários]
 *     responses:
 *       200:
 *         description: Lista de comentários obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *
 *   post:
 *     summary: Cria um novo comentário
 *     tags: [Comentários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *
 * /comentarios/{id}:
 *   get:
 *     summary: Obtém um comentário pelo ID
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do comentário
 *     responses:
 *       200:
 *         description: Comentário obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *
 *   put:
 *     summary: Atualiza um comentário pelo ID
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do comentário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *
 *   delete:
 *     summary: Deleta um comentário pelo ID
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do comentário
 *     responses:
 *       200:
 *         description: Comentário deletado com sucesso
 *
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       required:
 *         - texto
 *         - tarefa_user_id
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do comentário
 *         texto:
 *           type: string
 *           description: Conteúdo do comentário
 *         tarefa_user_id:
 *           type: string
 *           description: ID da relação entre tarefa e usuário
 */
