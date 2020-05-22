const express = require('express');
const routes = require('./routes');
require('dotenv').config();
const path = require('path')
const app = express();
require('./database');
const passport = require('passport')
//#####RESTRIÇÕES DE ACESSO A API
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", '');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
//######
const cors = require('cors')
app.use(express.json());
app.use(passport.initialize())
app.use(cors());
app.use(routes);
app.use('/files',express.static(path.join(__dirname,'..','imageProjeto','uploads')));
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({error : error.message})
})
app.listen(3333);
//app.listen(process.env.PORT || 3333);

