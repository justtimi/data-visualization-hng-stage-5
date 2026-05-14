<script setup lang="ts">
import ActivityTable from '@/components/ActivityTable.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import { onMounted } from 'vue';
import { useEngine } from '@/core/engineInstance';

const engine = useEngine()

onMounted(() => {
  engine.start()
})

</script>

<template>
  <AppSidebar/>
  <section class="bg-[#111113] border border-[#232526] rounded-lg p-4 shadow-xl">
        <ActivityTable />
      </section>
</template>
