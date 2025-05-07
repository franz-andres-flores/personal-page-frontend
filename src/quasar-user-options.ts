import { Dialog, Loading, Meta, Notify } from 'quasar';
import lang from 'quasar/lang/es';

import './styles/quasar.scss';
import '@quasar/extras/material-icons/material-icons.css';

export default {
  config: {},
  plugins: {
    Dialog,
    Loading,
    Meta,
    Notify
  },
  lang: lang
}