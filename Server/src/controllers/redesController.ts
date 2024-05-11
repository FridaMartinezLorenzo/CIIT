import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class RedSocialController
    {
    public async mostrar_todos_red_social(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM red_social');
        res.json( respuesta );
    }
    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM red_social WHERE id = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Red social no encontrado'});
    }
    public async createRedSocial(req: Request, res: Response): Promise<void> {
        //console.log(req.body)
        const resp = await pool.query("INSERT INTO red_social set ?",[req.body]);
        res.json(resp);
        //res.json(null);
    }

    public async actualizarRedSocial(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE red_social set ? WHERE id = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
    }

    public async eliminarRedSocial(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        // Eliminar el rol
        const resp = await pool.query(`DELETE FROM red_social WHERE id = ${id}`);
        res.json(resp);
    }
}

export const red_socialController = new RedSocialController();