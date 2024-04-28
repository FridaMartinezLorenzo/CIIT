import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/Empresa';
import { OfertaLaboral } from 'src/app/models/OfertaLaboral';
import { EmpresaService } from 'src/app/services/empresa.service';
import { OfertaLaboralService } from 'src/app/services/oferta-laboral.service';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-oferta-laboral',
  templateUrl: './oferta-laboral.component.html',
  styleUrls: ['./oferta-laboral.component.css']
})
export class OfertaLaboralComponent implements OnInit {
  ofertas: OfertaLaboral[] = [];
  oferta: OfertaLaboral = new OfertaLaboral();
  ofertaNueva: OfertaLaboral = new OfertaLaboral();
  empresas: Empresa[] = [];
  empresa: Empresa = new Empresa();
  liga = '';
  empresaNombres: { [id: number]: [string, number] } = {};  //Diccionario de nombres de empresas
  pageSize = 2;
  idioma: any = 1;
  p = 1;
  constructor(private cambioIdiomaService: CambioIdiomaService,private ofertaService: OfertaLaboralService, private empresaService: EmpresaService) {
    this.idioma = localStorage.getItem("idioma");
    this.liga = environment.API_URI_IMAGES;
    this.cambioIdiomaService.currentMsg$.subscribe(
        (msg) => {
          if(msg != ''){
            this.idioma = msg;
          }
        });
  }
  ngOnInit(): void {
    $(document).ready(function () {
      $('.modal').modal();
    });

    this.initDatepicker();
    this.ofertaService.list().subscribe((resOfertas: any) => {
      this.ofertas = resOfertas;
      this.empresaService.list().subscribe((resEmpresa: any) => {
        this.empresas = resEmpresa;
        this.construirDiccionarioEmpresas();  //Construye un diccionario con los id's y los nombres de las empresas
      }, err => console.log(err))
    }, err => console.error(err));
  }
  actualizarOferta(id_oferta: any) {
    this.ofertaService.listOne(id_oferta).subscribe((resOferta: any) => {
      this.oferta = resOferta;
      $('#modalModificarOferta').modal();
      $("#modalModificarOferta").modal("open");
    }, err => console.error(err));
  }
  guardarActualizarOferta() {
    this.ofertaService.actualizarOferta(this.oferta).subscribe((res) => {
      $('#modalModificarOferta').modal('close');
      this.ofertaService.list().subscribe((resOfertas: any) => {
        this.ofertas = resOfertas;
      }, err => console.error(err));
      if (this.idioma == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Plan Actualizado'
        })
    }
    else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Updated Plan'
        })
    }
    }, err => console.error(err));
  }

openModalCrearOferta() {
  this.empresaService.list().subscribe((resEmpresa: any) => {
    this.empresas = resEmpresa;
    this.empresa= this.empresas[0];
    this.oferta.id_empresa = this.empresa.id_empresa;
  })
    $("#modalOferta").modal("open");
}


  construirDiccionarioEmpresas() {
    this.empresaNombres = {};
    this.empresas.forEach(empresa => {
      this.empresaNombres[empresa.id_empresa] = [empresa.nombre_empresa, empresa.fotito];
    });
  }

  crearOferta() {
    if (this.oferta.atributoVacioONulo(this.oferta)) 
      {
      this.ofertaService.crearOferta(this.oferta).subscribe((res) => {
        if (this.idioma == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Oferta creada exitosamente!'
          })
      }
      else {
          Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'Offer created successfully!'
          })
      }});

      this.ofertaService.list().subscribe((resOfertas: any) => {
        this.ofertas = resOfertas;

      }, err => console.error(err));
    }
    else
    if (this.idioma == 1) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'Debes rellenar todos los campos!'
      })
  }
  else {
      Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'You must fill all the fields!'
      })
    }
      this.oferta = new OfertaLaboral();



  }


  
  guardarNuevaOferta() {
    this.ofertaService.crearOferta(this.ofertaNueva).subscribe((res) => {
      $('#modalCrearOferta').modal('close');
      this.ofertaService.list().subscribe((resOfertas: any) => {
        this.ofertas = resOfertas;
      }, err => console.error(err));
      if (this.idioma == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Plan Actualizado'
        })
    }
    else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Updated Plan'
        })
    }
    }, err => console.error(err));
  }
  eliminarOferta(id_oferta: any) {

    if (this.idioma == 1) {
      Swal.fire({
        title: "¿Estás seguro de eliminar esta oferta?",
        text: "¡No es posible revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, quiero eliminarlo!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.ofertaService.eliminarOferta(id_oferta).subscribe((resOferta: any) => {
            this.ofertaService.list().subscribe((resOferta: any) => {
              this.ofertas = resOferta;
              this.ofertaService.list().subscribe((resOfertas: any) => {
                this.ofertas = resOfertas;
              });
            },
              err => console.error(err)
            );
          },
            err => console.error(err)
          );
  
  
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu archivo ha sido eliminado.",
            icon: "success"
          });
        }
      });
  }
  else {
    Swal.fire({
      title: "Are you sure to delete this offer?",
      text: "It is not possible to reverse this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want to delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.ofertaService.eliminarOferta(id_oferta).subscribe((resOferta: any) => {
          this.ofertaService.list().subscribe((resOferta: any) => {
            this.ofertas = resOferta;
            this.ofertaService.list().subscribe((resOfertas: any) => {
              this.ofertas = resOfertas;
            });
          },
            err => console.error(err)
          );
        },
          err => console.error(err)
        );


        Swal.fire({
          title: "Removed!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }



    

  }

  initDatepicker(fecha?: any) {
    let date = "2024-07-26";
    //if(fecha){
    //date = new Date(fecha += 'T00:00:00');
    $('#fechaOferta').datepicker({
      format: "yyyy-mm-dd",
      defaultDate: date,
    });
    //}
  }



}
