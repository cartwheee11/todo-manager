import { createApp } from 'vue'

// window.localStorage.clear();

import router from './router'
import './assets/main.css'
import "nes.css/css/nes.min.css";
import App from "./App.vue";
import 'dialog-polyfill/dist/dialog-polyfill.css'

createApp(App)
  .use(router)
  .mount("#app");