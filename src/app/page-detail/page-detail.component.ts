import { Component, OnInit, Input } from '@angular/core';
import { Page } from './page';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PageService } from './page.service';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.css']
})
export class PageDetailComponent implements OnInit {

  @Input() page: Page;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private location: Location
  ) { }

  ngOnInit() {
    // this.getPage();
  }

  // getPage(): void {
  //   const uuid = this.route.snapshot.paramMap.get('uuid');
  //   this.pageService.getPage(uuid).subscribe(page => this.page = page);
  // }

  // goBack(): void {
  //   this.location.back();
  // }
  confirm(): void {
    this.pageService.updatePage(this.page);
  }

}
