<script setup lang="ts">
    import { computed, onBeforeMount, ref } from 'vue'
    import TaskForm from './components/TaskForm.vue'
    import { TaskStatus, type Task } from './composable/task'
    import useTask from './composable/task'
    import TaskCard from './components/TaskCard.vue'


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

    const newTasks = computed(() => {
        return tasks.value.filter(({status}) => status === TaskStatus.NEW)
    })

    const wipTasks = computed(() => {
        return tasks.value.filter(({status}) => status === TaskStatus.WIP)
    })

    const finishedTasks = computed(() => {
        return tasks.value.filter(({status}) => status === TaskStatus.FINISHED)
    })

    onBeforeMount(() => {
        fetchTasks()
    })
</script>

<template>
  <div class="h-screen w-screen bg-gray-800">

    <div class="h-[80px] w-full px-12 flex items-center justify-between bg-gray-800">
        <h1 class="text-2xl font-extrabold text-white">TODO</h1>
        <button @click="handleNewTask" class="font-semibold px-6 py-2.5 text-lg text-white bg-blue-700 rounded-md cursor-pointer">
            New Task
        </button>
    </div>

        <div class="w-full h-[calc(100vh-80px)] grid grid-cols-3 gap-12 overflow-auto px-12 py-6">
            <div class="h-full w-full bg-blue-500/20 py-3.5 px-6 rounded-md">
                <h1 class="ms-4 text-xl font-extrabold text-white">NEW</h1>

                <TaskCard
                    v-for="(task, index) in newTasks"
                    :task="task"
                    :key="index"
                    @on-delete-task="handleDeleteTask(task)"
                    @on-edit-task="handleEditTask(task)"
                />
            </div>
            <div class="h-full w-full bg-blue-500/20 py-3.5 px-6 rounded-md">
                <h1 class="ms-4 text-xl font-extrabold text-white">WIP</h1>

                <TaskCard
                    v-for="(task, index) in wipTasks"
                    :task="task"
                    :key="index"
                    @on-delete-task="handleDeleteTask(task)"
                    @on-edit-task="handleEditTask(task)"
                />
            </div>

            <div class="h-full w-full bg-blue-500/20 py-3.5 px-6 rounded-md">
                <h1 class="ms-4 text-xl font-extrabold text-white">FINISHED</h1>

                <TaskCard
                    v-for="(task, index) in finishedTasks"
                    :task="task"
                    :key="index"
                    @on-delete-task="handleDeleteTask(task)"
                    @on-edit-task="handleEditTask(task)"
                />
            </div>
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
