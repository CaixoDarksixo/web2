import { Routes } from '@angular/router';
import { Access } from './access/access';
import { Login } from './login/login';
import { Registration } from './registration/registration';

export default [
    { path: 'access', component: Access },
    { path: 'login', component: Login },
    { path: 'registration', component: Registration }
] as Routes;
