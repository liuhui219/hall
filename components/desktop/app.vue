<!-- @format -->

<template>
  <nuxtLayout>
    <ClientOnly>
      <SkinHeader :class="paddingClass" />
      <SkinMenu />
      <div id="page-container-pc" class="page-container-pc flex flex-col pt-20 overflow-auto" :class="paddingClass">
        <NuxtPage />
      </div>
      <SkinChat />
      <BasePageLoading v-show="loading || userLoading" :http="true" />
      <!-- <DesktopPopupWallet v-if="homeStore.showOldWallet" class="pc-wallet" /> -->
    </ClientOnly>
  </nuxtLayout>
</template>
<script setup lang="ts">
  const loading = useHttpLoading(); //弹窗配置
  const userLoading = useUserLoading();
  const navigationStore = useNavigationStore();
  const homeStore = useHomeStore();
  const chatStore = useChatStore();
  const paddingClass = computed(() => {
    return {
      "pc-header-min": navigationStore.mobileNavShow,
      "pc-header-max": !navigationStore.mobileNavShow,
      "pc-header-min-chat": chatStore.chatHide,
      "pc-header-max-chat": !chatStore.chatHide,
    };
  });
  navigationStore.setMobileNavShow(true);
  chatStore.setMobileNavShow(true);
  const width = computed(() => {
    return navigationStore.mobileNavShow ? "320px" : "64px";
  });
</script>
<style lang="scss">
  #root-p {
    .sys-message {
      top: $pc-header-height;
      width: 600px;
      right: max(15px, calc((100% - 1300px - #{var(--current-menu-width)}) / 2));
      left: unset;
      max-width: 80%;
    }
  }
  @import "~~/assets/stylesheets/desktop/app.scss";
</style>
