import { Component, OnInit } from '@angular/core';
import { RedesService } from './../../services/redes.service';
import { Redsocial } from 'src/app/models/red';
import Swal from 'sweetalert2';



import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css']
})
export class RedesComponent implements OnInit {
  liga="";
  pageSize = 4;
  p = 1;
  redes: Redsocial[] = [];
  constructor( private redService:RedesService, private cambioIdiomaService: CambioIdiomaService) {
    this.liga = environment.API_URI_IMAGES;
    this.redService.list().subscribe((red_social: any) => {
      this.redes = red_social
    }, err => console.error(err));

  }

  ngOnInit(): void {

  }
  eliminarRed(id: any) {
    Swal.fire({
      title: '¿Estás seguro de eliminar?',
      text: 'No podrás recuperar la información',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.redService.eliminarRed(id).subscribe((red_social: any) => {
          this.redes = red_social
        }, err => console.error(err));
        Swal.fire(
          'Eliminado',
          'La red social ha sido eliminada',
          'success'
        )
      }
    })
  }
  cambiarIdioma(){
  }
  // actualizarFoto(id: any) {}
  guardandoImagen(){}
  cargandoImagen(id:any){}
  actualizarRed(id:any) {

  }
  mostrarImagen(id:any){

  }
  eliminarred(id:any){}
  


}
