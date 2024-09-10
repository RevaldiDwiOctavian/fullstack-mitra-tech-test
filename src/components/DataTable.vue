<script setup lang="ts">
import { PropType } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps({
  headers: Array as PropType<string[]>,
  data: Array as PropType<Record<string, any>[]>
});
defineEmits(['update-item', 'delete-item'])
</script>

<template>
  <div v-if="data.length === 0">
    <h1>No Data</h1>
  </div>
  <div v-else>
    <table class="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
      <tr class="bg-gray-100">
        <th v-for="header in headers" :key="header" class="border border-gray-300 px-4 py-2">
          {{ header }}
        </th>
        <th class="border border-gray-300 px-4 py-2">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in data" :key="index" class="hover:bg-gray-50">
        <td v-for="header in headers" :key="header" class="border border-gray-300 px-4 py-2">
          {{ item[header] }}
        </td>
        <td class="border border-gray-300 px-4 py-2 flex space-x-2 justify-center">
          <button @click="$emit('update-item', item)" class="text-blue-600 hover:text-blue-800">
            <font-awesome-icon icon="pen" />
          </button>
          <button @click="$emit('delete-item', item)" class="text-red-600 hover:text-red-800">
            <font-awesome-icon icon="trash" />
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
