import { Task } from './../models/task';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl="http://127.0.0.1:8000/api/tasks";
  protected token;
  private httpOption;
  constructor(private http:HttpClient) {
    this.token=sessionStorage.getItem('api_token');

    this.httpOption={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':"Bearer "+this.token
      })
    }

   }
   findAll(){
     return this.http.get<Task[]>(this.apiUrl,this.httpOption);
   }
   delete(id){
     return this.http.delete(`${this.apiUrl}/${id}`,this.httpOption);
   }
   persist(task){
     return this.http.post<Task>(this.apiUrl,task,this.httpOption);
   }
   update(task){
    return this.http.put(`${this.apiUrl}/${task.id}`,task,this.httpOption);
  }
   completed(id,completed){
     return this.http.patch(`${this.apiUrl}/${id}`,{completed:!completed},this.httpOption);
   }
}
