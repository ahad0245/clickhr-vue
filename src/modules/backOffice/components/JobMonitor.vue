<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-700 mb-3">Active Job Monitor - Sandbox User</h3>
    <table class="w-full text-sm text-left">
      <thead class="text-xs text-gray-500 border-b">
        <tr>
          <th class="py-2">Job</th>
          <th>Open</th>
          <th>Inactive</th>
          <th>Nominate</th>
          <th>Pipeline</th>
          <th>Applied</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b" v-for="(job, i) in jobs" :key="i">
          <td class="py-2 text-blue-600 hover:underline cursor-pointer">{{ job.name }}</td>
          <td><span class="text-red-600 font-semibold">{{ job.open }}</span></td>
          <td><span class="text-gray-500">{{ job.inactive }}</span></td>
          <td><span class="text-green-600">{{ job.nominate }}</span></td>
          <td><span class="text-blue-600">{{ job.pipeline }}</span></td>
          <td><span class="text-red-400">{{ job.applied }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const jobs = [
  { name: 'Oil clean up hand', open: 'HOT', inactive: '✖', nominate: '✔', pipeline: '✔', applied: '✖' },
  { name: 'Material handler', open: '✔', inactive: '✔', nominate: '✔', pipeline: '✔', applied: '✖' },
  { name: 'ER RN', open: 'HOT', inactive: '✖', nominate: '✖', pipeline: '✔', applied: '✔' },
];
</script>
