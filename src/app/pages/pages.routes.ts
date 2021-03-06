import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuarioService } from '../services/usuario/usuario.service';
import { UsuariosComponent } from './usuarios/usuarios.component';

const pagesRoutes: Routes = [
    {   path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
            {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
            {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
            {path: 'account-settings', component: AccountsSettingsComponent, data: {titulo: 'Account-Settings'}},
            {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil'}},
            {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJS'}},

            // Mantenimientos
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'}},



            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);