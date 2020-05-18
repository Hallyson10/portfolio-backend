const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host : 'smtp.live.com',
    port : 587,
    secure : true,
    auth : {
        user : 'hallysonjean@hotmail.com',
        pass : 'Ha24091999'
    }
})
transporter.sendMail({
    from : 'Hallyson Jean Gomes Miranda <hallysonjean@hotmail.com>',
    to : 'hallysonjean@hotmail.com',
    subject : 'LOCALIZANDO SEU EMAIL...',
    text : 'Olá, tudo bem? sua senha é',
    html : '<h1>12345678<h1/>'
}).then((message)=>{
    console.log(message)
}).catch((error)=>{
    console.log(error)
})