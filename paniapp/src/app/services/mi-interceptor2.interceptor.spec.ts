import { TestBed } from '@angular/core/testing';

import { MiInterceptor2Interceptor } from './mi-interceptor2.interceptor';

describe('MiInterceptor2Interceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MiInterceptor2Interceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MiInterceptor2Interceptor = TestBed.inject(MiInterceptor2Interceptor);
    expect(interceptor).toBeTruthy();
  });
});
