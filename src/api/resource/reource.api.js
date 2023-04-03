import http from "service/http.service";
import * as urls from "config/url.config";
import {queryParameterToObject} from 'utils/functions.util'

const fetchResourceAPIs = {
    createResource(data) {
        return new Promise((resolve, reject) => {
            http.post(urls.CREATE_RESOURCE,data)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        })
    },
    getAllResource(data) {
        //if backend data is object!
      /*  const data = queryParameterToObject(query)*/

        console.log('neg',`${data?`/${data}`:''}`)
        return new Promise((resolve, reject) => {
            http.get(`${urls.GET_ALL_RESOURCE}${data?`/${data}`:''}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error));
        })
    },

    updateResource(data){
        return new Promise((resolve,reject)=>{
            http.put(`${urls.UPDATE_RESOURCE}/${data.id}`,data)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        })
    } ,
    deleteResource(data){
        return new Promise((resolve,reject)=>{
            http.delete(`${urls.DELETE_RESOURCE}/${data}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        })
    }
};

export default fetchResourceAPIs;