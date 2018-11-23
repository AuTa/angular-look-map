import { TestBed } from '@angular/core/testing';

import { PageMarkerService } from './page-marker.service';

describe('PageMarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageMarkerService = TestBed.get(PageMarkerService);
    expect(service).toBeTruthy();
  });
});
