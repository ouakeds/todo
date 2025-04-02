import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TaskDocument = HydratedDocument<Task>

export enum TaskStatus {
  NEW = 'NEW',
  WIP = 'WIP',
  FINISHED = 'FINISHED',
}

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string

  @Prop()
  description: string

  @Prop({ enum: TaskStatus, default: TaskStatus.NEW })
  status: TaskStatus
}

export const TaskSchema = SchemaFactory.createForClass(Task)
