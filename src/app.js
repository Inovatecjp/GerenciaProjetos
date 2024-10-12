require('dotenv').config();
const express = require('express');
const cors = require('cors');
const setupSwagger = require('./docs/swagger')
const HttpError = require('./utils/customError/httpError');

const RedisStore = require("connect-redis").default
const session = require('express-session')
const {createClient} = require('redis')

const whiteList = ['http://192.168.15.73:3000','*','http://localhost:3000','http://25.51.2.93:3000'];

const tarefasRouter = require('./routes/tarefasRouter.js')
const userRouter = require('./routes/userRouter.js')
const projetoUsuarioRouter = require('./routes/projetoUsuarioRouter.js');
const categoriasRoutes = require('./routes/categoriasRoutes.js');
const comentariosRoutes = require('./routes/comentariosRoutes.js');
const enderecoRoutes = require('./routes/enderecoRoutes.js');
const projetosRoutes = require('./routes/projetosRoutes.js');
const profileRoutes = require("./routes/profileRoutes");
const tarefaUsuarioRoutes = require('./routes/tarefaUsuarioRoutes');
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// let redisClient = createClient({
//   url: "redis://localhost:6379"
// })
// redisClient.connect().catch(console.error)

// let redisStore = new RedisStore({
//   client: redisClient,
//   prefix: "gerencia:",
//   ttl: 60 * 60 * 24 //Opcional - Time-To-Live
// })

class App {
  constructor() {
    this.app = express();
    // this.redisClient = redisClient
    this.middlewares();
    this.routes();
    setupSwagger(this.app)
    this.errorHandling()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    // this.app.use(session({
    //   name: 'IJP',
    //   store: redisStore,
    //   resave: false,
    //   saveUninitialized: true,
    //   secret: process.env.COOKIE_SECRET,
    //   cookie:{
    //     httpOnly: false,
    //     maxAge: 1000 * 60 * 60 * 24
    //   }
    // }))
  }

  routes() {
    this.app.use("/tarefas", tarefasRouter);
    this.app.use("/users", userRouter);
    this.app.use("/projeto-usuario", projetoUsuarioRouter);
    this.app.use("/categorias", categoriasRoutes);
    this.app.use("/comentarios", comentariosRoutes);
    this.app.use("/enderecos", enderecoRoutes);
    this.app.use("/projetos", projetosRoutes);
    this.app.use('/tarefaUsuario', tarefaUsuarioRoutes);
    this.app.use('/projetoprofile', tarefaUsuarioRoutes);
       
    this.app.use("/profiles", profileRoutes);
  
  }

  errorHandling() {
    this.app.use((error, req, res, next) => {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    })
  }

  start(port) {
    this.app.listen(port, () => {
      console.log('Rodando na porta: ', port);
      console.log('Documentação: ', process.env.URL_API + '/api-docs');
    });
  }
}

module.exports = App;
