import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import moment from 'moment';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import {App} from 'App.js';
import {PATH} from 'config/routes.config';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  FILE_TOKEN,
  IS_LOGGED_IN,
  APP_DIR,
  APP_LANGUAGE,
  APP_DEFAULT_LANGUAGE,
  SENTRY_URL
} from 'config/variables.config';
import reportWebVitals from 'reportWebVitals';
import {getAppLanguage, setAppDirection, setAppLanguage, toCamelCase} from 'utils/functions.util';
import history from 'utils/history.util';
import 'moment/locale/fa';
import packageJSON from '../package.json';
import { store } from "./redux/store";
/*import { setUserTokens, whoAmI } from "./redux/action/authentication.action";*/
import 'asset/styles/antd/theme.less';
import { ConfigProvider } from 'antd';


import '@sakit-sa/react-master-detail/dist/index.css';
import '@sakit-sa/react-button/dist/index.css';

const renderDOM = () => ReactDOM.render(
    <ConfigProvider direction={i18next.dir(getAppLanguage())}>
      <App/>
    </ConfigProvider>, document.getElementById('root'));
const resetApp = () => {
  localStorage.removeItem(IS_LOGGED_IN);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const loadDynamicScripts = async () => {
  await (async () => {
    return await import('./i18n');
  })();
};

const loadDynamicStyles = async () => {
  await (async () => {
    return await import('react-toastify/dist/ReactToastify.css');
  })();

  await (async () => {
    return await import('./asset/styles/style.scss');
  })();
};

const setAppInfo = () => {
  const appName = toCamelCase(packageJSON.name, '-');
  window[appName] = {version: packageJSON.version};
};

const initialSentry = () => {
  if (!SENTRY_URL) return;
  Sentry.init({
    dsn: SENTRY_URL,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
};

const initProject = async () => {
  setAppLanguage(APP_LANGUAGE, APP_DEFAULT_LANGUAGE);
  await loadDynamicScripts();
  const dir = i18next.dir(getAppLanguage());
  setAppDirection(APP_DIR, dir);
  await loadDynamicStyles(dir);
  moment.locale(getAppLanguage());

  const accessToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN));

  /*  if (accessToken) {
      await store
        .dispatch(whoAmI())
        .then(() => {
          const token = {
            accessToken: JSON.parse(localStorage.getItem(ACCESS_TOKEN)),
            refreshToken: JSON.parse(localStorage.getItem(REFRESH_TOKEN)),
            fileToken: JSON.parse(localStorage.getItem(FILE_TOKEN)),
          };
          store.dispatch(setUserTokens(token));
        })
        .catch(() => history.push(PATH.LOGIN));
    }*/

 renderDOM()
};

try {
  setAppInfo();
  // resetApp();
  initialSentry();
  initProject();
} catch (e) {
  history.push(PATH.ERROR);
  renderDOM();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
