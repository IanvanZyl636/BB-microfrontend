import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { endsWith } from './router.utils';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { HttpClientModule } from '@angular/common/http';
import { CardsSharedDataAccessModule } from '@backbase/cards-shared-data-access';
import { CARDS_MANAGEMENT_JOURNEY_CARDS_BASE_PATH } from '@backbase/cards-management-journey-ang';
import { CARDS_BASE_PATH } from '@backbase/data-ang/cards';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardsSharedDataAccessModule,  // TODO: check why we need to import this private module
    RouterModule.forRoot([
      {
        path: 'mfe1/a',
        // TODO: taking it out from the book of retail app, doesn't have to be lazy loaded if Angular component is exported
        loadChildren: () =>
          import('./card-management-journey-bundle.module').then(
            (m) => m.CardsManagementJourneyBundleModule
          ),
      },
      { matcher: endsWith('b'), component: BComponent },
    ]),
  ],
  declarations: [AComponent, BComponent, AppComponent],
  providers: [
    {
      provide: CARDS_MANAGEMENT_JOURNEY_CARDS_BASE_PATH,
      useExisting: CARDS_BASE_PATH,
    },
    {
      provide: CARDS_BASE_PATH,
      useValue: `${environment.apiRoot}/cards-presentation-service`,
    },
  ],
  bootstrap: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('mfe1-element', ce);

    // <mfe1-element></mfe1-element>
  }
}
