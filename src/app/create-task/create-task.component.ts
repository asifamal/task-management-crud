import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { Router } from '@angular/router';import Swal from 'sweetalert2';
;

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit{ 

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
      this.tasks.createTask(data).subscribe((res)=> {
        this.router.navigate(['home'])
      })
    }else{
      Swal.fire("Please Fill In All The Fields");
    }
    
  }

  goHome(){
    this.router.navigate(['home'])
  }

}
