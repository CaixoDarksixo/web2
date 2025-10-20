import { Routes } from '@angular/router';
import { Access } from './access/access';
import { Login } from './login/login';
import { Error } from './error/error';
import { Registration } from './registration/registration';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'registration', component: Registration }
] as Routes;
