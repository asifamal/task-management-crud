import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Tasks } from '../models/tasks.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit {
  tasksFromService: Tasks[] = []

  constructor(private tasks: TasksService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.tasks.getTask().subscribe((tasks) => {
      console.log(tasks)
      this.tasksFromService = tasks
    })
  }

  onUpdateClick(id?: string) {
    let currentTask = this.tasksFromService.find((t) => {
      return t.id === id;
    })
    this.tasks.currentTask = currentTask
    this.tasks.currentTaskID = id
    this.router.navigate(['edit', id])
  }

  onDeleteClick(id: string | undefined) {
    if (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.tasks.deleteTask(id).subscribe((res) => {
            this.tasks.getTask().subscribe((tasks) => {
              console.log(tasks)
              this.tasksFromService = tasks;
              console.log(this.tasksFromService)
            })
          })
          Swal.fire(
            'Deleted!',
            'Your task has been deleted.',
            'success'
          )

          this.router.navigate(['/home'])
        }
      })
    }
  }


  onDeleteAll() {
    if (this.tasksFromService.length > 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete all!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.http.delete('https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json').subscribe(() => {
            this.tasks.getTask().subscribe((tasks) => {
              this.tasksFromService = tasks;
              Swal.fire(
                'Deleted!',
                'All tasks have been deleted.',
                'success'
              );
              this.router.navigate(['/home']);
            });
          });
        }
      });
    } else {
      Swal.fire('No tasks', 'There are no tasks to delete.', 'error');
    }
  }
}


