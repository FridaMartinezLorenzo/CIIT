"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noticiasController_1 = require("../controllers/noticiasController");
class NoticiasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.post('/crearNoticia/', noticiasController_1.noticiasController.createNoticia);
        this.router.get('/MostrarNoticias/', noticiasController_1.noticiasController.mostrar_noticias);
        this.router.put('/actualizarNoticia/:id', noticiasController_1.noticiasController.actualizarNoticia);
        this.router.delete('/eliminarNoticia/:id', noticiasController_1.noticiasController.eliminarNoticia);
        this.router.get('/ListOne/:id', noticiasController_1.noticiasController.listOne);
        this.router.put('/actualizarFoto/:id', noticiasController_1.noticiasController.actualizarFoto);
    }
}
const noticiasRoutes = new NoticiasRoutes();
exports.default = noticiasRoutes.router;
