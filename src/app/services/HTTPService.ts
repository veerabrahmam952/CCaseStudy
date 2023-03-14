import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  private API_URL = '';
  private headers = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Content-Type': 'application/json',
      Accept: '*/*',
    }),
  };
  public postData(url: string, body: any) {
    return this.http.post(this.API_URL + url, body, this.headers);
  }

  public putData(url: string, body: any) {
    return this.http.put(this.API_URL + url, body, this.headers);
  }

  public deleteData(url: string, body: any) {
    return this.http.delete(url, { body });
  }

  public getData<T>(url: string) {
    return this.http.get<T>(this.API_URL + url, this.headers);
  }
}
