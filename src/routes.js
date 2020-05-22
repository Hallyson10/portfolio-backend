const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const ProjetoController = require('./controllers/ProjetoController');
const ImagesController = require('./controllers/ImagesController');
const multer = require('multer');
const multerConfig = require('./config/multer');
const auth = require('./config/auth')()
routes.get('/',(req,res,next)=>{
    return res.send({message : "ola mundo"})
})

routes
    //.post('/user',UserController.createUser)
    .post('/login',UserController.login)
    .post('/validarToken',UserController.validateToken)
    .get('/user/:id',UserController.getUser)
    .delete('/deleteUsuario/:user_id',auth.authenticate(),UserController.deleteUser)
    .put('/config/:user_id/description',auth.authenticate(),UserController.updateBibliografia)
    .put('/config/:id/nome',auth.authenticate(),UserController.updateNome)
    .put('/config/:id/email',auth.authenticate(),UserController.updateEmail)
    .put('/config/:id/password',auth.authenticate(),UserController.updatePassword)
//projeto
    .post('/config/:user_id/projeto',multer(multerConfig).single('imagem_principal'),auth.authenticate(),ProjetoController.createProjeto)
    .delete('/config/:user_id/projeto/:projeto_id',auth.authenticate(),ProjetoController.removeProjeto)
    .get('/projetos',ProjetoController.getAllProjetos)//numPages && userId
    .get('/projeto/:projeto_id',ProjetoController.getProjeto)
    .put('/projeto/:projeto_id',multer(multerConfig).single('imagem_principal'),auth.authenticate(),ProjetoController.editarProjeto)
//salvar imagem
    .post('/config/projeto/:projeto_id/images',multer(multerConfig).single('imagem_projeto'),auth.authenticate(),ImagesController.salvarImagem)
//editar imagem
    .put('/config/projeto/:projeto_id/images/:imagem_atual',multer(multerConfig).single('imagem_update'),auth.authenticate(),ImagesController.editarImagem)
//excluir imagem
    .delete('/config/projeto/:projeto_id/images/:image_id',auth.authenticate(),ImagesController.excluirImagem)
//recuperar imagens de um post
    .get('/images/:projeto_id',ImagesController.getAllImages)
module.exports = routes;