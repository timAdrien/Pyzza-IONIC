
import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as io from 'socket.io-client';

@Injectable()
export class AppConfig {

  private url = "https://pyzza-timadr.c9users.io";
  private socket;
  private headers;

  constructor (protected http: HttpClient) {
    this.socket = io(this.url);
  }

  setHeadersToken(token){
    this.headers = new HttpHeaders({
      //'Authorization': `Bearer ${<string>token}`,
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpdGkiLCJpYXQiOjE1MTEwOTgzMTZ9.Ch9t8cumg2KlFcbRtQ6jnBB-abE_OM1fjik5D197CkE`,
      'Content-Type': 'application/json'
    });
  }

  getSocket() {
    return this.socket;
  }

  getUrl() {
    return this.url;
  }

  getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpdGkiLCJpYXQiOjE1MTEwOTgzMTZ9.Ch9t8cumg2KlFcbRtQ6jnBB-abE_OM1fjik5D197CkE`,
      'Content-Type': 'application/json'
    });
  }
}
