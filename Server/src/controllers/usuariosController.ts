import {Request,Response} from 'express';
import bcrypt from 'bcryptjs';
import pool from '../database'; //acceso a la base de datos

class UsuariosController
{
public async mostrar_todos_usuarios(req: Request, res: Response ): Promise<void>{
console.log("YA ESTAMOS AQUI");
const respuesta = await pool.query('SELECT * FROM usuarios');
res.json( respuesta );
}
public async listOne(req: Request, res: Response): Promise <void>{
const {id} = req.params;
const respuesta = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
if(respuesta.length>0){
    res.json(respuesta[0]);
    return ;
}
res.status(404).json({'mensaje': 'Usuario no encontrado'});
}
//aqui va el crud
public async createUsuario(req: Request, res: Response): Promise<void> {
    //console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    req.body.contrasena = await bcrypt.hash(req.body.contrasena, salt);
    //console.log(req.body.contrasena);
    //console.log(await bcrypt.hash(req.body.password, salt))
    try {
        const resp = await pool.query("INSERT INTO usuarios set ?", [req.body]);
        res.json(1);
    } catch (error) {
        console.log(error);
    }       
}

public async actualizarUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    //console.log(req.params);
    console.log(id);
    const resp = await pool.query("UPDATE usuarios set ? WHERE id = ?", [req.body, id]);
    res.json(resp);
    //res.json(null);
}

public async eliminarUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM usuarios WHERE id = ${id}`);
    res.json(resp);
}

public async listarUsuariosRol(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`SELECT nombre, nombre_rol FROM  usuarios LEFT JOIN roles on usuarios.id_rol = roles.id_rol WHERE usuarios.id_Rol = ${id};`);
    res.json(resp);
    //if(resp.length>0){
    //    res.json(resp);
    //    return ;
    //}
    //res.status(404).json({'mensaje': 'No hay usuarios en ese rol'});
}

public async ValidarUsuario(req: Request, res: Response): Promise<void> {
    const parametros = req.body;
    const consulta = "SELECT * FROM usuarios WHERE correo = ?";
    //console.log(parametros);
    //console.log(consulta);
    try {
        const respuesta = await pool.query(consulta, [parametros.correo]);
        if (respuesta.length > 0) {
            const usuario = respuesta[0];
            bcrypt.compare(parametros.contrasena, usuario.contrasena, (err, resEncriptar) => {
                if (resEncriptar) {
                    const prueba = {
                        id_: usuario.id,
                        nombre: usuario.nombre,
                        correo: usuario.correo,
                        id_Rol: usuario.id_Rol
                    };
                    res.json(prueba);
                } else {
                    console.log("Contraseña incorrecta");
                    res.json({ id_Rol: "-1" });
                }
            });
        } else {
            console.log("Usuario no encontrado");
            res.json({ id_Rol: "-1" });
        }
    } catch (error) {
        console.error("Error al validar usuario:", error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}  

public async obtenerUsuarioCorreo(req: Request, res: Response): Promise<void> {
    const { correo } = req.params;
    const resp = await pool.query(`SELECT * FROM usuarios WHERE correo = '${correo}'`);
    if(resp.length>0)
        res.json(resp);
    else
        res.json({"id_Rol":"-1"});
}


public async actualizarContrasena(req: Request, res: Response): Promise<void> {
    const {token} = req.params;
    //Destokenizamos
    const decoded = decodeJWT(token);
    console.log(decoded);

    const salt = await bcrypt.genSalt(10);
    req.body.contrasena = await bcrypt.hash(req.body.contrasena, salt)
    const resp = await pool.query("UPDATE usuarios set ? WHERE correo = ?", [req.body, decoded]);
    res.json(resp);
}


}


function decodeJWT(token:any) {
    return (Buffer.from(token.split('.')[1], 'base64').toString());
}

export const usuariosController = new UsuariosController();