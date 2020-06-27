import { Task } from './../../models/task';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:Task[]=[];
  resultTest:Task[]=[];
  myTask:Task={
    label:'',
    completed:false
  };
  editForm:boolean=false;
  showForm:boolean=false;
  searchText=''

  constructor(private taskservice:TaskService) { }

  ngOnInit() {
    this.getTasks();
  }
  getTasks(){
    this.taskservice.findAll().subscribe(
      tasks=>{
        this.resultTest=this.tasks=tasks;
      }
    )
  }
  deleteTask(id){
    
    this.taskservice.delete(id).subscribe(
      ()=>{
        this.resultTest=this.tasks=this.tasks.filter(task=> task.id != id);
      }
    )
  }
  save(){
    this.taskservice.persist(this.myTask).subscribe(
      (task)=>{
        
        this.resultTest=this.tasks=[task,...this.tasks];
     this.resetTask();
     this.showForm=false;
      }
    );
  }
  togglecompleted(task){
    
    this.taskservice.completed(task.id,task.completed)
    .subscribe(()=>{
      task.completed= !task.completed;
    });
  }
  edit(task){
    this.myTask=task
    this.editForm=true
    this.showForm=true;

  }
  updateTask(){
    this.taskservice.update(this.myTask).subscribe(
      ()=>{
        this.resetTask();
        this.editForm=false;
      // this.tasks=[this.myTask,...this.tasks];
        this.showForm=false;

      }
    );
  }
  searchTasks(){
    this.resultTest=this.tasks.filter(task=>task.label.toLowerCase().includes(this.searchText.toLowerCase()))

  }
  resetTask(){
    this.myTask={
      label:'',
      completed:false
    };
  }
  
}
