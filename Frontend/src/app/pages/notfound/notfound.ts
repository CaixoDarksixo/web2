import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '@/shared/components/app.floatingconfigurator';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterModule, AppFloatingConfigurator, ButtonModule],
    templateUrl: './notfound.html'
              
})
export class Notfound {}
