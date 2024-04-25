import { Router } from 'express';
import { empresasController } from '../controllers/empresasController';
class EmpresasRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {

        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));

        this.router.post('/crearEmpresa/', empresasController.createEmpresa);
        this.router.get('/MostrarTodasEmpresas/', empresasController.mostrar_todos_empresa);
        this.router.put('/actualizarEmpresa/:id', empresasController.actualizarEmpresa);
        this.router.delete('/eliminarEmpresa/:id', empresasController.eliminarEmpresa);
        this.router.get('/ListOneEmpresa/:id', empresasController.listOne);
        this.router.put('/actualizarFotito/:id', empresasController.actualizarFotito);

    }
}
const empresasRoutes = new EmpresasRoutes();
export default empresasRoutes.router;
