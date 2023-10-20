<!-- @format -->

<template>
  <Component :is="homeComponent" :list="data" />
  <div
    v-if="resConfig['telegram-group']"
    v-show="showTelegram"
    class="pointer fixed z-10"
    :style="{bottom: `${isDesktop ? '50px' : '80px'} `, right: `${isDesktop && !chatStore.chatHide ? '300px' : '6px'}`}"
    @click="pageConfigClick(1, resConfig['telegram-group'])"
  >
    <BaseImg
      :class="{'w-[50px]': !isDesktop, 'w-[70px]': isDesktop}"
      :src="getResConfigImage('telegram', ImageKeyEnum.home)"
      alt="telegram group"
    />
  </div>
</template>
<script setup lang="ts">
  import HallLog from "~~/apis/debug/HallLog";
  const app = useNuxtApp() as any;
  const isDesktop = app.$device.isDesktop;
  const configStore = useSysConfigStore();
  const chatStore = useChatStore();
  const model = useAppModel().value;
  const homeComponent = defineAsyncComponent({
    loader: () => {
      //识别路径是否有文件夹，单纯的字符串文件路径不会识别编译到文件路径，会被识别为文件名
      if (isDesktop) {
        return import(`@/components/desktop/model/${model}/home.vue`);
      }
      return import(`@/components/mobile/model/${model}/home.vue`);
    },
    delay: 100,
    timeout: 10000,
    suspensible: false,
    onError: (err, retry, error, attempts) => {
      error();
      HallLog.error("err:", err, "retry", retry, "error", error, "attempts", attempts);
      HallLog.error("lazy component: home is load failed!");
    },
  });

  const data = computed(() => {
    let list = [];
    let from: any = configStore.pageConfig.index;
    for (let key in from) {
      if (key != "footer" && typeof from[key] == "object") {
        if (!from[key].hide) {
          from[key].key = key;
          list.push(from[key]);
        }
      }
    }
    const key = list.some((el: any) => Number(el.sort_pc)) && app.$device.isDesktop ? "sort_pc" : "sort";
    list.sort((a: any, b: any) => {
      return Number(a[key]) > Number(b[key]) ? 1 : -1;
    });
    return list;
  });

  const showTelegram = ref(false);
  onMounted(() => {
    HallLog.log("home onMounted");
    const pageScrollBox = document.getElementById("page-container");
    if (pageScrollBox) {
      HallLog.error("have pageScrollBox");
      showTelegram.value = false;
      pageScrollBox.addEventListener("scroll", (e) => {
        // HallLog.log('pageScrollBox scrollTop:' + pageScrollBox.scrollTop)
        if (pageScrollBox.scrollTop > 200) {
          showTelegram.value = true;
        } else {
          showTelegram.value = false;
        }
      });
    } else {
      showTelegram.value = true;
      HallLog.log("no pageScrollBox");
    }
  });
</script>
