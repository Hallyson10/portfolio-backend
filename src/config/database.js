require('dotenv').config()

module.exports = {
    username : 'postgres',
         password : '',
         database : '',
        define : {
            timestamps : true,
            underscored : true
        },
        dialect : 'postgres'
          // host : process.env.HOST,
          // username : process.env.USER,
          // password : process.env.PASSWORD,
          // database : process.env.DATA_BASE,
          // port : process.env.PORT,
          // dialect : 'postgres',
          //   define : {
          //     timestamps : true,
          //     underscored : true
          // },
          // dialectOptions: {
          //     ssl: true
          // },
  }

// {
//         host : process.env.HOST,
//         username : process.env.USER,
//         password : process.env.PASSWORD,
//         database : process.env.DATA_BASE,
//         port : process.env.PORT,
//         dialect : 'postgres',
//           define : {
//             timestamps : true,
//             underscored : true
//         },
//         dialectOptions: {
//             ssl: true
//         },
// }
