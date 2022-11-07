import { TestBed } from '@angular/core/testing';

import { MiInterceptorInterceptor } from './mi-interceptor.interceptor';

describe('MiInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MiInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MiInterceptorInterceptor = TestBed.inject(MiInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
