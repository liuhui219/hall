/** @format */

export {};
declare global {
  interface Window {
    versionForceUpdate: any;
    s_version: any;
    c_version: any;
    test_version_count: any;
    versionTestTimer: any;

    Global: any;
    saveToHome: Function;
    jsbridge: any;
    jsBridge: any;
    jsThirdBridge: any;
    webkit: any;

    getEventData: Function;
    dataLayer: any;
    send_to: any;
    channel_send_to: any;
    gtm_ga_id: any;

    fbPixel: any;
    fbq: Function;
    fbSdkData: any;

    kwaiPixel: any;
    kwaiq: any;
    kwaiqInstance: any;

    tiktokPixel: any;
    ttq: any;

    maxconv: any;

    uni: any;

    firebaseAnalytics: any;
    channelAnalytics: any;
    firebaseLogEvent: Function;
    logEvent: Function;
    initializeApp: Function;
    setUserProperties: Function;
    setUserId: Function;
    getAnalytics: Function;
    firebaseSendTo: any;
    firebaseChannelSendTo: any;

    adjustConfig: any;
    adjustAppToken: any;
    btErrorCount: any;
    btScript: boolean;
    btRender: any;
    toHome: Function;
    errorTimeOut: any;
    LiveChatWidget: any;
    deferredPrompt: any;
    web_promise: Promise;
    web_abort: Function;
    thirdDom: any;
  }
}

declare module "file-saver";
declare module "crypto-js";
declare module "@codemodity/tournament-ui-widget-vue";
