import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private route:Router){

  }
  canActivate():boolean{
    if(sessionStorage.getItem('api_token')==null){
        this.route.navigate(['login']);
        return false;
    }else{
      return true;
    }
  }
  
}
