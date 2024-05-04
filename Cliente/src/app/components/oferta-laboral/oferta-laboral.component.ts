import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Empresa } from 'src/app/models/Empresa';
import { OfertaLaboral } from 'src/app/models/OfertaLaboral';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { OfertaLaboralService } from 'src/app/services/oferta-laboral.service';
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

  idioma: any;
  pageSize = 5;
  p = 1;
  constructor(private ofertaService: OfertaLaboralService, private empresaService: EmpresaService, private translate: TranslateService, private cambioIdiomaService: CambioIdiomaService) {

  }
  ngOnInit(): void {
    this.initDatepicker();
    $(document).ready(function () {
      $('select').formSelect();
    });
    this.ofertaService.list().subscribe((resOfertas: any) => {
      this.ofertas = resOfertas;
      this.empresaService.list().subscribe((resEmpresa: any) => {
        this.empresas = resEmpresa;
        console.log("hola mundo", resOfertas);
      }, err => console.log(err))
    }, err => console.error(err));

    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        if (msg != '') {
          this.idioma = msg;
        }
        else
          this.idioma = localStorage.getItem('idioma')
        console.log("idioma actual:", this.idioma, " aaaa");
      });
  }
  actualizarOferta(id_oferta: any) {
    this.ofertaService.listOne(id_oferta).subscribe((resOferta: any) => {
      this.oferta = resOferta;

      console.log(this.oferta)
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
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: this.translate.instant('Oferta actualizada')
      })
    }, err => console.error(err));
  }
  crearOferta() {
    this.ofertaNueva = new OfertaLaboral();
    console.log("oferta nueva")
    $('#modalCrearOferta').modal();
    $("#modalCrearOferta").modal("open");
  }
  guardarNuevaOferta() {
    if (this.ofertaNueva.id_empresa != 0) {
      console.log("GuardandoOferta")
      this.ofertaService.crearOferta(this.ofertaNueva).subscribe((res) => {
        $('#modalCrearOferta').modal('close');
        this.ofertaService.list().subscribe((resOfertas: any) => {
          this.ofertas = resOfertas;
        }, err => console.error(err));
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: this.translate.instant('Oferta creada')
        })
      }, err => console.error(err));
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('Empresa no seleccionada'),
        text: this.translate.instant('Por favor, seleccione una empresa a la que asignar la oferta.')
      })
    }
  }
  eliminarOferta(id_oferta: any) {
    console.log("Click en eliminar OfertaLaboral");
    console.log("Identificador del OfertaLaboral: ", id_oferta);
    Swal.fire({
      title: this.translate.instant("¿Estás seguro de eliminar esta oferta?"),
      text: this.translate.instant("¡No es posible revertir esta acción!"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.translate.instant("Sí, quiero eliminarlo!"),
      cancelButtonText: this.translate.instant("Cancelar")
    }).then((result) => {
      if (result.isConfirmed) {
        this.ofertaService.eliminarOferta(id_oferta).subscribe((resOferta: any) => {
          console.log("resOferta: ", resOferta);
          this.ofertaService.list().subscribe((resOferta: any) => {
            this.ofertas = resOferta;
            //console.log(resOferta);
            console.log(this.ofertas)
          },
            err => console.error(err)
          );
        },
          err => console.error(err)
        );


        Swal.fire({
          title: this.translate.instant("¡Eliminado!"),
          text: this.translate.instant("La oferta ha sido eliminada."),
          icon: "success"
        });
      }
    });

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