/*
* Http interceptor is defined here
* */
import axios from "axios";
import {ACCESS_TOKEN, AXIOS_TIMEOUT, BASE_URL} from "config/variables.config";
import {errorHandler, isEmptyObject, isEmptyString} from "utils/functions.util";
import {FILTER_ALL_KEY} from "../config/action-bar.config";
// import {store} from 'redux/store';
// import history from "../helper/history";
// import { toast } from "react-toastify";
// const ACCESS_TOKEN_URL = 'users/accessToken';
let cancelRequest;

class HttpService {
    constructor() {
        axios.defaults.baseURL = BASE_URL;
        axios.defaults.timeout = AXIOS_TIMEOUT;

        axios.interceptors.request.use(
            (config) => {
                /*   const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN));*/
                console.log('keycloakToken')
                // TODO: dar refresh token, token ghabli ro dar header nafres. in check shavad va shart monaseb inja neveshte shavad
                config.headers["content-type"] = "application/json";
                /* config.headers['key'] = "fdsfgredflrgrlkgrrlfkgrlrr";*/
                config.headers["Authorization"] = `Bearer " +  `;
                /*  config.headers["Accept-Language"] = 'fa';*/
                /*  if (token) {
                      // we must not send expired token as a header to refresh our token
                      config.headers["Authorization"] = `Bearer ${token}`;
                  }*/

                /* when we set all in select by this below we dont send it to backend because we omit it from data*/
                if (isEmptyObject(config.data)) return config;
                // const parsedData = JSON.parse(config.data);
                const data = Object.keys(config.data).reduce((pv, cv) => {
                    if (config.data[cv] === FILTER_ALL_KEY) return pv;
                    return {...pv, [cv]: config.data[cv]}
                }, {})
                return {...config, data};
                /* return config;*/

            }, (error) => Promise.reject(error)
        );


        axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                // toast.error(JSON.stringify(error.response.data));
                const originalRequest = error.config;
                if (error.response && error.response.status === 401) {
                   /* if (UserService.isLoggedIn()) {
                        try {
                            const res = await UserService.updateToken(async function (refreshed) {
                                console.log('refreshed', refreshed)
                                return new Promise(async (resolve, reject) => {
                                    await axios
                                        .request(originalRequest)
                                        .then(response => resolve(response))
                                        .catch(error => reject(error))
                                        .finally(() => cancelRequest = null);
                                });
                            })
                            console.log('responseWithUpdateToken', res);
                            return res;
                        } catch (e) {
                            console.log('keyCloak401sisLoginButerror', e);
                            cancelRequest = null;
                            if (!axios.isCancel(error)) {
                                errorHandler(e);
                                return Promise.reject(e);
                            }
                        }
                    }*/
                    console.log('keycloak401sNotLoginAndDontHAveToken')
                    errorHandler(error);
                    // const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                    // cancelRequest && cancelRequest();
                    // if (refreshToken && !cancelRequest) {
                    // try {
                    // await store.dispatch(actions.refreshToken(refreshToken));
                    // return new Promise(async (resolve, reject) => {
                    //    await axios
                    //      .request(originalRequest)
                    //        .then(response => resolve(response))
                    //        .catch(error => reject(error))
                    //        .finally(() => cancelRequest = null);
                    // });
                    // } catch (e) {
                    //   cancelRequest = null;
                    //   if (!axios.isCancel(error)) {
                    //     errorHandler(e);
                    //     return Promise.reject(e);
                    //   }
                    // }
                    // errorHandler(error);

                    // } else {
                    //   // not to show error toast when refresh token is OK to be user friendly
                    //   if (!axios.isCancel(error)) {
                    //     errorHandler(error);
                    //   }
                    // }
                } else {
                    // not to show error toast when is cancelled form axios
                    // if (!axios.isCancel(error)) {
                    errorHandler(error);
                    // }
                }
                return Promise.reject(error);
            }
        );
    }

    get(url, config) {

        return axios.get(url, config);
    }

    post(url, data, config) {
        return axios.post(url, data, config);
    }

    put(url, data, config) {
        /*  config = config || { headers: { "content-type": "application/json" } };*/
        return axios.put(url, data, config);
    }

    delete(url, data, config) {
        /*  config = config || { headers: { "content-type": "application/json" } };*/
        return axios.delete(url, data, config);
    }

    patch(url, config) {
        /*  config = config || { headers: { "content-type": "application/json" } };*/
        return axios.patch(url, config);
    }
}

export default new HttpService();
