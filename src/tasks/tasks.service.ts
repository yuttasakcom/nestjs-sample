import { Injectable, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksDTO } from './dto/get-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  get(): Task[] {
    return this.tasks;
  }

  filter(filterDto: GetTasksDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.get();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  delete(id: string): string {
    const indexOfTask = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(indexOfTask, 1);
    return 'OK';
  }

  update(id: string, status: TaskStatus): Task {
    const task = this.tasks.find(task => task.id === id);
    task.status = status;
    return task;
  }

  create(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
