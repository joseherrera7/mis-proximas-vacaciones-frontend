import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor() {}

  getImageInfo(file) {
    console.log('File', file)
    const formData = new FormData();
    formData.append('upload', file, 'image.jpg') 

    formData.append(
      'user_image',
      file,
      'imagen.jpg'
    );
    let headers = new Headers();

    console.log('Formdata:', formData);

    var requestOptions = {
      method: 'POST',
      body: formData,
      headers
    };

    return fetch(environment.server + 'api/processImage', requestOptions)
  }
 
}
