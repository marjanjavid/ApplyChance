import { TestBed, async } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('ModalService', () => {
  let service: ModalService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BsModalService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
