import { Component, OnInit, Input } from '@angular/core';
import { Region, ALL_REGION, REGIONS, OTHER_REGION } from './region';
import { Page } from '../page-detail/page';
import { PageService } from '../page-detail/page.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {
  allRegion: Region = Object.assign({}, ALL_REGION);
  regions: Region[] = REGIONS.map(a => Object.assign({}, a));
  otherRegion: Region = Object.assign({}, OTHER_REGION);
  otherRegionTags: string[] = [];
  selectedRegionTags: string[] = [];
  selectedRegion: Region = this.allRegion;

  constructor(
    private pageService: PageService) { }

  ngOnInit() {
    this.pageService.pages.subscribe(pages => {
      this.clearCount();
      pages.forEach(page => {
        const findedRegion = this.regions.find(region => region.tag === page.information.protag);
        if (findedRegion) {
          findedRegion.count += 1;
        } else {
          this.otherRegion.count += 1;
          this.otherRegionTags.push(page.information.protag);
        }
        this.allRegion.count += 1;
      });
      this.setShowPages();
    });
  }

  get showRegions() {
    const regions: Region[] = [this.allRegion].concat(this.regions.filter(region => region.count));
    if (this.otherRegion.count) {
      regions.push(this.otherRegion);
    }
    return regions;
  }

  clearCount() {
    this.allRegion.count = 0;
    this.otherRegion.count = 0;
    this.regions.map(region => region.count = 0);
  }

  setShowPages() {
    this.pageService.setShowQuery('information.protag', this.selectedRegionTags);
  }

  onSelect(region: Region): void {
    this.selectedRegion = region;
    if (region === this.allRegion) {
      this.selectedRegionTags = [];
    } else if (region === this.otherRegion) {
      this.selectedRegionTags = this.otherRegionTags;
    } else {
      this.selectedRegionTags = [region.tag];
    }
    this.setShowPages();
  }
}
