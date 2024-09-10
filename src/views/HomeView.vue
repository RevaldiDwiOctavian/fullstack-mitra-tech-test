<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from '@/components/DataTable.vue'
import * as service from '@/util/ServiceApi'
import ModalForm from '@/components/ModalForm.vue'

const tableData = ref([]);
const tableHeaders = ref();
const currentTask = ref({ id: null, name: '', description: '' });

const fetchTasks = async () => {
  try {
    tableData.value = await service.getTasks();

    if (tableData.value.length > 0) {
      tableHeaders.value = Object.keys(tableData.value[0]);
    } else {
      tableHeaders.value = [];
    }
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
  }
};
const isModalVisible = ref(false);
const isModalEdit = ref(false);

const formData = ref({ name: '', description: '' });

const closeModal = () => {
  isModalVisible.value = false;
};

const handleSubmit = (data) => {
  console.log(isModalEdit.value);
  formData.value = data;
  if (!isModalEdit.value) {
    service.createTasks(data).then(() => fetchTasks());
  } else {
    service.updateTasks(currentTask.value.id, data).then(() => fetchTasks());
  }
  closeModal();
};
function handleDelete(item) {
  service.deleteTasks(item.id).then(() =>  fetchTasks());

}

const openAddModal = () => {
  isModalEdit.value = false;
  currentTask.value = { name: '', description: '' };
  isModalVisible.value = true;
};

const openEditModal = (task) => {
  isModalEdit.value = true;
  currentTask.value = { ...task };
  isModalVisible.value = true;
};


onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-4">Table Data</h1>
    <button @click="openAddModal" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
      Add Task
    </button>

    <!-- Tampilkan modal -->
    <ModalForm
      :isVisible="isModalVisible"
      @close="closeModal"
      @submit="handleSubmit"
      :isEdit="isModalEdit"
      :initial-data="currentTask"
    />
    <DataTable :headers="tableHeaders" :data="tableData" @update-item="openEditModal"
               @delete-item="handleDelete" />
  </main>
</template>
