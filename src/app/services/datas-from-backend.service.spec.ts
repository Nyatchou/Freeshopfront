import { TestBed } from '@angular/core/testing';

import { DatasFromBackendService } from './datas-from-backend.service';

describe('DatasFromBackendService', () => {
  let service: DatasFromBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasFromBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
