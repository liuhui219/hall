<!-- @format -->

<template>
  <div>
    <SkinHome />
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    pageIndex: PageIndexEnum.home,
  });
  const homeStore = useHomeStore();
  onActivated(homeStore.mounted);
  onBeforeRouteLeave(homeStore.unmounted);
</script>
