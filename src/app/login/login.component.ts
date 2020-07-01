import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
declare function init_plugins();
declare const gapi: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor(public router: Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      console.log('entro');
      this.recuerdame = true;
    }
    console.log(this.email);
    init_plugins();
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '971865542537-pj7f31rcdq4825a2gttnct9pb2p9fjvu.apps.googleusercontent.com',
        coockiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSingin(document.getElementById('btnGoogle'))

    });
  }

  attachSingin(element) {
    this.auth2.attachClickHandler(element, {},  (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
        .subscribe( () => {
          window.location.href = '#/dashboard';
        });


      console.log(token);
    });
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe(resp => this.router.navigateByUrl('/dashboard'));


    /* this.router.navigate(['/dashboard']); */
  }

}
