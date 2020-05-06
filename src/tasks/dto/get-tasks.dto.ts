import { TaskStatus } from '../task.model';

export class GetTasksDTO {
  status: TaskStatus;
  search: string;
}
