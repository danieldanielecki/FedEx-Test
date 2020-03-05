import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  /**
   * @description Perform HTTP POST call to register user.
   * @function registerUser
   * @param {Object} dataToBeSend - data to be send to the API.
   * @returns {void}
   */
  public registerUser(dataToBeSend: Object): any {
    const baseURL = 'https://demo-api.now.sh/users';

    // Perform HTTP POST request, error handling is done by HTTP Interceptors.
    this.httpClient
      .post(baseURL, JSON.stringify(dataToBeSend))
      .subscribe(() => alert('Success'));
  }
}
