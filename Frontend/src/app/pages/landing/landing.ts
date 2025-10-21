import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TopbarWidget } from './components/topbarwidget.component';
import { HeroWidget } from './components/herowidget';
import { FeaturesWidget } from './components/featureswidget';
import { ContactWidget } from './components/contactwidget';
import { ScrollDownArrowWidget } from './components/scrolldownarrow.widget';
import { TransitionOverlay } from './components/transition.overlay';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [
        RouterModule,
        TopbarWidget,
        HeroWidget,
        FeaturesWidget,
        ContactWidget,
        ScrollDownArrowWidget,
        TransitionOverlay,
        RippleModule,
        StyleClassModule,
        ButtonModule,
        DividerModule
    ],
template: './landing.html'
})
export class Landing {}

