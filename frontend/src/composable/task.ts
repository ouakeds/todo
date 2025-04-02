import { ref } from "vue"
import http from "../services/http"

export enum TaskStatus {
    NEW = 'NEW',
    WIP = 'WIP',
    FINISHED = 'FINISHED'
}

export interface Task {
    _id?: string,
    title: string,
    description: string,
    status: TaskStatus
}

const useTask = () => {
    const tasks =  ref<Task[]>([])

    const fetchTasks = () => {
        http.get<Task[]>('/tasks').then((response) => {
            tasks.value = response.data
        })
    }

    const sendEditTaskRequest = (task: Task) => {
        http.patch<Task>('/tasks/' + task._id, task).then((response) => {
            if (response.status === 200) {
                const editedTaskIndex = tasks.value.findIndex((editedTask) => editedTask._id === task._id)
                tasks.value[editedTaskIndex] = task
            }
        })
    }

    const sendDeleteTaskRequest = (task: Task) => {
        http.delete<Task>('/tasks/' + task._id).then((response) => {
            if (response.status === 200)
                tasks.value = tasks.value.filter(({_id}) => _id !== task._id)
        })
    }

    const sendCreateTaskRequest = (task: Task) => {
        http.post<Task>('/tasks', task).then((response) => {
            if (response.status === 201)
                tasks.value.push(response.data)
        })
    }
    
    
    return { tasks, sendEditTaskRequest, sendDeleteTaskRequest, sendCreateTaskRequest, fetchTasks }
}

export default useTask