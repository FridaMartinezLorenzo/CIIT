"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redesController_1 = require("../controllers/redesController");
class RedesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosRedes/',(req,res) => res.send('probando Redes'));
        this.router.get('/mostrarTodosRedes/', redesController_1.red_socialController.mostrar_todos_red_social);
        this.router.get('/obtenerRedSocial/:id', redesController_1.red_socialController.listOne);
        this.router.post('/crearRedSocial/', redesController_1.red_socialController.createRedSocial);
        this.router.put('/actualizarRedSocial/:id', redesController_1.red_socialController.actualizarRedSocial);
        this.router.delete('/eliminarRedSocial/:id', redesController_1.red_socialController.eliminarRedSocial);
        this.router.put('/actualizarFoto/:id', redesController_1.red_socialController.actualizarFoto);
    }
}
const redesRoutes = new RedesRoutes();
exports.default = redesRoutes.router;
