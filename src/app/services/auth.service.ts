import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="http://127.0.0.1:8000/api/login";
  constructor(private http:HttpClient) { }
  login(email,password){
   
    return this.http.post(this.apiUrl,{
      "email":email,"password":"password"
    });
  }
}
