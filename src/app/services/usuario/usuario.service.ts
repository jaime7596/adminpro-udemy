import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = environment.url_services;
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient,
              public router: Router) {
    this.cargarStorage();
   }

   estaLogueado() {
     return (this.token.length > 5) ? true : false;
   }

   cargarStorage() {
     if(localStorage.getItem('toekn')){
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
     } else {
       this.token = '';
       this.usuario = null;
     }
   }

   guadarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
   }

   logout() {
     this.usuario = null;
     this.token = '';
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     this.router.navigate(['/login']);
   }

   loginGoogle(token: string) {
     return this.http.post(`${this.url}/login/google`, {token} )
                  .pipe( 
                    map( (resp: any) => {
                      this.guadarStorage(resp.id, resp.token, resp.usuario);
                      return true;
                    })
                    )
   }

   login( usuario: Usuario, recordar: boolean = false) {

      if(recordar) {
        localStorage.setItem('email', usuario.email);
      }else {
        localStorage.removeItem('email');
      }

      return this.http.post(`${this.url}/login`, usuario)
        .pipe
        (
          map( (resp: any) => {
            this.guadarStorage(resp.id, resp.token, resp.usuario);
            // localStorage.setItem('id', resp.id);
            // localStorage.setItem('token', resp.token);
            // localStorage.setItem('usuario', JSON.stringify(resp.usuario));

            return true;
          })
        );
   }





   crearUsuario(usuario: Usuario): Observable<any> {
      return this.http.post(`${this.url}/usuario`, usuario)
        .pipe(
          map( (resp: any) => {

            Swal.fire({
              title: 'Importante!',
              text: 'Para registrarte debes acepatar los Terminos ',
              icon: 'warning',
              confirmButtonText: 'Cool'
            });

            return resp.usuario;
          })
        );
   }
}
