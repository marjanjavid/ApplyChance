import { TestBed } from '@angular/core/testing';

import { HttpInseptorService } from './http-inseptor.service';

describe('HttpInseptorService', () => {
  let service: HttpInseptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInseptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
