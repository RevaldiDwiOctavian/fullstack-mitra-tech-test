import { Component, Input } from '@angular/core';
import {NgForOf} from "@angular/common";
import axios from "axios";

export interface Task {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() dataSource: Task[] = [];
  private apiUrl = 'http://localhost:8000/api';

  async getTasks(): Promise<Task[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }


  onUpdate(task: Task): void {
    console.log('Update:', task);
    // Implement update logic here
  }

  async onDelete(task: Task): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}/tasks/${task.id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
    // Implement delete logic here
  }
}
