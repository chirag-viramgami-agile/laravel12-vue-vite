<script setup >
import Topbar from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
</script>

<template>
  <div class="min-h-screen flex bg-slate-100 text-slate-800">
    <!-- Sidebar -->
    <Sidebar/>

    <!-- Main -->
    <div class="flex-1 flex flex-col">
      <!-- Topbar -->
       <Topbar/>

      <!-- Page content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
