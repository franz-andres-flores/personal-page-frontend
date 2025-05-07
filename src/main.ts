import { createApp } from 'vue';
import { Quasar } from 'quasar';

import App from "./App.vue";
import router from "./router";
import '@fortawesome/fontawesome-free/css/all.css'
import "quasar/dist/quasar.sass";
import quasarUserOptions from './quasar-user-options';

import ToolbarComponent from '@/ui/components/toolbar/ToolbarComponent.vue';

createApp(App)
    .component('toolbar', ToolbarComponent)
    .use(Quasar, quasarUserOptions)
    .use(router)
    .mount("#app");
