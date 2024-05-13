import { Router } from 'express';
import { red_socialController } from '../controllers/redesController';
class RedesRoutes
    {
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        //this.router.get('/mostrarTodosRedes/',(req,res) => res.send('probando Redes'));
        this.router.get('/mostrarTodosRedes/',red_socialController.mostrar_todos_red_social );
        this.router.get('/obtenerRedSocial/:id',red_socialController.listOne);
        this.router.post('/crearRedSocial/',red_socialController.createRedSocial);
        this.router.put('/actualizarRedSocial/:id',red_socialController.actualizarRedSocial);
        this.router.delete('/eliminarRedSocial/:id',red_socialController.eliminarRedSocial);
        this.router.put('/actualizarFoto/:id',red_socialController.actualizarFoto);

    }
}
const redesRoutes= new RedesRoutes();
export default redesRoutes.router;