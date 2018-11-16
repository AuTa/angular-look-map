import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageDetailComponent } from './page-detail/page-detail.component';

const routes: Routes = [
  { path: 'pages', component: PagesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'page/:uuid', component: PageDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
