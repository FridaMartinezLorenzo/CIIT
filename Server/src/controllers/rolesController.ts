import {Request,Response} from 'express';
import pool from '../database'; //acceso a la base de datos
class RolesController
    {
    public async mostrar_todos_roles(req: Request, res: Response ): Promise<void>{
        console.log("YA ESTAMOS AQUI");
        const respuesta = await pool.query('SELECT * FROM roles');
        res.json( respuesta );
    }
    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM roles WHERE id_rol = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Rol no encontrado'});
    }
    //aqui va el crud
    public async createRol(req: Request, res: Response): Promise<void> {
        //console.log(req.body)
        const resp = await pool.query("INSERT INTO roles set ?",[req.body]);
        res.json(resp);
        //res.json(null);
    }

    public async actualizarRol(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //console.log(req.params);
        console.log(id);
        const resp = await pool.query("UPDATE roles set ? WHERE id_rol = ?", [req.body, id]);
        res.json(resp);
        //res.json(null);
    }

    public async eliminarRol(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        // Obtener nombre_rol del rol que se va a eliminar
        const respNombreRol = await pool.query(`SELECT nombre_rol FROM roles WHERE id_rol = ${id}`);
        const nombreRol = respNombreRol[0]?.nombre_rol;

        // Eliminar ofertas laborales donde aparezca el nombre del rol en el campo puesto
        await pool.query(`DELETE FROM ofertalaboral WHERE puesto = '${nombreRol}'`);

        // Eliminar usuarios con el mismo id_rol
        await pool.query(`DELETE FROM usuarios WHERE id_rol = ${id}`);

        // Eliminar el rol
        const resp = await pool.query(`DELETE FROM roles WHERE id_rol = ${id}`);

        res.json(resp);
    }
}

export const rolesController = new RolesController();