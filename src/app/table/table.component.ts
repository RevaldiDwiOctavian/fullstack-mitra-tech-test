import { Component, Input } from '@angular/core';
import {NgForOf} from "@angular/common";

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

  onUpdate(task: Task): void {
    console.log('Update:', task);
    // Implement update logic here
  }

  onDelete(task: Task): void {
    console.log('Delete:', task);
    // Implement delete logic here
  }
}
