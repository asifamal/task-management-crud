import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  createTask(task:{title: string, description: string, status: string}){
    return this.http.post('https://asif-e1e70-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json', task)
  }

}
