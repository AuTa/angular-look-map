import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { PageDetailComponent } from './page-detail/page-detail.component';

const routes: Routes = [
  { path: 'pages', component: PagesComponent },
  { path: 'page/:uuid', component: PageDetailComponent },
  { path: '', redirectTo: '/pages', pathMatch: 'full' },
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
