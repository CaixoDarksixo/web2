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
template: `
<div class="bg-surface-0 dark:bg-surface-900">
    <transition-overlay />
    <div id="home" class="landing-wrapper overflow-hidden">
        <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static" />
        <hero-widget id="hero" />
        <features-widget id="features" />
        <contact-widget id="contact" />
    </div>
</div>
    `
})
export class Landing {}

