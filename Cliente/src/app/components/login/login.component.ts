import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = new Usuario() ;
  constructor(private usuarioService : UsuarioService , private router: Router){

  }

  logueo()
  {
    this.usuarioService.existe(this.usuario.correo,this.usuario.contrasena).subscribe((resusuario: any) =>
    {
      if(resusuario.id_Rol != -1)
      {
        localStorage.setItem('correo', resusuario.correo);
        localStorage.setItem('id_Rol', resusuario.id_Rol);
        localStorage.setItem("idioma","1");
        this.router.navigateByUrl('/principal');
      }else{
        console.log("Error, usuario o contrasena no valida");
      }
    },
    err => console.error(err)
    );
  }
}
