import { Component, OnInit } from '@angular/core';
import { Page } from '../page-detail/page';
import { PageService } from '../_services/page.service';
import { Observable } from 'rxjs';
import { RegionListComponent } from '../region-list/region-list.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private pageService: PageService) { }

  pages$: Observable<Page[]>;
  pages: Page[];
  selectedPage: Page;

  ngOnInit() {
    this.getPages();
    this.pages$.subscribe(pages => {
      this.pages = pages;
      if (this.selectedPage && pages.indexOf(this.selectedPage) === -1) {
        this.selectedPage = null;
      }
    });
  }

  getPages(): void {
    this.pages$ = this.pageService.showPages;
    this.pageService.getPages();
  }

  onSelect(page: Page): void {
    this.selectedPage = page;
  }

}
