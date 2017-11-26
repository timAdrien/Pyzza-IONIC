
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
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpdGkiLCJpYXQiOjE1MTE2Mjk5OTh9.6dN6SBYEmzjziZ5af8lR_6vAKB4W2QeqDFHyqv1RfVI`,
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
    return this.headers;
  }
}
