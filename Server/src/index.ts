import express, { Application } from 'express';
import swagger_ui_express from 'swagger-ui-express';
import indexRoutes from './routes/indexRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import empresasRoutes from './routes/empresasRoutes';
import ofertaLaboralRoutes from './routes/ofertaLaboralRoutes';
import rolesRoutes from './routes/rolesRoutes';
import morgan from 'morgan';
import cors from 'cors';
import { validarToken } from './middleware/auth'
import redesRoutes from './routes/redesRoutes';
//import swaggerDocument from './swagger.json';
class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        //this.app.use('/documentacion', swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000); //En que puerto va a ejecutar
        this.app.use(morgan('dev')); //que ejecutamos y que tiempo
        this.app.use(cors());
        this.app.use(express.json()); //permite que utilicemos json
        this.app.use(express.urlencoded({ extended: false })); //decodifca las url
    }
    routes(): void {
        this.app.use(indexRoutes);
        this.app.use('/api/usuarios', usuariosRoutes);
        this.app.use('/api/empresas', empresasRoutes);
        this.app.use('/api/ofertaLaboral', ofertaLaboralRoutes);
        this.app.use('/api/roles', rolesRoutes);
        this.app.use('/api/red_social', redesRoutes);

    }
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('El servidor se esta ejecutando en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
