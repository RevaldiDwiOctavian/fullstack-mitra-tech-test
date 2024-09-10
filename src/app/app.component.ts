import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TableComponent} from "./table/table.component";
import axios from "axios";

export interface Task {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-client';
  dataSource: Task[] = [];
  private apiUrl = 'http://localhost:8000/api';

  ngOnInit(): void {
    this.loadTasks();
  }

  async getTasks(): Promise<Task[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  loadTasks(): void {
    this.getTasks().then(tasks => {
      this.dataSource = tasks;
    }).catch(error => {
      console.error('Error loading tasks:', error);
    });
  }
}
