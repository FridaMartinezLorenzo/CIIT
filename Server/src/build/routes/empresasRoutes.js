"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresasController_1 = require("../controllers/empresasController");
class EmpresasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.post('/crearEmpresa/', empresasController_1.empresasController.createEmpresa);
        this.router.get('/MostrarTodasEmpresas/', empresasController_1.empresasController.mostrar_todos_empresa);
        this.router.put('/actualizarEmpresa/:id', empresasController_1.empresasController.actualizarEmpresa);
        this.router.delete('/eliminarEmpresa/:id', empresasController_1.empresasController.eliminarEmpresa);
        this.router.get('/ListOneEmpresa/:id', empresasController_1.empresasController.listOne);
        this.router.put('/actualizarFotito/:id', empresasController_1.empresasController.actualizarFotito);
        this.router.delete('/eliminar_datos_foto/:id', empresasController_1.empresasController.eliminar_datos_foto);
        this.router.post('/inserta_datos_foto/', empresasController_1.empresasController.inserta_datos_foto);
        this.router.get('/id_fotos_por_empresa/:id', empresasController_1.empresasController.id_fotos_por_empresa);
    }
}
const empresasRoutes = new EmpresasRoutes();
exports.default = empresasRoutes.router;
