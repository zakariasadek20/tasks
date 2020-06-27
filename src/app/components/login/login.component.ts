import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string='';
  password:string='';
  constructor(private loginService:AuthService,private route:Router) { }

  ngOnInit() {
    console.log(sessionStorage.getItem('api_token'));
  }
  login(){
    this.loginService.login(this.email,this.password)
    .subscribe(auth=>{
      // console.log(auth['api_token']);
      sessionStorage.setItem('api_token',auth['api_token']);
      this.route.navigate(['tasks']);
    })

  }

}
