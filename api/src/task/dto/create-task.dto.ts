import { TaskStatus } from "../schemas/task.schema"

export class CreateTaskDto {
    title: string
    description: string
    status: TaskStatus
}
