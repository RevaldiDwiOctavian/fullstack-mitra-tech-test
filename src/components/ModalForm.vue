<!-- File: components/Modal.vue -->
<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue'

const props = defineProps({
  isVisible: Boolean,
  isEdit: Boolean,
  initialData: Object,
});

const emit = defineEmits(['close', 'submit']);

const name = ref('');
const description = ref('');

watch(() => props.initialData, (newData) => {
  if (props.isEdit && newData) {
    name.value = newData.name || '';
    description.value = newData.description || '';
  }
}, { immediate: true });

const closeModal = () => {
  emit('close');
};

watch(() => props.initialData, (newData) => {
  if (!props.isEdit && newData) {
    name.value = newData.name || '';
    description.value = newData.description || '';
  }
}, { immediate: true });

const submitForm = () => {
  emit('submit', { name: name.value, description: description.value });
  closeModal();
};
</script>

<template>
  <div v-if="props.isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-xl font-bold mb-4">Add Task</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="description"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            rows="3"
            required
          ></textarea>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {{ props.isEdit ? 'Update' : 'Submit' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>
