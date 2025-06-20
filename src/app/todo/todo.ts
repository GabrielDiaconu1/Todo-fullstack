import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/task';
import { remult } from 'remult';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TasksController } from '../../shared/TasksController';
@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
  standalone: true
})
export class Todo implements OnInit {
  newTaskTitle= '';
  async addTask(){
    try{
       await this.taskRepo.insert({
        title: this.newTaskTitle,
      })
    
      this.newTaskTitle = '';
    }catch(error:any){
      alert(error.message);
    }
  }
  async deleteTask(task:Task){
    try{
      await this.taskRepo.delete(task);
      
    }catch(error:any){
      alert(error.message);
    }
  }
  async saveTask(task: Task){
    try{
      await this.taskRepo.save(task);
    }catch(error:any){
      alert(error.message);
    }
  }
  tasks:Task[]=[];
  taskRepo = remult.repo(Task);
  unSub =()=>{};
  ngOnInit() {
    this.unSub = this.taskRepo
    .liveQuery({
      where:{
        completed: undefined
      }
    }).subscribe((info)=>(this.tasks=info.applyChanges(this.tasks)));
  }
  ngOnDestroy() {
    this.unSub();
  }
  async setAllCompleted(completed: boolean) {
    await TasksController.setAllCompleted(completed);
  }
}
