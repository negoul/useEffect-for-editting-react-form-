import http from "service/http.service";
import * as urls from "config/url.config";
import {queryParameterToObject} from 'utils/functions.util'
import {CHARTS} from "config/url.config";

const fetchChartsDataAPIs = {

    fetchChartsData() {
        console.log('neg',CHARTS)
        return new Promise((resolve, reject) => {
            http.get(`https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json`)
                .then(response => resolve(console.log('rr',response)))
                .catch(error => reject(console.log('rr',error)));
        })
    },

};

export default fetchChartsDataAPIs;