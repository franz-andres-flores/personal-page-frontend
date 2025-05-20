import { createApp } from 'vue';
import { Quasar } from 'quasar';

import "quasar/dist/quasar.sass";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import JsonExcel from "vue-json-excel3";
import 'bootstrap';
// import '@/styles/quasar.variables.scss';  

import App from "./App.vue";
import router from "./router";
import quasarUserOptions from './quasar-user-options';
import ToolbarComponent from '@/ui/components/toolbar/ToolbarComponent.vue';
import ConfirmModalComponent from '@/ui/components/modals/confirm/ConfirmModalComponent.vue';
import ExportModalComponent from '@/ui/components/modals/export/ExportModalComponent';
import TableComponent from '@/ui/components/tables/TableComponent.vue';
import FilterListComponent from '@/ui/components/filters/FilterListComponent.vue';
import FilterButtonComponent from '@/ui/components/filters/FilterButtonComponent.vue';
import NavBarComponent from './ui/components/navbar/NavBarComponent.vue';

createApp(App)
    .use(Quasar, quasarUserOptions)
    .use(router)
    .component('export-excel-csv', JsonExcel)
    .component('toolbar', ToolbarComponent)
    .component('navbar', NavBarComponent)
    .component('filter-list-component', FilterListComponent)
    .component('filter-button-component',  FilterButtonComponent)
    .component('table-component', TableComponent)
    .component('confirm-modal', ConfirmModalComponent)
    .component('export-modal', ExportModalComponent)
    .mount("#app");
