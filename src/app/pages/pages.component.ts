import { Component, OnInit } from '@angular/core';
import { Page } from '../page-detail/page';
import { PageService } from '../page-detail/page.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private pageService: PageService) { }

  pages: Observable<Page[]>;

  ngOnInit() {
    this.getPages();
  }

  getPages(): void {
    this.pages = this.pageService.pages;
    this.pageService.getPages();
  }

}
