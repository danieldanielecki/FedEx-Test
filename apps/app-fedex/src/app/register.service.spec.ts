import { TestBed } from '@angular/core/testing';
import { RegisterService } from './register.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

// TODO: Unit test subscribe if it'll stay.
describe('RegisterService', () => {
  let registerService: any;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    registerService = TestBed.inject(RegisterService);
  });

  it('should created register service', () => {
    expect(registerService).toBeTruthy();
  });

  it('should fake call HTTP POST request to https://demo-api.now.sh/users', () => {
    const fakeDataToBeSend = {
      firstName: 'Daniel',
      lastName: 'Danielecki',
      email: 'daniel.danielecki@foo.com'
    };

    registerService.registerUser(fakeDataToBeSend);

    httpMock.expectOne({
      url: 'https://demo-api.now.sh/users',
      method: 'POST'
    });
  });
});
