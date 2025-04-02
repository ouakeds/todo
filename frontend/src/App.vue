<script setup lang="ts">
    import { onBeforeMount, ref } from 'vue'
    import TaskForm from './components/TaskForm.vue'
    import TaskTable from './components/TaskTable.vue'
    import { TaskStatus, type Task } from './composable/task'
    import useTask from './composable/task'


    const { tasks, sendCreateTaskRequest, sendDeleteTaskRequest, sendEditTaskRequest, fetchTasks} = useTask()

    const isTaskFormOpen = ref<boolean>(false)
    const isTaskFormOnEditMode = ref<boolean>(false)
    const initialTaskForm = {
        title: '',
        description: '',
        status: TaskStatus.NEW
    }
    const taskForm = ref<Task>({ ...initialTaskForm })

    function handleCloseTaskForm() {
        isTaskFormOpen.value = false
    }
    
    function handleDeleteTask(task: Task) {
        sendDeleteTaskRequest(task)
    }

    function handleEditTask(task: Task) {
        isTaskFormOpen.value = true
        taskForm.value = { ...task }
        isTaskFormOnEditMode.value = true
    }

    function handleNewTask() {
        isTaskFormOpen.value = true
        taskForm.value = { ...initialTaskForm }
        isTaskFormOnEditMode.value = false
    }

    function handleSubmitForm(task: Task) {
        if (isTaskFormOnEditMode.value) {
            sendEditTaskRequest(task)
        } else {
            sendCreateTaskRequest(task)
        }

        isTaskFormOpen.value = false
    }

    onBeforeMount(() => {
        fetchTasks()
    })
</script>

<template>
  <div class="h-screen w-screen bg-gray-800">

    <div class="w-full px-12 py-6 flex items-center justify-between bg-gray-800">
        <h1 class="text-2xl font-extrabold text-white">TODO</h1>
        <button @click="handleNewTask" class="font-semibold px-6 py-2.5 text-lg text-white bg-blue-500 border rounded-md cursor-pointer">
            New Task
        </button>
    </div>

    <div class="h-full w-full overflow-y-auto absolute px-12">
        <TaskTable
            :tasks="tasks"
            @on-delete-task="(task) => handleDeleteTask(task)"
            @on-edit-task="(task) => handleEditTask(task)"
        />
    </div>
  </div>

  <TaskForm
    v-if="isTaskFormOpen"
    :task="taskForm"
    :is-on-edit="isTaskFormOnEditMode"
    @on-close="handleCloseTaskForm"
    @on-submit="(task) => handleSubmitForm(task)"
  />

</template>
