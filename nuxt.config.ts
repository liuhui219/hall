/** @format */

// import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import lang from "./locales/langIndex";
import {loadEnv} from "vite";
// import md5 from 'js-md5'
const ONE_DAY = 60 * 60 * 24 * 1000;
const ONE_WEEK = ONE_DAY * 7;
const envScript = (process.env.npm_lifecycle_script as string).split(" ");
const envName = envScript[envScript.length - 1]; // 通过启动命令区分环境
const envData = loadEnv(envName, "env");
//全局CSS服务端不引入
const {SSR_SIDE} = process.env;
const IS_SSR_SERVER = SSR_SIDE === "server";
console.log("envData.VITE_APPSKIN", envData.VITE_APPSKIN);
const APP_SKIN_CSS = `@import '~~/assets/stylesheets/external/skin/${envData.VITE_APPSKIN}.scss';`;
// const APP_NAME_CSS = `@import '~~/assets/stylesheets/external/app/${envData.VITE_APPNAME}.scss';`
const precss = IS_SSR_SERVER
  ? {}
  : {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '~~/assets/stylesheets/_variables.scss';" + APP_SKIN_CSS,
        },
      },
      modules: {
        generateScopedName: process.env.MODE == "development" ? "[name]__[local]__[hash:base64:5]" : "[hash:base62:7]",
      },
    };

const globcss = [
  "~~/assets/stylesheets/common/common.scss",
  `~~/assets/stylesheets/external/app/${envData.VITE_APPSKIN}.scss`,
  `~~/assets/stylesheets/external/model/${envData.VITE_APPSKIN.substring(0, 1)}.scss`,
];

