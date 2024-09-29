/**
 * @swagger
 * /enderecos:
 *   get:
 *     summary: Lista todos os endereços
 *     tags: [Endereços]
 *     responses:
 *       200:
 *         description: Lista de endereços obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Endereco'
 *
 *   post:
 *     summary: Cria um novo endereço
 *     tags: [Endereços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Endereco'
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
 *
 * /enderecos/{id}:
 *   get:
 *     summary: Obtém um endereço pelo ID
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do endereço
 *     responses:
 *       200:
 *         description: Endereço obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Endereco'
 *
 *   put:
 *     summary: Atualiza um endereço pelo ID
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do endereço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Endereco'
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso
 *
 *   delete:
 *     summary: Deleta um endereço pelo ID
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do endereço
 *     responses:
 *       200:
 *         description: Endereço deletado com sucesso
 *
 * components:
 *   schemas:
 *     Endereco:
 *       type: object
 *       required:
 *         - rua
 *         - cep
 *         - bairro
 *         - uf
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do endereço
 *         rua:
 *           type: string
 *           description: Nome da rua do endereço
 *         cep:
 *           type: string
 *           description: CEP do endereço
 *         bairro:
 *           type: string
 *           description: Bairro do endereço
 *         uf:
 *           type: string
 *           description: Unidade federativa (estado) do endereço
 *         complemento:
 *           type: string
 *           description: Complemento do endereço
 *         user_id:
 *           type: string
 *           description: ID do usuário associado ao endereço
 */
