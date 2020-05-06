import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksDTO } from './dto/get-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  get(@Query() filterDto: GetTasksDTO): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.filter(filterDto);
    }

    return this.tasksService.get();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Task {
    return this.tasksService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.create(createTaskDTO);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): string {
    return this.tasksService.delete(id);
  }

  @Patch('/:id/status')
  update(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
    return this.tasksService.update(id, status);
  }
}
