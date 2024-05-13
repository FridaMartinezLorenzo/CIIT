import { Component, OnInit } from '@angular/core';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  idioma: any = '1';

  constructor(private cambioIdiomaService: CambioIdiomaService, private router: Router) { 
    this.idioma = localStorage.getItem("idioma");

  }

  ngOnInit(): void {
    $('.tooltipped').tooltip();
    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        if (msg != '') {
          this.idioma = msg;
        }
        else
          this.idioma = localStorage.getItem('idioma')
        console.log("idioma actual del footer:", this.idioma, " aaaa");
      });

  }
  getTooltip() {
    if (this.idioma === '1') {
      return 'Agregar red social';
    }
    if (this.idioma === '2') {
      return 'Add social networks';
    }
    
    return ''; // Add a default return statement
  }
  redes()
  {
    this.router.navigateByUrl('/home/redes');
  }

}
