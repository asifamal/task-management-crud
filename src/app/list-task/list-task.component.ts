import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Tasks } from '../models/tasks.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit {
  tasksFromService: Tasks[] = []

  constructor(private tasks: TasksService, private router: Router) { }

  ngOnInit(): void {
    this.tasks.getTask().subscribe((tasks) => {
      console.log(tasks)
      this.tasksFromService = tasks
    })
  }

  onUpdateClick(id?:string){
    let currentTask = this.tasksFromService.find((t) => {
      return t.id === id;
    })
    this.tasks.currentTask = currentTask
    this.tasks.currentTaskID = id
    this.router.navigate(['edit', id])
  }

}
