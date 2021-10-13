import { ApiServiceService } from './../services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { ImagePickerConf } from 'ngp-image-picker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  botonBuscar = false;
  imagen: any;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
  }

  imagePickerConf: ImagePickerConf = {
    borderRadius: "4px",
    language: "en",
    width: "320px",
    height: "240px",
  };

  onImageChange(e) {
    console.log('imagen guardada', e)
    this.imagen = e;
    this.apiService.getImageInfo(e)
    this.botonBuscar = true;
  }

}
