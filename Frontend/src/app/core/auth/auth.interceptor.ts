import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();
    console.log('Auth Token:', token);
    
    if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    console.log('HTTP Request:', req);

    return next(req);
};
