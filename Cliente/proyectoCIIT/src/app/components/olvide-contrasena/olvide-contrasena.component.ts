import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CorreoService } from 'src/app/services/correo.service';

@Component({
  selector: 'app-olvide-contrasena',
  templateUrl: './olvide-contrasena.component.html',
  styleUrls: ['./olvide-contrasena.component.css']
})
export class OlvideContrasenaComponent implements OnInit {

  correo : string = "";

  constructor(private correosService: CorreoService) {
    this.correo = "";
   }

  ngOnInit(): void {
  }

  enviarCorreo() {
    this.correosService.verificarCorreo(this.correo).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.correosService.enviarCorreoRecuperarContrasena({ Email: this.correo }).subscribe((res: any) => {
          //console.log('Correo enviado:', res);
          Swal.fire({
            title: 'Correo enviado',
            text: 'Se ha enviado un correo a su dirección de correo electrónico',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        }, error => {
          console.error('Error al enviar el correo:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar el correo electrónico',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
      } else {
        Swal.fire({
          title: 'Correo no encontrado',
          text: 'No te encuentras registrado en el sistema o el correo que proporcionaste es incorrecto',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }, error => {
      console.error('Error al verificar el correo:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al verificar el correo',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    });
  }
}
