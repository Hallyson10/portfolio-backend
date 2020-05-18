const User = require('../models/User');
const Projeto = require('../models/Projetos');
const Images = require('../models/Images')
const path = require('path');
const fs = require('fs');
module.exports = {
    async createProjeto(req, res, next){
        const { user_id } = req.params;
        const { filename } = req.file;
        const { titulo, sub_titulo, descricao, data_realizacao} = req.body;
        try {
        const user = await User.findByPk(user_id);
        if(!user){
            next(res.status(400).json({message : 'Usuário sem permissão!'}))
        }
        const projeto = await Projeto.create({
            user_id,
            titulo,
            sub_titulo,
            descricao,
            data_realizacao,
            imagem_principal : filename
        });
         return res.status(200).send({message : 'Cadastrado com sucesso!',projeto});
        } catch (error) {
            next(error);
        }
    },
    async removeProjeto(req, res, next){
        try {
            const { projeto_id } = req.params;
            let imagesProjeto = await Images.findAll({ where: { projeto_id }} );
            //removendo o projeto
            await Projeto.destroy({
                where : {id : projeto_id}
            })
            //removendo imagens do projeto no disco
            if(imagesProjeto.length >= 1){
                imagesProjeto.forEach(async(item) =>
                await fs.unlink(path.resolve(__dirname,'..','..','imageProjeto','uploads',item.id), (err) => {
                    if (err) {
                      return true;
                    }
                  }))
            }
            return res.send({message : 'projeto removido com sucesso!'})
        } catch (error) {
            next(error);
        }
    },
    async getProjeto(req,res,next){
        try {
            const { projeto_id } = req.params;
            const projeto = await Projeto.findByPk(projeto_id);
            const images = await Images.findAll({
                where : { projeto_id }
            })
            if(projeto && images.length >= 1){
                return res.send({projeto,images});
            }
            return res.status(400).send({message : "Projeto inexistente!"})
        } catch (error) {
            next(error);
        }
    },
    async getAllProjetos(req,res,next){
        try {
            const { page = 1 } = req.query;
            const projeto = await Projeto.findAll({
                offset : (page - 1) * 5,
                limit : 50
            });
            const findUser = await User.findAll();
            const user = {
                descricao_pessoal: findUser[0].descricao_pessoal,
                email: findUser[0].email,
                facebook: findUser[0].facebook,
                instagram: findUser[0].instagram,
                whatsapp: findUser[0].whatsapp,
                behance: findUser[0].behance,
                username: findUser[0].username,
            }
            if(projeto && findUser.length >= 1){
                return res.send({projeto,user});
            }
            return res.status(400).send({message : "Projeto inexistente!"})
        } catch (error) {
            next(error);
        }
    },
    async editarProjeto(req,res,next){
        try {
        const { projeto_id } = req.params;
        const { filename } = req.file;
        const { titulo , sub_titulo, descricao, data_realizacao, imagem_antiga } = req.body;
        async function atualiza(){
            fs.unlink(path.resolve(__dirname,'..','..','imageProjeto','uploads',imagem_antiga), (err) => {
                
              })
            await Projeto.update({
                titulo,
                sub_titulo,
                descricao,
                data_realizacao,
                imagem_principal : filename
            },{
                where : {id : projeto_id}
            })
              return res.send({message : 'Atualizado com sucesso!'});
        }

          atualiza();
        } catch (error) {
            next(error);
        }
    },
}