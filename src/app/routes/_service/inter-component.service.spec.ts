import { TestBed } from '@angular/core/testing';

import { InterComponentService } from './inter-component.service';

describe('InterComponentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterComponentService = TestBed.get(InterComponentService);
    expect(service).toBeTruthy();
  });
});
