import { Component, OnInit } from '@angular/core';
import { Page } from '../page-detail/page';
import { PageService } from '../page-detail/page.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private pageService: PageService) { }

  pages: Page[];

  ngOnInit() {
    this.getPages();
  }

  getPages(): void {
    this.pageService.getPages().subscribe(pages => this.pages = pages);
  }

}
