<!-- @format -->

<template>
  <div>
    <!-- <BasePageLoading :http="true" :show="gameStore.gameLoading" /> -->
    <LazyDesktopGame v-if="app.$device.isDesktop && show" />
    <LazyMobileGame v-else-if="show" />
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    pageIndex: PageIndexEnum.game,
  });
  const app = useNuxtApp();
  const gameStore = useGameStore();
  const show = ref(true);
  const gameReload = ref(gameStore.gameReload);

  watchEffect(() => {
    if (gameStore.gameReload != gameReload.value) {
      gameReload.value = gameStore.gameReload;
      show.value = false;
      setTimeout(() => {
        show.value = true;
      });
    }
  });

  onActivated(gameStore.mounted);
  onBeforeRouteLeave(gameStore.unmounted);
</script>
