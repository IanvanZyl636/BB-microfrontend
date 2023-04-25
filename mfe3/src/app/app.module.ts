import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { RouterModule } from '@angular/router';
import { endsWith } from './router.utils';

import {
  ProductSummaryListWidgetComponent,
  ProductSummaryListWidgetModule,
} from '@backbase/retail-ang';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { WebSdkModule } from '@backbase/foundation-ang/web-sdk';
import {
  BackbaseCoreModule,
  TemplateRegistry,
} from '@backbase/foundation-ang/core';
import { ArrangementManagerConfiguration } from '@backbase/data-ang/arrangements';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ProductSummaryListWidgetModule,
    BackbaseCoreModule.forRoot({
      features: {
        THEME_V2: true,
      },
    }),
    WebSdkModule.forRoot({
      apiRoot: '/api',
    }),
    RouterModule.forRoot(
      [
        {
          matcher: endsWith('a'),
          component: ProductSummaryListWidgetComponent,
        },
        { matcher: endsWith('b'), component: BComponent },
      ],
      { relativeLinkResolution: 'legacy' }
    ),
  ],
  declarations: [AComponent, BComponent, AppComponent],
  providers: [
    TemplateRegistry,
    {
      provide: ArrangementManagerConfiguration,
      useFactory: () => {
        return new ArrangementManagerConfiguration({
          basePath: '/api/arrangement-manager',
        });
      },
    },
  ],
  bootstrap: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('mfe3-element', ce);
  }
}
