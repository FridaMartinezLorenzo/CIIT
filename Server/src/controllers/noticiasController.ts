import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class NoticiasController
{
    public async createNoticia(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const resp = await pool.query("INSERT INTO noticias set ?",[req.body]);
        console.log(resp);
        res.json(resp);
        //res.json(null);
    }


    public async mostrar_noticias(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM noticias' );
        res.json( respuesta );
    }
    public async actualizarNoticia(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE noticias set ? WHERE id_noticia = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
    }
    public async eliminarNoticia(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM noticias WHERE id_noticia = ${id}`);
        res.json(resp);
    }

    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM noticias WHERE id_noticia = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
    }

    public async actualizarFoto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const resp = await pool.query("UPDATE noticias set foto = 1 WHERE id_noticia = ?", [id]);
        res.json(resp);
    }

}
export const noticiasController = new NoticiasController();