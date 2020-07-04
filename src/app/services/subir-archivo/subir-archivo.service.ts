import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {
  url = environment.url_services;
  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject ) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }
      };
      xhr.open('PUT',`${this.url}/upload/${tipo}/${id}`, true);
      xhr.send(formData);

      
    });
  }
}
