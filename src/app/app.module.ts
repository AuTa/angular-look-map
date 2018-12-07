import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake.backend.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AlertComponent } from './_components/alert.component';
import { RegionListComponent } from './region-list/region-list.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { PagePopupComponent } from './page-popup/page-popup.component';
import { createCustomElement } from '@angular/elements';
import { PageMarkerDirective } from './page-marker/page-marker.directive';
import { PageContentComponent } from './page-content/page-content.component';
import { AutoGrowTextAreaDirective } from './_directive/auto-grow-text-area.directive';
import { LatLngMarkerDirective } from './_directive/lat-lng-marker.directive';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    PageDetailComponent,
    MessagesComponent,
    AlertComponent,
    RegionListComponent,
    LeafletMapComponent,
    PagePopupComponent,
    PageMarkerDirective,
    PageContentComponent,
    AutoGrowTextAreaDirective,
    LatLngMarkerDirective,
    SideBarComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    LeafletModule.forRoot(),
  ],
  providers: [
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [PagePopupComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(PagePopupComponent, { injector: this.injector });
    // Register the custom element with the browser.
    customElements.define('page-popup-element', PopupElement);
  }
}
