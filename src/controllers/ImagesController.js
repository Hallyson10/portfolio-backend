const Images = require('../models/Images');
const fs = require('fs');
const path = require('path');

module.exports = {
    async salvarImagem(req,res,next){
        try {
            const { filename , originalname } = req.file;
            const { projeto_id } = req.params;
            await Images.create({
                id : filename,
                original_name : originalname,
                projeto_id
            });
            return res.send({message : 'Imagem salva com sucesso!'});
        } catch (error) {
            next(error);
        }
    },
    async editarImagem(req,res,next){
        try {
            const { imagem_atual } = req.params;
            const { filename } = req.file;
            let existImage = await Images.findByPk(imagem_atual);
            if(existImage){
                await Images.update({ id : filename }, {
                    where : {
                        id : imagem_atual
                    }
                })
                fs.unlink(path.resolve(__dirname,'..','..','imageProjeto','uploads',imagem_atual), (err) => {
                    if (err) {
                      return res.status(400).json()
                    }
                  })
                return res.send({message : 'imagem alterada com sucesso!'});
            }
            fs.unlink(path.resolve(__dirname,'..','..','imageProjeto','uploads',filename), (err) => {
                if (err) {
                  return res.status(400).json()
                }
              })
            return res.status(404).json({message : "imagem não encontrada"});
        } catch (error) {
            next(error);
        }
    },
    async excluirImagem(req, res, next){
        try {
            const {projeto_id, image_id } = req.params;
            await Images.destroy({
                where : {projeto_id, id : image_id }
            })
            fs.unlink(path.resolve(__dirname,'..','..','imageProjeto','uploads',image_id), (err) => {
                if (err) {
                  console.error(err)
                  return res.status(400).json()
                }
                  return res.send({message : 'removida com sucesso!'});
              })
            
        } catch (error) {
            next(error);
        }
    },
    async getAllImages(req, res, next){
        try {
            const { projeto_id } = req.params;
            const images = await Images.findAll({
                where : { projeto_id }
            })
        return res.send(images);
        } catch (error) {
            next(error)
        }
    },

}