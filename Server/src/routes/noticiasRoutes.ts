import { Router } from 'express';
import { noticiasController } from '../controllers/noticiasController';
class NoticiasRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {

        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));

        this.router.post('/crearNoticia/', noticiasController.createNoticia);
        this.router.get('/MostrarNoticias/', noticiasController.mostrar_noticias);
        this.router.put('/actualizarNoticia/:id', noticiasController.actualizarNoticia);
        this.router.delete('/eliminarNoticia/:id', noticiasController.eliminarNoticia);
        this.router.get('/ListOne/:id', noticiasController.listOne);
        this.router.put('/actualizarFoto/:id', noticiasController.actualizarFoto);

    }
}
const noticiasRoutes = new NoticiasRoutes();
export default noticiasRoutes.router;
