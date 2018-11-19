import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake.backend.interceptor';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertComponent } from './_components/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    PageDetailComponent,
    MessagesComponent,
    DashboardComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
