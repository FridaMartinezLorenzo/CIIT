import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class EmpresasController
{
    public async createEmpresa(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const resp = await pool.query("INSERT INTO empresa set ?",[req.body]);
        console.log(resp);
        res.json(resp);
        //res.json(null);
    }
    public async mostrar_todos_empresa(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM empresa');
        res.json( respuesta );
    }
    public async actualizarEmpresa(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE empresa set ? WHERE id_empresa = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
    }
    public async eliminarEmpresa(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM empresa WHERE id_empresa = ${id}`);
        res.json(resp);
    }

    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM empresa WHERE id_empresa = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
    }

    public async actualizarFotito(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const resp = await pool.query("UPDATE empresa set fotito = 1 WHERE id = ?", [id]);
        res.json(resp);
    }

}
export const empresasController = new EmpresasController();