import { Component, OnInit } from '@angular/core';
import { Page } from '../page-detail/page';
import { PageService } from '../page-detail/page.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  pages: Page[] = [];

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.getPages();
  }

  getPages(): void {
    this.pageService.getPages()
      .subscribe(pages => this.pages = pages.slice(1, 5));
  }
}
