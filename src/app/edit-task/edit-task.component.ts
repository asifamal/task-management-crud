import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tasks } from '../models/tasks.models';
import { TasksService } from '../services/tasks.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {
  constructor(private form: FormBuilder, private tasks: TasksService, private route: Router){}

  taskForm!: FormGroup
  taskID! : any
  taskArray: Tasks[] = []
  

  ngOnInit(): void {
    this.taskForm = this.form.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status:['pending', Validators.required]
    })
    this.taskForm.patchValue({
      title: this.tasks.currentTask.title,
      description: this.tasks.currentTask.description,
      status: this.tasks.currentTask.status
    })
  }

  onUpdateTask(taskDataNew: {title:string,description:string,status:string}){
    if(this.taskForm.valid){
      this.tasks.updateTask(this.tasks.currentTaskID,taskDataNew).subscribe((res) => {
        this.route.navigate(['/home'])
      })
    }else{
      Swal.fire("Please Fill In All The Fields");
    }
  }

}
