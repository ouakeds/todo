<script setup lang="ts">
    import { computed } from 'vue';
    import { TaskStatus, type Task } from '../composable/task';

    interface TaskProps {
        task: Task,
        isOnEdit: boolean
    }

    const props = defineProps<TaskProps>()
    const emit = defineEmits(['onSubmit', 'onClose'])


    function handleClosetask() {
        emit('onClose')
    }
    
    function handleSubmitForm() {
        emit('onSubmit', props.task)
    }

    const formTitle = computed(() => {
        return props.isOnEdit ? 'New task' : 'Task update'
    })
    
</script>

<template>
  <div id="task-form" class="w-screen h-screen bg-black/40 fixed top-0 right-0 z-50 ">
        <div class="flex w-full h-full items-center justify-center">
            <div class="w-full rounded-md max-w-2xl px-12 bg-gray-700 text-white">

                <div class="w-full py-6 flex justify-between items-center">
                    <h1 class="text-xl font-semibold">
                        {{ formTitle }}
                    </h1>

                    <button @click="handleClosetask" class="p-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="py-6">
                    <form class="flex flex-col space-y-6" @submit="handleSubmitForm">
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-semibold text-white">
                                Title
                            </label>
                            <input
                                type="text"
                                v-model="task.title"
                                class="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Task 1"
                                :required="true"
                            >
                        </div>
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-semibold text-white">
                                Description
                            </label>
                            <input
                                type="text"
                                v-model="task.description"
                                class="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Create a task..."
                                :required="true"
                            >
                        </div>
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-semibold text-white">
                                Status
                            </label>
                            <select v-model="task.status" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                                <option default :value="TaskStatus.NEW">
                                    {{ TaskStatus.NEW }}
                                </option>
                                <option :value="TaskStatus.WIP">
                                    {{ TaskStatus.WIP }}
                                </option>
                                <option :value="TaskStatus.FINISHED">
                                    {{ TaskStatus.FINISHED }}
                                </option>
                            </select>
                        </div>

                        <button class="w-full bg-blue-500 text-white font-semibold px-12 py-3.5 rounded-md mt-6">
                            Save
                        </button>
                    </form>

                </div>
            </div>
        </div>
    </div> 
</template>
