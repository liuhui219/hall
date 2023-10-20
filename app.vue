<!-- @format -->

<template>
  <BasePageLoading v-if="appLoadingStatus" />
  <ClientOnly>
    <div
      style="position: absolute; top: -999999px; opacity: 0; point-event: none; width: 0; height: 0; overflow: hidden"
    >
      <form action="javascript: void(0);">
        <input name="name" type="text" hidden />
        <input name="password" type="password" hidden />
      </form>
    </div>
    <BasePageLoading :http="true" :show="pageLoading" />
    <LazyDesktopApp v-if="device.isDesktop" />
    <LazyMobileApp v-else />
    <BaseApgSel
      v-if="
        !useUrlcApp().value &&
        useUrlWwwAfun().value &&
        configStore.pageConfig?.index?.footer &&
        !configStore.pageConfig?.index?.footer?.config?.icon_hide
      "
    />
    <!-- hash地址弹窗 -->
    <VueFinalModal
      v-if="usePopupExits().value"
      v-model="popup[0].show"
      classes="modal-container"
      :overlay-class="overlayer1Class"
      :transition="transition"
      content-transition="slide-up"
      :content-class="firstOverlayer"
      :z-index-base="2000"
      :z-index="device.isMobile ? popup[0].index || false : false"
      :class="[popup[0].class || '']"
      @closed="closePopupFromPage(0)"
    >
      <component :is="firstModalValue" v-if="firstModalValue" />
    </VueFinalModal>
    <VueFinalModal
      v-if="usePopupExits().value"
      v-model="popup[1].show"
      classes="modal-container"
      :transition="transition"
      :overlay-class="overlayer2Class"
      :content-class="secondOverlayer"
      :z-index-base="2100"
      @closed="closePopupFromPage(1)"
    >
      <component :is="secondModalValue" v-if="secondModalValue" />
    </VueFinalModal>
    <!-- 提示 -->
    <VueFinalModal
      v-model="dialog.show"
      content-class="dialog-content"
      classes="modal-container modal-dialog-container"
      class="w-full overflow-hidden"
      :z-index-base="2200"
      @closed="dialog.close()"
    >
      <div :class="modalContent" class="modal-dialog">
        <section class="modal-header relative">
          <h3
            class="section-title font-bold text-center flex items-center justify-center"
            :class="[device.isDesktop ? 'pt-[48px]' : 'mt-[32px]']"
          >
            <span class="color-text-white">{{ dialog.title }}</span>
          </h3>
          <button
            class="absolute w-[60px] z-[1] h-[60px] -right-[16px] top-0 bottom-0 margin-auto"
            @click="dialog.close()"
          >
            <BaseIcon name="close" class="text-lowlight text-[24px]" />
          </button>
        </section>
        <section class="w-full">
          <span
            v-if="dialog.text"
            class="shrink-0 inline-block"
            :class="{[`mt-[${device.isDesktop ? 30 : 24}px] `]: true}"
            >{{ dialog.text }}</span
          >
          <BaseImg v-if="dialog.img" class="mb-6 min-h-[200px] w-full min-w-[100%]" :src="dialog.img" alt="" />
          <div class="flex justify-center" :class="{[`mt-[${device.isDesktop ? 30 : 24}px] `]: true}">
            <button v-if="!!dialog.cancel_text" class="sys-btn mr-4 flex-1" @click="dialog.clickCancel()">
              {{ dialog.cancel_text }}
            </button>
            <button
              class="sys-btn btn-highlight flex-1"
              :class="{'w-full': !dialog.cancel_text}"
              @click="dialog.ok && dialog.clickOk()"
            >
              {{ dialog.ok_text }}
            </button>
          </div>
        </section>
      </div>
    </VueFinalModal>
    <!-- 公告 -->
    <VueFinalModal
      v-if="!useUrlcApp().value && appStore.hasNotice"
      v-model="appStore.notice.is_open"
      content-class="dialog-content"
      classes="modal-container modal-dialog-container"
      class="w-full overflow-hidden"
      :z-index-base="1200"
    >
      <div :class="modalContent" class="modal-dialog flex flex-col overflow-hidden !px-[0]">
        <section class="modal-header relative shrink-0 notice-header">
          <span>
            {{ $t("L1037") }}
          </span>
          <button
            class="absolute w-[40px] z-[1] h-[40px] flex flex-col justify-center items-center right-[10px] margin-auto"
            @click="appStore.changeNoticeOpen(false)"
          >
            <BaseIcon name="close" class="text-lowlight text-[24px]" />
          </button>
        </section>
        <section class="flex-1 mt-[16px] px-[16px] flex flex-col overflow-hidden">
          <BaseTab
            title-key="title"
            class="notice mb-[16px]"
            :is-system-data="true"
            :list="appStore.noticeContent"
            :active="appStore.notice.tabIndex"
            @change="appStore.changeNoticeByClick"
          />
          <swiper
            ref="noticeRef"
            class="w-full"
            :effect="'coverflow'"
            :initial-slide="appStore.notice.tabIndex"
            :autoplay="
              appStore.noticeContent.length > 1
                ? {
                    delay: 1000,
                    disableOnInteraction: false,
                  }
                : false
            "
            :loop="appStore.noticeContent.length > 1"
            @slide-change="appStore.changeNoticeAuto"
          >
            <swiper-slide v-for="(item, index) in appStore.noticeContent" :key="index">
              <div class="overflow-y-auto overflow-x-hidden notice-image-container">
                <span v-if="$pt(item.text1)" class="shrink-0 inline-block color-text mb-[8px]">{{
                  $pt(item.text1)
                }}</span>
                <div
                  class="w-full border-radius overflow-hidden notice-image"
                  :style="{backgroundImage: `url(${item.img})`}"
                  @click="appStore.clickNotice(item)"
                />
                <span v-if="$pt(item.text2)" class="shrink-0 inline-block color-text mt-[8px]">{{
                  $pt(item.text2)
                }}</span>
              </div>
            </swiper-slide>
          </swiper>
        </section>
      </div>
    </VueFinalModal>
    <div
      :class="{
        invisbile: configStore.errorMessageList.length == 0,
        '!z-[-1]': configStore.errorMessageList.length == 0,
      }"
      class="sys-message sys-message-top"
    >
      <TransitionGroup name="error-message">
        <BaseMessage
          v-for="msg in configStore.errorMessageList"
          :key="`message-${msg.id}`"
          :msg-id="msg.id"
          :icon="msg.icon"
          :msg="msg.msg"
          :type="msg.type || 'error'"
        />
      </TransitionGroup>
    </div>
    <div v-if="gameStore.tournamentObj.tournamentToken" class="app-tournament">
      <!-- Real mode-->
      <TournamentWidget :token="gameStore.tournamentObj.tournamentToken" :test-mode="false" />
      <!-- Test mode-->
      <!-- <TournamentWidget :test-mode="true" account-id="snl-qa" language="pt" /> -->
    </div>
    <div v-if="!useUrlcApp().value" class="app-third">
      <div id="third-login" class="third-login">
        <div
          class="telegram-node z-[1]"
          :style="{
            left: `${
              (sysConfig.oneAllConfig.socialList.indexOf(sysConfig.telegramConfig.oneAllSocial) -
                (sysConfig.oneAllConfig.socialList.length - 1) / 2) *
              76
            }px`,
          }"
        >
          <div id="telegram-login" class="telegram-login" />
        </div>

        <div id="oneall-login" class="oneall-login z-[0]" />
      </div>
    </div>
    <div v-show="false" v-if="noLoadImages.length || noLoadSoure.length">
      <!-- 预加载资源 -->
      <nuxt-img
        v-for="(item, index) in noLoadImages"
        :key="index"
        preload
        :src="`${resConfig['root-url']}${item}`"
        @load="updateLoadedMap(item)"
        @error="updateLoadedMap(item)"
      />
      <nuxt-img
        v-for="(item, index) in noLoadSoure"
        :key="index"
        preload
        :src="`${resConfig['root-url-source']}${item}`"
        @load="updateLoadedMap(item)"
        @error="updateLoadedMap(item)"
      />
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
  import TournamentWidget from "@codemodity/tournament-ui-widget-vue";
  import LoadingComonent from "~~/components/base/loading.vue";
  import ErrorComponent from "~~/components/mobile/app/error.vue";
  import HallLog from "./apis/debug/HallLog";
  import Helper from "./apis/tool/Helper";
  import StorageKey from "./apis/tool/StorageKey";
  import {mapFace} from "./apis/types";
  import {popupHeaderNavbarConfig} from "~~/composables/useConfig";
  import NativeEvent from "./apis/tool/NativeEvent";
  import Global from "./core/Global";

  // HallLog.log("app server start");
  const {public: runtimeData} = useRuntimeConfig();
  const app = useNuxtApp();
  const device = app.$device as mapFace;
  const transition = device.isDesktop
    ? null
    : {
        "enter-active-class": "transition duration-300 ease-in-out transform",
        "enter-from-class": "translate-x-full",
        "enter-to-class": "translate-x-0",
        "leave-active-class": "transition duration-300 ease-in-out transform",
        "leave-to-class": "translate-x-full",
        "leave-from-class": "translate-x-0",
      };
  const configStore = useSysConfigStore();
  const s_version = useServerVersion().value;
  const appLoadingStatus = ref(true);
  const pageLoading = usePageLoading();
  const appStore = useAppStore();
  const gameStore = useGameStore();
  const loadedMap: any = reactive({});
  const noLoadImages = computed(() => {
    return preResConfig?.filter((item: any) => !loadedMap[item]);
  });
  const noLoadSoure = computed(() => {
    return preSourceResConfig?.filter((item: any) => !loadedMap[item]);
  });
  const updateLoadedMap = (key: any) => {
    loadedMap[key] = true;
  };
  const {data: sysData} = useAsyncData("index", () =>
    $fetch("/api/front/getsysconfig", {
      body: {
        uid: 10001,
      },
      method: "post",
    })
  );
  HallLog.logObj("sysConfig", JSON.parse(JSON.stringify(sysData.value || {})));
  const {data: pageData} = useAsyncData("home", () =>
    $fetch("/api/front/getindex", {
      body: {
        uid: 10001,
      },
      method: "post",
    })
  );
  HallLog.logObj("pageConfig", JSON.parse(JSON.stringify(pageData.value || {})));
  const {data: allGameList} = useAsyncData("allgamelist", () =>
    $fetch("/api/gameface/gamedata/getgamelistfilter", {
      body: {
        uid: 10001,
        game_sum: "",
        gclass: -1,
        gplat: -1,
        page_size: 10000,
        page: 1,
      },
      method: "post",
    })
  );
  //初始化游戏用户数据 设置数据顺序影响流程不可随意更改
  configStore.setPageConfig(pageData.value); //设置新配置后台配置的数据
  Helper.assignObj(seoConfig, pageData?.value?.seoConfig);
  Helper.assignObj(resConfig, pageData?.value?.resConfig);
  const userStore = useUserStore();
  const modules = reactive([SwiperAutoplay, SwiperEffectCoverflow]);

  configStore.setData(sysData.value); //系统数据
  HallLog.logObj("sysConfig", sysConfig);
  HallLog.logObj("resConfig", resConfig);

  //充值提现的货币单位
  afSdkData["eventCurrency"] = useSysConfigStore().currency_abbr;

  const appId = useAppId().value;
  const appName = useAppName().value;
  if (resConfig[appName]) {
    Helper.assignObj(resConfig, resConfig[appName]);
  }
  if (resConfig[appId]) {
    Helper.assignObj(resConfig, resConfig[appId]);
  }
  const locFold = useRelease().value ? resConfig["loc-fold"] : "/res_" + runtimeData.app_skin; //不走nodejs的资源目录,定死/res

  if (!resConfig["root-fold"]) {
    resConfig["root-fold"] = appName;
  }
  resConfig["root-url"] = resConfig["root-address"] + resConfig["root-fold"] + "/";
  resConfig["root-url-source"] = resConfig["root-url"].replace(resConfig["root-format"], "");

  const resParam = new Date().toISOString();
  if (process.client) {
    let _resolve: any;
    window.web_promise = new Promise((resolve, rej) => {
      _resolve = resolve;
      setTimeout(() => {
        resolve("promise end");
      }, 3000);
    });
    window.web_abort = () => {
      _resolve({message: "promise aborted"});
    };
    configStore.setGameList(allGameList.value); //游戏数据
    useCasinoStore().initCasinoGplatMap(); //初始化娱乐城分类选择
  }
  if (process.server) {
    useReqVersion().value = "" + resParam;
    if (resConfig["facebook-domain-verification"]) {
      useHead({
        meta: [{name: "facebook-domain-verification", content: `${resConfig["facebook-domain-verification"]}`}],
      });
    }
    if (resConfig["google-site-verification"]) {
      useHead({
        meta: [{name: "google-site-verification", content: `${resConfig["google-site-verification"]}`}],
      });
    }
    useHead({
      meta: [
        {name: "server_version", content: `${s_version}`},
        {name: "client_version", content: `${sysConfig.client_version}`},
        {name: "source_version", content: `${resParam}`},
        {name: "appid", content: `${appId}`},
        {name: "appname", content: `${appName}`},
      ],
      link: [
        {
          rel: "shortcut icon",
          href: `${locFold}/icon/favicon.ico`,
        },
        {
          rel: "apple-touch-icon",
          href: `${locFold}/icon/favicon.png`,
        },
        {
          rel: "manifest",
          href: `${locFold}/manifest/manifest.webmanifest`,
        },
      ],
      script: [
        {
          children: `window.globalThis || (window.globalThis = window); window.globalObject || (window.globalObject = window);
						if (!Object.entries)
	   Object.entries = function( obj ){
	      var ownProps = Object.keys( obj ),
	         i = ownProps.length,
	         resArray = new Array(i);

	      while (i--)
	         resArray[i] = [ownProps[i], obj[ownProps[i]]];
	      return resArray;
	   };
	   if(!Object.fromEntries){
	   Object.fromEntries = function fromEntries (iterable) {
	  return [...iterable].reduce((obj, [key, val]) => {
	    obj[key] = val
	    return obj
	  }, {})
	}}`,
          // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
        },
        {
          // hid: "json-ld-reference-bla",
          children: `{"@context": "https://schema.org", "@type": "WebSite", "name": "${appName}", "url": "${resConfig["og-url"]}", "potentialAction": {"@type": "SearchAction","target": "{search_term_string}","query-input": "required name=search_term_string"}}`,
          type: "application/ld+json",
        },
        {
          id: "firstScript",
          children: `let img = document.createElement('img'); img.id='firstPaint'; img.style='position: fixed; width: 100%; height: 100%; top: 0; z-index: -1'; img.src = '${resConfig["root-res"]}common/lcp.jpg';document.body.appendChild(img);`,
          // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
          tagPosition: "bodyOpen",
        },
      ],
      noscript: [],
    });
  }

  useServerSeoMeta({
    twitterCard: "summary_large_image",
    ogType: "website",
    ogUrl: `${resConfig["og-url"]}`,
    ogImage: `${resConfig["root-url-source"]}preview/${resConfig["og-image"]}?${resParam}`,
  });
  if (resConfig["keywords"]) {
    useServerSeoMeta({
      keywords: resConfig["keywords"],
    });
  }
  if (!updateSeo("" + appId)) {
    updateSeo("app");
  }

  const useDevice = useDeviceConfig();
  const AppUrl = useUrlConfig(); //访问地址信息
  const ch = useUrlCh(); //获取渠道配置 /ch1565
  const channel = useUrlChannel();
  const useForceReg = useUrlForceReg();
  const urlParams = useUrlParams();
  if (process.client) {
    if (window.jsThirdBridge) {
      window.jsbridge = window.jsThirdBridge;
    }

    const userAgent = device.userAgent;
    useDevice.value.UA = userAgent;
    HallLog.log("userAgent :" + userAgent);
    useDevice.value.app = userAgent.match(/WebApp/i) != null;
    useDevice.value.webview = window.jsbridge || useDevice.value.app;
    if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) {
      //判断iPhone|iPad|iPod|iOS
      useDevice.value.mobile = true;
      useDevice.value.ios = true;
    } else if (/(Android)/i.test(userAgent)) {
      //判断Android
      useDevice.value.mobile = true;
      useDevice.value.android = true;
    } else {
      useDevice.value.pc = true;
    }

    //0-未知 1-PC 2-安卓app 3-ios APP 4-安卓web 5-ios Web
    let osType = 0;
    if (isWebView()) {
      //原生端
      if (isAndroid()) {
        osType = 2;
      } else if (isIos()) {
        osType = 3;
      }
    } else {
      //web端
      if (isAndroid()) {
        osType = 4;
      } else if (isIos()) {
        osType = 5;
      } else if (isPC()) {
        osType = 1;
      }
    }
    useDevice.value.osType = osType;

    //start: url 地址处理==================================================
    let url: any = {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      password: "",
      pathname: "",
      port: "",
      protocol: "",
      searchParams: {},
      username: "",
    };
    url = new URL(window.location.href);
    AppUrl.value = url;
    if (AppUrl.value.host.includes("www.afun.com")) {
      const urlAfun = useUrlWwwAfun();
      urlAfun.value = true;
    }
    const pathname = url.pathname ?? "";
    let urlCh = "";
    let chmatch = pathname.match(/\/ch[0-9]+/gi);
    if (chmatch && chmatch[0]) {
      urlCh = chmatch[0];
      ch.value = urlCh;
      HallLog.log("urlCh:" + urlCh);
    }

    HallLog.log("url:" + AppUrl.value);
    HallLog.log("origin:" + AppUrl.value.origin);
    HallLog.log("searchParams:" + AppUrl.value.searchParams);
    let s: String = "" + AppUrl.value.searchParams;
    HallLog.log("stringParams:" + AppUrl.value.searchParams);
    if (s != "") {
      let arr0 = s.split("&");
      arr0.forEach((element) => {
        let arr1 = element.split("=");
        if (arr1.length < 2) {
          arr1[1] = "";
        }
        for (let i = 2; i < arr1.length; i++) {
          arr1[1] += "=" + arr1[i];
        }
        urlParams.value[arr1[0]] = decodeURIComponent(arr1[1]);
      });
    }
    if (urlParams.value["ch"]) {
      urlCh = "/ch" + urlParams.value["ch"];
      HallLog.log("param ch:" + urlCh);
    }
    // ch.value = urlCh

    if (urlCh != "") {
      channel.value = Number(urlCh.substring(3));
      HallLog.log("channel:" + channel.value);

      const lastChannel = vueStorage(StorageKey.LastChannel, 0);
      lastChannel.value = channel.value;
    }

    if (urlParams.value["ic"]) {
      useUrlIc().value = urlParams.value["ic"];
    }

    const urlLang = useUrlLang();
    urlLang.value = urlParams.value["lang"];
    configStore.useUpdateLang(urlLang.value);

    useUrlError().value = urlParams.value["error"];

    useUrlTest().value = urlParams.value["test"] == "1";
    tiktokSdkData["tt_test_event_code"] = urlParams.value["testcode"];

    useForceReg.value = urlParams.value["register"];

    const chlimit = useUrlChlimit();
    chlimit.value = urlParams.value["chlimit"] == "1";

    useUrlcApp().value = urlParams.value["cApp"] == "1"; //是否cocosApp打开

    const urlmApp = useUrlmApp(); //是否主屏幕打开
    urlmApp.value = urlParams.value["mApp"] == "1";

    const urlmReq = useUrlmReq(); //额外请求参数
    urlmReq.value = !!urlParams.value["mReq"];

    const urlNoCache = useUrlnoCache(); //强制刷新缓存
    urlNoCache.value = urlmApp.value || urlParams.value["nocache"] == "1" || isWebView();

    //url直接进游戏
    const urlGameID = useUrlGameID();
    if (urlParams.value["gid"]) {
      urlGameID.value = parseInt(urlParams.value["gid"]);
      HallLog.log("urlGameID:" + urlGameID.value);
    }

    //当前url地址
    const urlSourceMap = useUrlSourceMap();
    HallLog.log("urlParams:" + JSON.stringify(urlParams.value));
    urlSourceMap.value = {
      url: url.href,
      params: JSON.parse(JSON.stringify(urlParams.value)),
    };
    HallLog.log("urlSourceMap:" + JSON.stringify(urlSourceMap.value));
    //首次打开url地址
    const firstUrl = vueStorage(StorageKey.FirstUrl, {});
    if (!firstUrl.value.url) {
      firstUrl.value = urlSourceMap.value;
    }
    if (firstUrl.value.params) {
      Object.keys(firstUrl.value.params).forEach((key) => {
        firstUrl.value.params[key] = "" + firstUrl.value.params[key];
      });
    }
    const urlFirstMap = useUrlFirstMap();
    urlFirstMap.value = firstUrl.value;
    HallLog.log("urlFirstMap:" + JSON.stringify(urlFirstMap.value));

    //持久化保存参数记录
    const urlCodes = vueStorage(StorageKey.UrlCodes, {});
    let gtkStartTime = urlCodes.value["gtk_time"];
    Helper.assignObj(urlCodes.value, urlParams.value);
    let now = new Date().getTime();
    if (urlCodes.value["gtk"] && gtkStartTime) {
      if (now - gtkStartTime >= sysConfig["gtk_time"] * 1000) {
        //游戏模板 缓存保留时间：毫秒【支持后台配置】
        delete urlCodes.value["gtk"];
        delete urlCodes.value["gtk_time"];
      }
    }
    if (urlCodes.value["gtk"]) {
      //刷新有效期
      urlCodes.value["gtk_time"] = now;
    }

    Helper.assignObj(useUrlUtm().value, urlCodes.value, "utm");
    urlCodes.value["os_type"] = getSysOsNumber();

    let gtk = urlCodes.value["gtk"];
    configStore.setGameTemplateToGameModule("g_temp_" + gtk);
    if (gtk && !urlCodes.value["gtk_time"]) {
      urlCodes.value["gtk_time"] = now;
    }

    updateSdkData(urlCodes.value);

    let ag = urlCodes.value["ag"];
    if (ag && resConfig["reg-cfg-arr"][ag]) {
      resConfig["reg-cfg"] = resConfig["reg-cfg-arr"][ag];
    }
    HallLog.log("reg-cfg", resConfig["reg-cfg"]);

    if (urlCodes.value["hdapp"] == "1") {
      sysConfig.activity.download = false;
    }
    //end: url 地址处理==================================================
  }
  const modalConfig = new Map();
  const popupMaps = usePopupNameMaps(); //存储弹窗名称 后续可用
  const route = useRoute();
  const popup = usePopupConfig(); //弹窗配置
  //懒加载弹窗组件
  const getAsyncComponent = (key: string) => {
    return defineAsyncComponent({
      loader: () => {
        //识别路径是否有文件夹，单纯的字符串文件路径不会识别编译到文件路径，会被识别为文件名
        const keyPath = key.split("/");
        if (keyPath.length == 2) {
          return import(`@/components/${keyPath[0]}/${keyPath[1]}.vue`);
        } else if (keyPath.length == 3) {
          return import(`@/components/${keyPath[0]}/${keyPath[1]}/${keyPath[2]}.vue`);
        } else if (keyPath.length == 4) {
          return import(`@/components/${keyPath[0]}/${keyPath[1]}/${keyPath[2]}/${keyPath[3]}.vue`);
        } else if (keyPath.length == 5) {
          return import(`@/components/${keyPath[0]}/${keyPath[1]}/${keyPath[2]}/${keyPath[3]}/${keyPath[4]}.vue`);
        } else if (keyPath.length == 6) {
          return import(
            `@/components/${keyPath[0]}/${keyPath[1]}/${keyPath[2]}/${keyPath[3]}/${keyPath[4]}/${keyPath[5]}.vue`
          );
        }
        return import(`@/components/${key}.vue`);
      },
      errorComponent: ErrorComponent,
      loadingComponent: LoadingComonent,
      delay: 100,
      timeout: 10000,
      suspensible: false,
      onError: (err, retry, error, attempts) => {
        error();
        HallLog.error("err:", err, "retry", retry, "error", error, "attempts", attempts);
        HallLog.error(`lazy component:${key} is load failed!`);
      },
    });
  };
  const initModalConfig = () => {
    /** 统一配置 以文件名为hash*/
    let list = [
      getPopupPath("login", false),
      getPopupPath("register", false),
      getPopupPath("reset", false),
      getPopupPath("registerCode", false),
      getPopupPath("searchResult", false),
      getPopupPath("download"),
      getPopupPath("deposit"),
      getPopupPath("withdraw"),
      getPopupPath("account"),
      getPopupPath("myProfile"),
      getPopupPath("myProfile/myProfileEdit"),
      getPopupPath("settings"),
      getPopupPath("referAndEarn/inviteRecord"),
      getPopupPath("referAndEarn/commissionRewards"),
      getPopupPath("referAndEarn/distributionRewards"),
      getPopupPath("referAndEarn/friendsList"),
      getPopupPath("referAndEarn/referralRewards"),
      getPopupPath("referAndEarn/referralVipRewards"),
      getPopupPath("referAndEarn/agentHistory"),
      getPopupPath("referAndEarn/referEarn"),
      getPopupPath("referAndEarn/spinRule"),
      getPopupPath("betHistory"),
      getPopupPath("transaction"),
      getPopupPath("message"),
      getPopupPath("rewardHistory"),
      getPopupPath("roulette"),
      getPopupPath("gamedetail"),
      getPopupPath("other"),
      getPopupPath("checkin"),
      getPopupPath("inviteChest"),
      getPopupPath("userInfo"),
      getPopupPath("bonus"),
      getPopupPath("chat"),
      getPopupPath("walletRules"),
      getPopupPath("lossRebate"),
    ];
    list.forEach((el: any) => {
      const component = getAsyncComponent(el);
      let item: String[] = el.split("/");
      let key = item[item.length - 1];
      modalConfig.set(key, component);
    });
    /** 特殊配置 不以文件名为hash*/
    //设置优惠弹窗详情配置
    const promotioncontent = getAsyncComponent(getPopupPath("promotion/content"));
    modalConfig.set("promotioncontent", promotioncontent);
    //设置后台配置文案页面
    const content = getAsyncComponent(getPopupPath("content"));
    for (let key in pageData.value?.textConfig) {
      if (typeof pageData.value?.textConfig[key] == "object" && key != null) {
        popupHeaderNavbarConfig[key] = popupHeaderNavbarConfig.desc;
        modalConfig.set(key, content);
      }
    }
    let maps: mapFace = {};
    modalConfig.forEach((_, key: string) => {
      maps[key] = true;
    });
    popupMaps.value = maps;
  };
  if (process.client) {
    initModalConfig();
  }
  const overlayer1Class = computed(() => {
    return ["vfm-overlay", `${popup.value[0].overlay}${device.isDesktop ? "-pc" : ""}-overlayer`];
  });
  const overlayer2Class = computed(() => {
    return ["vfm-overlay", `${popup.value[1].overlay}${device.isDesktop ? "-pc" : ""}-overlayer`];
  });
  const modalContent = `modal-content${device.isDesktop ? "-pc" : ""}`;
  const firstOverlayer = computed(() => [
    modalContent,
    `${popup.value[0].overlay}-modal-content${device.isDesktop ? "-pc" : ""}`,
  ]);
  const secondOverlayer = computed(() => [
    modalContent,
    `${popup.value[1].overlay}-modal-content${device.isDesktop ? "-pc" : ""}`,
  ]);
  //弹窗组件引用 弹窗监听
  const updateFirstPopup = () => {
    let item = popup.value[0];
    if (firstModalValue.value) {
      item.name = modal.value[0];
      let from = popupHeaderNavbarConfig[item.name];
      item.overlay = from ? from.overlay : "base";
      item.class = from && from.class ? from.class : "";
      item.index = from && from.index ? from.index : null;
      item.show = true;
    } else {
      item.class = "";
      item.name = "";
      item.show = false;
      item.index = null;
    }
  };
  const updateSecondPopup = () => {
    let item = popup.value[1];
    if (secondModalValue.value) {
      item.name = modal.value[1];
      let from = popupHeaderNavbarConfig[item.name];
      item.overlay = from ? from.overlay : "base";
      item.index = from && from.index ? from.index : null;
      item.show = true;
    } else {
      item.name = "";
      item.show = false;
      item.index = null;
    }
  };

  const closePopupFromPage = (index: number) => {
    if (usePopupExits().value) {
      if (popup.value[index].name) {
        closePopup("", "", true);
      }
    }
  };

  //是否显示弹窗判断
  const modal = computed(() => {
    let result = (useRoute().hash ?? "")
      .replace("#", "")
      .split("/")
      .filter((el) => el && popupMaps.value[el]);
    return result;
  });
  const dialog = useDialogStore();

  const firstModalValue = computed(() => {
    if (modal.value[0]) {
      return modalConfig.get(modal.value[0]);
    } else {
      return false;
    }
  });
  const secondModalValue = computed(() => {
    if (modal.value[1]) {
      return modalConfig.get(modal.value[1]);
    } else {
      return false;
    }
  });

  var pageLoadingTimer: any = null;
  const updatePageLoading = () => {
    if (pageLoading.value) {
      pageLoadingTimer = setTimeout(() => {
        pageLoading.value = false;
      }, 5000);
    } else {
      if (pageLoadingTimer) {
        clearTimeout(pageLoadingTimer);
        pageLoadingTimer = null;
      }
    }
  };

  if (process.client) {
    watchEffect(updateFirstPopup);
    watchEffect(updateSecondPopup);
    watchEffect(updatePageLoading);
  }
  const noticeRef = ref();
  onMounted(() => {
    HallLog.log("app onMounted");
    vueSessionStorage("game-window", 1);
    Global.Event.on("game_h5_event", gameStore, gameStore.handleIframeMsg, undefined);
    window.addEventListener("message", gameStore.handleIframeMsg);
    useAppStore().setRef(noticeRef);
    document.body.setAttribute("model", useAppModel().value);
    if (useSysConfigStore().modelConfig.float_up) {
      document.body.setAttribute("floatup", "1");
    }

    Global.setup();
    Global.Setting.appVersion = useReqVersion().value;
    Global.Setting.appId = useAppId().value;
    Global.AESUtil.isRelease = useAppEnv().value != 1;
    registerBroadcastHandle();

    errorHandleBoot();

    NativeEvent.instance.hideSplashView();

    if (ch.value) {
      let newUrl = window.location.href;
      newUrl = newUrl.replace(ch.value, "");
      let newReqParam = "ch=" + channel.value;
      newUrl = Helper.urlAddParam(newUrl, newReqParam);
      HallLog.error("url trans: " + newUrl);
      window.location.href = newUrl;
      return;
    }

    if (app.$device.isDesktop) {
      let urlArr = window.location.href.split("#");
      let urlHash = urlArr.length > 1 ? "#" + urlArr[1] : "";
      if (urlHash.includes("gamedetail")) {
        window.location.href = window.location.href.split("#")[0];
        return;
      }
    }
    const urlNoCache = useUrlnoCache();
    const urlmReq = useUrlmReq();
    if (urlNoCache.value && !urlmReq.value) {
      //html离线缓存问题处理
      const reqParam = new Date().toISOString().substring(0, 11);
      const lastDay = vueStorage("mReqLastDay", "");
      const reqCount = vueStorage("mReqCount", 0);
      if (lastDay.value != reqParam) {
        lastDay.value = reqParam;
        reqCount.value = 0;
      }
      reqCount.value++;

      let newUrl = window.location.href;
      let newReqParam = "mReq=" + reqParam + reqCount.value;
      newUrl = Helper.urlAddParam(newUrl, newReqParam);
      window.location.href = newUrl;
      return;
    }
    if (device.isDesktop) {
      document.getElementById("root")?.setAttribute("id", "root-p");
    }
    setTimeout(() => {
      let ele = document.getElementById("firstPaint");
      if (ele) {
        ele.remove();
      }
      let eleScript = document.getElementById("firstScript");
      if (eleScript) {
        eleScript.remove();
      }
    }, 10000);

    A2HS();

    //因为AF接入s2s的情况，无法通过af透传到其他sdk上报【如facebook】，这里增加各包网开关
    if (resConfig["af-s2s-open"]) {
      try {
        const storageAppSdkData = vueStorage(StorageKey.AppSdkData, "");
        let appSdkData = NativeEvent.instance.getSdkData();
        if (appSdkData) {
          let obj = JSON.parse(appSdkData);
          Helper.assignObj(afSdkData, obj);
          storageAppSdkData.value = JSON.stringify(obj);
        } else if (storageAppSdkData.value) {
          Helper.assignObj(afSdkData, JSON.parse(storageAppSdkData.value));
        }
      } catch (error) {
        HallLog.error("AppSdkData error");
      }
    }

    setTimeout(() => {
      appLoadingStatus.value = false;
    }, 400);

    if (!useUrlcApp().value) {
      //全局埋点初始化
      initGoogleTag();
      initFirebaseGlobal();
    }

    let chValue = channel.value;
    if (!chValue && userStore.data.pack_no) {
      chValue = userStore.data.pack_no;
    }
    if (!chValue) {
      const lastChannel = vueStorage(StorageKey.LastChannel, 0);
      chValue = lastChannel.value;
    }
    useCheckversionChannel().value = chValue;

    if (isWebView() && !urlParams.value["channelError"]) {
      const appChannel = vueStorage(StorageKey.AppChannel, 0);
      appChannel.value = chValue;
    }

    //然后自动登录
    userStore.autoLogin();

    //最后执行初始业务逻辑
    let deviceObj: any = getDeviceObject();
    if (!deviceObj.device_id) {
      deviceObj["server_sid"] = deviceObj.device_id;
      deviceObj["need_sid"] = 1;
    }
    useCheckVersion(
      {body: {ch: chValue, pack: chValue, uid: 0, device: deviceObj}},
      (res: any) => {
        if (!res) {
          return;
        }
        if (res.server_id) {
          vueSetLocal(StorageKey.WebDeviceUUID, res.server_id);
        }

        configStore.checkVersionConfig = res;
        if (window.web_abort && typeof window.web_abort == "function") {
          window.web_abort();
        }
        //渠道返回金额比例、金额简写、语言配置优先
        configStore.config.point_ratio = res.point_ratio;
        configStore.config.lang = res.lang;
        configStore.config.currency = res.currency;
        HallLog.log("checkversion:" + JSON.stringify(configStore.checkVersionConfig));

        if (!useUrlcApp().value) {
          //渠道埋点初始化
          initChannelSdk();
          initFirebaseChannel();
          initAdjustChannel();
          initSdkEnd();
        }
      },
      (err: any) => {
        // HallLog.error('useCheckVersion error', err)
      }
    );

    //--通过url直接进游戏
    let bIntoGame = isPageInGame();
    const urlGameID = useUrlGameID();
    let gameID = urlGameID.value;
    urlGameID.value = 0;
    if (bIntoGame && gameID > 0) {
      let urlDemo = urlParams.value["demo"];
      let demo = urlDemo == "1" ? true : urlDemo == "0" ? false : null;
      gameStore.tryToGame(gameID, bIntoGame, demo);
    }

    if (useForceReg.value) {
      const lastUid = vueStorage(StorageKey.LastUid, 0);
      if (!lastUid.value) {
        useLoginStore().needForceReg = useForceReg.value;
        openRegister();
      }
    }

    setTimeout(() => {
      appStore.initThirdLogin();

      userStore
        .getUserInfo()
        .then((res: any) => {
          userStore.checkLoginCallback(true);
        })
        .catch((err: any) => {
          // HallLog.warn('app userStore.getUserInfo() error', err)
          userStore.checkLoginCallback(false);
        });
    }, 10);

    setTimeout(() => {
      testVersion();
    }, 5000);
  });

  const fetchData = () => {
    configStore.setCurrentTimestamp();
    let data: any = useTimerConfig().value.data;
    for (let key in data) {
      let item = data[key];
      if (item.play && typeof item.func == "function") {
        item.func();
      }
    }
  };
  const {pause, play, isLoading} = useTimeExecutor({
    second: 1,
    func: fetchData,
  });

  onBeforeUnmount(() => {
    timer && clearInterval(timer);
  });
</script>
<!-- <style lang="scss">
	@import '~~/assets/stylesheets/common/common.scss';
</style> -->
