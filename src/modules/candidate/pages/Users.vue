<template>
      <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md font-sans">

    <h1 class="text-3xl font-semibold text-gray-700 mb-2">Total Number of Users</h1>
    <ul>
        <li v-for="user in users" :key="user.id"> <span class="font-bold ">{{ user.name }}</span><br> <span class="text-gray-500">{{ user.email  }}</span> </li>
        </ul>


      </div>

</template>

<script setup >  
import { ref, reactive, computed } from 'vue';
import axios from 'axios';
const users = ref([
    
])
axios.get('https://jsonplaceholder.typicode.com/users')
.then(response => {
    users.value = response.data;
})
.catch(error => {
    console.error(error);
});


</script>