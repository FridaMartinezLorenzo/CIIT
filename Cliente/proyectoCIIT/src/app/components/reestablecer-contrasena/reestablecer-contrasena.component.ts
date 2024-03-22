import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reestablecer-contrasena',
  templateUrl: './reestablecer-contrasena.component.html',
  styleUrls: ['./reestablecer-contrasena.component.css']
})
export class ReestablecerContrasenaComponent implements OnInit {
  token : string = "";
  nuevaContrasena : string = "";
  nuevaContrasenaConfirmacion : string = "";

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) {
    this.nuevaContrasena = "";
    this.nuevaContrasenaConfirmacion = "";
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      console.log(this.token); 
    });

  }

  actualizarContrasena(){
    console.log(this.nuevaContrasena);
    console.log(this.nuevaContrasenaConfirmacion);

    if (this.nuevaContrasena == "" || this.nuevaContrasenaConfirmacion == ""){
      Swal.fire({
        title: 'Error',
        text: 'Por favor llene todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      return;
    }else{
      if (this.nuevaContrasena != this.nuevaContrasenaConfirmacion){
        Swal.fire({
          title: 'Error',
          text: 'Las contraseñas no coinciden',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        return;
      }else{
        this.usuarioService.actualizarContrasena(this.token, this.nuevaContrasena).subscribe((res : any) => {
          console.log(res);
          Swal.fire({
            title: 'Actualización exitosa',
            text: 'Se ha actualizado su contraseña',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        }, err => console.error(err));
      }


    }
    
  }

}
