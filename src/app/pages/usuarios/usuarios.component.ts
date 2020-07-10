import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  hola: string = 'dsd';
  roles = [
    {value: 'ADMIN_ROLE'},
    {value: 'USER_ROLE', code: 'code2'}
    ];

  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe( resp => {
      console.log(resp);
    });
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios(valor?: number) {
    console.log(valor);
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    if(desde >= this. totalRegistros){
      return;
    }
    if (desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
        .subscribe( (usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          this.cargando = false;
        });
  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);
    if(usuario._id === this._usuarioService.usuario._id){
      Swal.fire({
        icon: 'error',
        title: 'No se puede borrar a si mismo',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    Swal.fire({
      title: '¿Estas seguro ?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {

      if (result.value) {
        this._usuarioService.eliminarUsuario(usuario._id).subscribe(resp => {
          console.log(resp);
          Swal.fire(
            'Eliminado',
            'El usuario a sido eliminado correctamente.',
            'success'
          );
          this.desde = 0;
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    console.log(usuario);
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }
}
