import { TestBed } from '@angular/core/testing';

import { ServerSideService } from './server-side.service';

describe('ServerSideService', () => {
  let service: ServerSideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerSideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
