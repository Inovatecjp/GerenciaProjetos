import endereco from '../sequelize/models/endereco'
import usersService from '../services/userService'

const HttpError = require('../utils/customError/httpError')

const createUser = async(req, res) => {
    try{
        const body = {}

        const {password, password2, username, email, dateBirth, phone, cpf, rua,
            cep, bairro, uf, complemento} = req.body

        if (!password) body.passwordError = "Senha é obrigatória";
        if (!password2) body.password2Error = "Confirmação de senha é obrigatória";
        if (password !== password2) body.passwordMatchError = "As senhas não coincidem";
        if (!username) body.usernameError = "Nome de usuário é obrigatório";
        if (!email) body.emailError = "Email é obrigatório";
        if (!dateBirth) body.dateBirthError = "Data de nascimento é obrigatória";
        if (!phone) body.phoneError = "Número de telefone é obrigatório";
        if (!cpf) body.cpfError = "CPF é obrigatório";
        // if (!rua) body.ruaError = 'Rua é obrigatório'
        // if (!cep) body.cepError = 'CEP é obrigatório'
        // if (!bairro) body.bairroError = 'Bairro é obrigatório'
        // if (!uf) body.ufError = 'UF é obrigatório'
        // if (!complemento) body.complementoError = 'Complemento é obrigatório'

        if (Object.keys(body).length > 0) {
            throw new HttpError(400, JSON.stringify(body));
        }

        body = {password, password2, username, email, dateBirth, phone, cpf, rua,
            cep, bairro, uf, complemento}
            
            const user = await usersService.createUser(body)
            res.status(201).json({data: user})
    } catch (error){
        console.log('userController Create: ', error)
        next(error)
    }
}
    
const updateUser = async(req, res) => {
    try{
        const user = {}, endereco = {}
        const userId = req.userInfo.id
        
        const { username, email, dateBirth, phone, cpf, rua,
            cep, bairro, uf, complemento} = req.body
            
        user = {password, password2, username, email, dateBirth, phone, cpf}

        // endereco = {rua, cep, bairro, uf, complemento}
            
        const resposta = await usersService.updateUser(userId, user, endereco)
        res.status(200).json({data: resposta})
        } catch(error){
            console.log('Erro userControllerUpdate: ', error)
            next(error)
        }
}
            
const deleteUser = async(req, res) => {
    try{
        userId = req.params.id
        
        const resposta = await usersService.deleteUser(userId)
        if (!resposta) throw new error
        res.status(204).send()
    } catch(error){
        console.log ('Erro userControllerDelete: ', error)
        next(error)
    }
}
            
const authenticate = async (req, res) => {
    try {
        const {email, password} = req.body
        const body = {email, password}

        const {token, balance} = await usersService.authenticateUser(body);
        res.status(200).json({ token, balance });
    } catch (error) {
        next(error)
    }
}

const getAllUser = async(req, res) => {
    try{
        const users = await usersService.getAllUser()
        res.status(200).json({data: users})
    }catch (error){
        next(error)
    }
}

const getUserWithoutPassword = async(req, res) => {
    try{
        const user = await usersService.getUserWithoutPassword(req.userInfo.id)
        res.status(200).json({data: user})
    } catch(error){
        next (error)
    }
}


// exports.mudarSenha = async (req, res) => {
//     try {
//         await usersService.mudarSenha(req.body, req.userInfo.id)
//         res.status(204).send()
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// }

// exports.resetPassword = async (req, res) => {
//     try {
//         await usersService.resetPassword(req.userInfo.id, req.body.token, req.body.newPassword, req.body.newPassword2)
//         res.status(204).send()
//     } catch (error) {
//         res.status(500).json({error: error.message})        
//     }
// }

// exports.requestPasswordReset = async (req, res) => {
//     try {
//         await usersService.requestPasswordReset(req.body.email)
//         res.status(204).send()
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// }
    
module.exports = {
    createUser,
    deleteUser,
    authenticate,
    updateUser,
    getAllUser,
    getUserWithoutPassword,
}