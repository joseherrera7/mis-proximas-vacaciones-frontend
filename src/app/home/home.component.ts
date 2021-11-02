import { ApiServiceService } from './../services/api-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImagePickerConf } from 'ngp-image-picker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  botonBuscar = false;
  imagen: any;
  closeModal: string;
  isRecomendation = false;
  isSearching: boolean;
  imageUrl: string;
  ImageInfo: string;
  document: string;
  mensaje: String;
  link1: string;
  isCaptured: boolean;
  isUploaded: boolean;
  isResult = false;
  data: any;
  recomendacion: string;

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  WIDTH = 480;
  HEIGHT = 220;
  captures: string[] = [];
  error: any;

  constructor(private apiService: ApiServiceService) {
    this.captures = [];
  }

  ngOnInit(): void {}

  imagePickerConf: ImagePickerConf = {
    borderRadius: '4px',
    language: 'en',
    width: '320px',
    height: '240px',
  };

  async onImageChange(e) {
    if (e) {
      this.isRecomendation = false;
      console.log('imagen guardada', e);
      this.isSearching = true;
      this.imagen = e;
      try {
        this.recomendacion = '';
        const file = this.DataURIToBlob(e);
        let response = await this.apiService.getImageInfo(file);
        if (response.ok === false) {
          console.log('Error', response.status, response.statusText);
          this.isSearching = false;
        } else {
          response.json().then((data) => {
            console.log(data);
            this.data = data;
            const area = document.getElementById(
              'resultado'
            ) as HTMLTextAreaElement;
            if (this.data.weather.humidity >= 70) {
              this.recomendacion += 'Llevar capa y paraguas';
              if (this.data.weather.temp < 270) {
                this.recomendacion +=
                  ' y se necesitan abrigos grandes porque esta muy frio.';
              } else {
                this.recomendacion +=
                  ' y no se necesitan abrigos grandes porque no esta muy frio.';
              }
            } else if (this.data.weather.humidity <= 70) {
              this.recomendacion += 'No se necesita paraguas';
              if (this.data.weather.temp < 270) {
                this.recomendacion +=
                  ' y se necesitan abrigos grandes porque esta muy frio.';
              } else {
                this.recomendacion +=
                  ' y no se necesitan abrigos grandes porque no esta muy frio.';
              }
            }
            area.value = this.recomendacion + " Temperatura: " + this.data.weather.temp + " K; Humedad: " + this.data.weather.humidity;
            this.isSearching = false;
            this.isResult = true;
          });
        }
      } catch (error) {
        console.log('Error:', error);
        this.isSearching = false;
      }
    }
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  async analyze() {
    if (this.captures.length == 1) {
      this.isRecomendation = false;
      this.isSearching = true;
      let binary = atob(this.captures[0].split(',')[1]);
      let array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      let blobData1 = new Blob([new Uint8Array(array)], { type: 'image/png' });
      /**
       * SUBIDA A S3
       */
      try {
        let response = await this.apiService.getImageInfo(blobData1);
        if (response.ok === false) {
          console.log('Response', response);
          console.log('Error', response.status, response.statusText);
          this.isSearching = false;
          this.recomendacion = '';
        } else {
          response.json().then((data) => {
            console.log(data);
            this.data = data;
            const area = document.getElementById(
              'resultado'
            ) as HTMLTextAreaElement;
            if (this.data.weather.humidity >= 70) {
              this.recomendacion += 'Llevar capa y paraguas';
              if (this.data.weather.temp < 270) {
                this.recomendacion +=
                  ' y se necesitan abrigos grandes porque esta muy frio.';
              } else {
                this.recomendacion +=
                  ' y no se necesitan abrigos grandes porque no esta muy frio.';
              }
            } else if (this.data.weather.humidity <= 70) {
              this.recomendacion += 'No se necesita paraguas';
              if (this.data.weather.temp < 270) {
                this.recomendacion +=
                  ' y se necesitan abrigos grandes porque esta muy frio.';
              } else {
                this.recomendacion +=
                  ' y no se necesitan abrigos grandes porque no esta muy frio.';
              }
            }
            area.value = this.recomendacion + " Temperatura: " + this.data.weather.temp + " K; Humedad: " + this.data.weather.humidity;
            this.isSearching = false;
            this.isResult = true;
          });
        }
      } catch (error) {
        console.log('Error:', error);
        this.isSearching = false;
      }
    }
  }

  OnFileSelected(event: any) {
    console.log(event);
    let files = event.target.files || event.dataTransfer.files;
    this.createImage(files[0]);
    this.isCaptured = true;
  }

  createImage(file: any) {
    let reader = new FileReader();
    reader.onload = (e: any) => {
      console.log('length: ', e.target.result.includes('data:image/jpeg'));
      this.captures.push(e.target.result);
    };
    reader.readAsDataURL(file);

    console.log(this.captures);
  }

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
    this.isCaptured = true;

    if (this.captures.length > 1) {
      this.captures.shift();
    }

    console.log(this.captures);
  }

  removeCurrent() {
    this.isCaptured = false;
  }

  setPhoto(idx: number) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }
}
