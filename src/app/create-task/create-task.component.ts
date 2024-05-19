import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { Router } from '@angular/router';;

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent{ 

  constructor(private tasks: TasksService, private form: FormBuilder, private router: Router) {}

  taskForm!: FormGroup

  ngOnInit(): void {
    this.taskForm = this.form.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status:['pending', Validators.required]
    })
  }

  onCreateTask(data: { title: string; description: string; status: string }) {
    if (this.taskForm.valid) {
      this.tasks.createTask(data)
    }
    this.router.navigate(['home'])
  }

}
