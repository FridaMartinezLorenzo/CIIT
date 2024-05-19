"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
const correoAcceso = require('./correoAcceso');
const fs_1 = __importDefault(require("fs"));
class Server {
    constructor() {
        this.queryUser = (decode) => {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM users WHERE email ="' + decode + '"';
                database_1.default.query(query, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
            });
        };
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use(express_1.default.static(__dirname + "/imagenes"));
    }
    config() {
        this.app.use(express_1.default.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: false }));
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.set('port', process.env.PORT || 3001);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.post('/uploadImagen', (req, res) => {
            console.log("upload image");
            const file = req.body.src;
            const name = req.body.tipo;
            const id = req.body.id;
            // console.log(__dirname)
            const binaryData = Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""), 'base64').toString('binary');
            fs_1.default.writeFile(`${__dirname}/imagenes/` + name + '/' + id + '.jpg', binaryData, "binary", (err) => {
                console.log(err);
            });
            res.json({ fileName: id + '.jpg' });
        });
        this.app.post('/enviarCorreoRecuperarContrasena', (req, res) => {
            console.log(req.body);
            correoAcceso(req.body);
            res.sendStatus(200);
        });
        this.app.post('/decodificarEmail', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let decode;
            try {
                decode = jsonwebtoken_1.default.verify(req.body.token, process.env.TOKEN_SECRET || 'test');
                const result1 = yield this.queryUser(decode);
                if (result1.length == 0) {
                    res.json(0);
                }
                else {
                    res.json(result1[0]);
                }
            }
            catch (error) {
                res.json(0);
            }
        }));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
