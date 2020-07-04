import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = `${environment.url_services}/img`;

    if(!img) {
      return `${url}/usuario/noImge`;
    }

    if (img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'usuario':
        url = `${url}/usuarios/${img}`;
        break;

      case 'medico':
        url = `${url}/medicos/${img}`;
        break;

      case 'hospital':
        url = `${url}/hospitales/${img}`;
        break;

      default:
      console.log('Tipo de imagen no existe');
      url = `${url}/usuario/noImge`;
    }

    return url;
  }

}
