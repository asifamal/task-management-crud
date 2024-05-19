import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from '../models/tasks.models';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = "https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json"
  currentTask: any;
  currentTaskID:any

  constructor(private http: HttpClient) { }

  createTask(task: any) {
    return this.http.post(this.url, task).subscribe((res) => {
      console.log(res);
    })
  }

  getTask() {
    return this.http.get<{ [key: string]: Tasks }>(this.url)
      .pipe(
        map(res => {
          let tasks = [];
          for (let key in res) {
            if (res.hasOwnProperty(key)) {
              tasks.push({ ...res[key], id: key });
            }
          }
          return tasks;
        })
      );
  }

  updateTask(id:string, task:Tasks){
    return this.http.put('https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/'+id+'.json',task)
   }

}
