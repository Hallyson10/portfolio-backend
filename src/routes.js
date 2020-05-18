const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const ProjetoController = require('./controllers/ProjetoController');
const ImagesController = require('./controllers/ImagesController');
const multer = require('multer');
const multerConfig = require('./config/multer');
routes.get('/',(req,res,next)=>{
    return res.send({message : "ola mundo"})
})

routes.post('/user',UserController.createUser);
routes.post('/login',UserController.login);
routes.get('/user/:id',UserController.getUser);
routes.delete('/deleteUsuario/:user_id',UserController.deleteUser);
routes.put('/config/:user_id/description',UserController.updateBibliografia);
routes.put('/config/:id/nome',UserController.updateNome);
routes.put('/config/:id/email',UserController.updateEmail);
routes.put('/config/:id/password',UserController.updatePassword);
//projeto
routes.post('/config/:user_id/projeto',multer(multerConfig).single('imagem_principal'),ProjetoController.createProjeto);
routes.delete('/config/:user_id/projeto/:projeto_id',ProjetoController.removeProjeto);
routes.get('/projetos',ProjetoController.getAllProjetos);//numPages && userId
routes.get('/projeto/:projeto_id',ProjetoController.getProjeto);
routes.put('/projeto/:projeto_id',multer(multerConfig).single('imagem_principal'),ProjetoController.editarProjeto);
//salvar imagem
routes.post('/config/projeto/:projeto_id/images',multer(multerConfig).single('imagem_projeto'),ImagesController.salvarImagem);
//editar imagem
routes.put('/config/projeto/:projeto_id/images/:imagem_atual',multer(multerConfig).single('imagem_update'),ImagesController.editarImagem);
//excluir imagem
routes.delete('/config/projeto/:projeto_id/images/:image_id',ImagesController.excluirImagem);
//recuperar imagens de um post
routes.get('/images/:projeto_id',ImagesController.getAllImages);
module.exports = routes;