console.log("env", envData);
let supportLang: any = lang;
let supportLangKeys: any = [];
if (envData.VITE_SUPPORT_LANG) {
  supportLangKeys = JSON.parse(envData.VITE_SUPPORT_LANG);
}
if (supportLangKeys && supportLangKeys.length > 0) {
  supportLang = {};

  supportLangKeys.forEach((key: any) => {
    supportLang[key] = lang[key];
  });
}
const version = new Date().toISOString();
const updateRouteByCh = (list: any) => {
  if (!list || !list.length) {
    return;
  }
  list.forEach((el: any) => {
    el.path = el.path.replace("/:_ch", "/:_ch?");
    if (el && el.children && el.children.length) {
      updateRouteByCh(el.children);
    }
  });
};
export default defineNuxtConfig({
  app: {
    buildAssetsDir: "/static/",
    rootId: "root-p",
    pageTransition: false,
    keepalive: true,
    head: {
      meta: [
        {charset: "utf-8"},
        /*{ name: "title", content: "My App Website" },*/ {
          name: "viewport",
          content:
            "width=device-width,minimum-scale=1,maximum-scale=1,user-scalable=no,initial-scale=1.0,viewport-fit=cover",
        },
        {name: "render", content: "webkit"},
        {name: "format-detection", content: "telephone=no"},
        {name: "force-rendering", content: "webkit"},
      ],
      // link: [{ rel: "preconnect", href: "https://fonts.gstatic.com" }],
      script: [
        // {
        // 	hid: "json-ld-reference-bla",
        // 	children: `{ "@context": "https://schema.org", "@type": "WebSite", "name": "AFUN", "url": "https://www.afun.com/",
        // 		"potentialAction": {
        // 			"@type": "SearchAction",
        // 			"target": "{search_term_string}",
        // 			"query-input": "required name=search_term_string"
        // 		}
        // 	}`,
        // 	type: "application/ld+json",
        // },
        // {
        // 	defer: true,
        // 	type: "text/javascript",
        // 	src: "https://37238f5e-0b08-434d-bb87-15c5ac45f2d6.snippet.antillephone.com/apg-seal.js",
        // },
      ],
    },
  },

  sourcemap: {
    server: true,
    client: false,
  },
  // buildDir: '.nuxt',
  hooks: {
    "pages:extend"(routes) {
      updateRouteByCh(routes);
    },

    // 'build:manifest': (manifest) => {
    // 	// remove all prefetch links for now. LCP & FCP killer
    // 	for (const key in manifest) {
    // 		const file = manifest[key]
    // 		file.dynamicImports = []
    // 		file.imports = []
    // 		file.assets = []
    // 	}
    // },
  },

  runtimeConfig: {
    cookieSecret: envData.VITE_COOKIE_SECRET || "secret",
    cookieExpires: parseInt(envData.VITE_COOKIE_REMEMBER_ME_EXPIRES || ONE_DAY.toString(), 10), // 1 day
    cookieRememberMeExpires: parseInt(envData.VITE_COOKIE_REMEMBER_ME_EXPIRES || ONE_WEEK.toString(), 10), // 7 days
    appid: parseInt(envData.VITE_APP_APPID as string, 10) || 1012,
    appname: envData.VITE_APPNAME || "1012",
    appskin: envData.VITE_APPSKIN || "black",
    natsurl: envData.VITE_NATSURL || "nats://16.163.61.165:8111/",
    natsuser: envData.VITE_NATSUSER || "minigame",
    natspass: envData.VITE_NATSPASS || "M123G321",
    public: {
      app_env: envData.VITE_APP_ENV,
      app_model: envData.VITE_APPSKIN.substring(0, 1),
      app_skin: envData.VITE_APPSKIN,
      path: process.env.NODE_ENV == "development" ? "/static/public/" : "/",
      version: version,
    },
  },
  ignore: ["gamelist.json"],
  postcss: {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: [
          "ie >= 8", // 兼容IE7以上浏览器
          "Firefox >= 3.5", // 兼容火狐版本号大于3.5浏览器
          "chrome  >= 35", // 兼容谷歌版本号大于35浏览器,
          "opera >= 11.5", // 兼容欧朋版本号大于11.5浏览器,
          "chrome  >= 36",
        ],
      },
    },
  },
  // webpack: {
  // 	extractCSS: false,
  // },
  vite: {
    optimizeDeps: {exclude: ["fsevents"]},

    build: {
      // cssCodeSplit: false,
      target: "es2015",
    },
    // plugins: [
    // ...
    // 	chunkSplitPlugin({
    // 		customChunk: (args) => {
    // 			// files into pages directory is export in single files
    // 			let { file, id, moduleId, root } = args;
    // 			if (file.startsWith("middleware/") || file.startsWith("composables/") || file.startsWith("apis/") || file.startsWith("assets/") || file.startsWith("components/") || file.startsWith("plugins/") || file.startsWith("store/")) {
    // 				file = md5(file).substring(0, 15);
    // 				return file;
    // 			}
    // 			return null;
    // 			console.log("file id moduleId root", args);
    // 			console.log("*************************");
    // 			// if(file.startsWith("components/") || file.startsWith("composables/") || file.startsWith("apis/"))
    // 			// file = md5(file).substring(0, 15);
    // 			// return file;
    // 		},
    // 		customSplitting: {
    // 			// `react` and `react-dom` will be bundled together in the `react-vendor` chunk (with their dependencies, such as object-assign)
    // 			module: ["vue", "vue-router", "pinia", "vue3-lottie", "crypto-js", "@pinia/nuxt", "@nuxtjs/device", "nuxt-swiper", "@nuxtjs/tailwindcss"],
    // 			// Any file that includes `utils` in src dir will be bundled in the `utils` chunk
    // 			utils: [/apis\//],
    // 			store: [/store\//],
    // 			ables: [/composables\//],
    // 		},
    // 	}),
    // ],
    // build: {
    // 	cssCodeSplit: false,
    // 	rollupOptions: {
    // 		output: {
    // 			chunkFileNames: "content.[hash:15].js",
    // 			assetFileNames: "style.[hash:15][extname]",
    // 		}
    // 	}
    // },
    css: precss,
  },
  build: {
    analyze: true,
  },

  // proxy: {
  // 	proxies: {
  // 		'/api/notify': {
  // 			target: 'http://localhost:3001',
  // 			changeOrigin: true,
  // 		},
  // 	},
  // },
  imports: {
    // Auto-import pinia stores defined in `~/stores`
    dirs: ["store", "apis"],
  },

  //全局样式
  css: globcss,
  modules: [
    "@nuxt/image-edge",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
    "@nuxtjs-alt/proxy",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    // '@kevinmarrec/nuxt-pwa',
    "@vite-pwa/nuxt",
    ["nuxt-swiper", {modules: ["navigation", "pagination", "autoplay", "effect-creative", "effect-coverflow"]}],
  ],
  pwa: {
    disable: true,
    strategies: "generateSW",

    workbox: {
      cacheId: envData.VITE_APP_APPID,
      navigationPreload: true,
      runtimeCaching: [
        {
          urlPattern: ({url}) => url.origin === "https://www.facebook.com/.*",
          handler: "NetworkOnly",
        },
        {
          urlPattern: ({url}) => false,
          handler: "NetworkFirst",
        },
      ],
      // runtimeCaching: [{
      // 	urlPattern: ({url}) => url.origin === 'https://api.example.com',
      // 		handler: 'NetworkFirst',
      // 		options: {
      // 		cacheName: 'api-cache',
      // 		},
      // 	},
      // 	{
      // 		urlPattern: ({request}) => request.destination === 'image',
      // 		handler: 'StaleWhileRevalidate',
      // 		options: {
      // 		cacheName: 'images-cache',
      // 		expiration: {
      // 			maxEntries: 10,
      // 		},
      // 		},
      // 	}]
      // navigateFallback: '/',
      // navigateFallbackDenylist: [/https:\/\/www.facebook.com\/.*/],

      // globPatterns: ['*/*.*', '*.*'],
      // globPatterns: ['**/*.{js,css}'],
    },
    icon: false,
    meta: false,

    devOptions: {
      enabled: process.env.NODE_ENV != "development",
      type: "module",
    },
  },
  i18n: {
    vueI18n: {
      legacy: false,
      locale: "en-US",
      messages: supportLang,
    },
  },
});
