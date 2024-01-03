import { TestBed } from '@angular/core/testing';

import { UsesService } from './uses.service';

describe('UsesService', () => {
  let service: UsesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
