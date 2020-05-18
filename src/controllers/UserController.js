const User = require('../models/User');
require('dotenv')
const bcrypt = require('bcryptjs');
module.exports = {
    async createUser(req, res,next){
        try {
            const { 
                username,
                email,
                password,
                whatsapp,
                behance,
                instagram,
                facebook,
                descricao_pessoal 
             } = req.body;
             const salt = bcrypt.genSaltSync(10);
             const hash = bcrypt.hashSync(password, salt);
             const user = await User.create({
                username,
                email,
                password : hash,
                whatsapp,
                behance,
                instagram,
                facebook,
                descricao_pessoal 
             })
             return res.status(201).send({message : "cadastrado com sucesso!",user})
        } catch (error) {
            next(error.status || 500);
        }
    },
    async getUser(req, res, next){
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            console.log(id)
            if(!user){
                return res.status(404).json({status : null});
            }
            user.password = null;
            return res.send({user, status : true});
        } catch (error) {
            next(error);
        }
    },
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({where:{email}});
            let isEqual = bcrypt.compareSync(password,user.password);
            if(!isEqual){
                return res.status(404).json({status : null});
            }
            user.password = null;
            return res.send({id : user.id, status : true});
        } catch (error) {
            next(error);
        }
    },
    async deleteUser(req,res,next){
            try {
                const { user_id } = req.params;
                await User.destroy({
                    where : {
                        id : user_id
                    }
                })
                return res.send({message : 'usuário deletado com sucesso!'})
            } catch (error) {
                next(error);
            }
    },
    async updateBibliografia (req,res,next){
        try {
            const { user_id } = req.params;
            console.log(user_id)
            const { descricao_pessoal } = req.body;
            console.log(descricao_pessoal);
            const exist = await User.findByPk(user_id);
            if(exist){
                await User.update({descricao_pessoal},{ where: { id:user_id } });
                return res.send({ message : "bibliografia alterada com sucesso!" });
            }
            return res.status(400).send({ message : 'usuário inexistente!' });
            
        } catch (error) {
            next(error);
        }
    },
    async updateRedesSociais(req, res , next){
        try {
        const { facebook , behance, instagram, whatsapp } = req.body;
        const { user_id : id} = req.params;
        await User.update({
            facebook, behance,
            instagram, whatsapp
        },{
            where : { id }
        })
        return res.send({message : 'Redes sociais alteradas com sucesso!'})
        } catch (error) {
            next(error);
        }
    },
    async updatePassword(req, res , next){
        try {
        const { id } = req.params;
        const { newPassword : password, oldPassword } = req.body;
        const user = await User.findByPk(id);
        console.log(password,oldPassword)
        let isEqual = bcrypt.compareSync(oldPassword,user.password);
        if(!isEqual){
            return res.status(404).json({message : 'senha atual incorreta!'})
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await User.update({
            password : hash 
        },{
            where : { id }
        })
        return res.send({message : 'Senha alterada com sucesso!'})
        } catch (error) {
            next(error);
        }
    },
    async updateEmail(req, res, next){
        try {
            const { id } = req.params;
            const { password, email } = req.body;
            console.log(password,email)

            const user = await User.findByPk(id);
            console.log(user)
            let isEqual = bcrypt.compareSync(password,user.password);
            if(!isEqual){
                return res.status(404).json({message : 'usuário não encontrado!'})
            }
            await User.update({
                email
            },{where : { id }})
            return res.send({message : 'email alterado com sucesso!'})
        } catch (error) {
            next(error)
        }
    },
    
    async updateNome(req, res, next){
        try {
            const { id } = req.params;
            const { password, username } = req.body;
            //const user = await User.findByPk({id});
            // let isEqual = bcrypt.compareSync(password,user.password);
            // if(!isEqual){
            //     return res.status(404).json({message : 'usuário não encontrado!'})
            // }
            await User.update({
                username
            },{
            where : {
                id
            }})
            return res.send({message : 'Nome de usuário atualizado com sucesso!'})
        } catch (error) {
            next(error)
        }
    }
    

} 