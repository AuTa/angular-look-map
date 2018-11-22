import { TestBed } from '@angular/core/testing';

import { PagePopupService } from './page-popup.service';

describe('PagePopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagePopupService = TestBed.get(PagePopupService);
    expect(service).toBeTruthy();
  });
});
