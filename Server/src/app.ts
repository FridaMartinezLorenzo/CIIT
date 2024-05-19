import express, { Application, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwm from 'jsonwebtoken';
import dontev from 'dotenv';
import pool from './database';
const correoAcceso = require('./correoAcceso');
import fs from 'fs';

class Server {
    public app: Application;

    constructor() {
        dontev.config();
        this.app = express();
        this.config();
        this.routes();
        this.app.use(express.static(__dirname+"/imagenes"));
    }

    config(): void {
        this.app.use(express.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: false }));
        this.app.use(express.json({ limit: '50mb' }));
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {

        this.app.post('/uploadImagen', (req, res) => {
            console.log("upload image")
            const file = req.body.src;
            const name = req.body.tipo;
            const id = req.body.id;
            // console.log(__dirname)
            const binaryData =
                Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""),
                    'base64').toString('binary');
            fs.writeFile(`${__dirname}/imagenes/` + name + '/' + id + '.jpg', binaryData,
                "binary", (err) => {
                    console.log(err);
                });
            res.json({ fileName: id + '.jpg' });
        });

        this.app.post('/enviarCorreoRecuperarContrasena', (req, res) => {
            console.log(req.body);
            correoAcceso(req.body);
            res.sendStatus(200);
        });

        this.app.post('/decodificarEmail', async (req, res) => {
            let decode;
            try {
                decode = jwm.verify(req.body.token, process.env.TOKEN_SECRET || 'test');
                const result1 = await this.queryUser(decode) as any;
                if (result1.length == 0) {
                    res.json(0);
                } else {
                    res.json(result1[0]);
                }
            } catch (error) {
                res.json(0);
            }
        });


    }

    queryUser = (decode: any) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM users WHERE email ="' + decode + '"';
            pool.query(query, (err: any, result: any) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    };

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }


}

const server = new Server();
server.start();