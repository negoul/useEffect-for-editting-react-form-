import api from "api/resource/reource.api";


export function createResource(data) {
    return () => {
        return api.createResource(data)
            .then(response => response)
            .catch(error => Promise.reject(error))
    }
}

export function fetchAllResource(data) {
    return () => {
        return api.getAllResource(data)
            .then(response => response)
            .catch(error => Promise.reject(error))
    }
}
export function updateResource(data) {
    return () => {
        return api.updateResource(data)
            .then(response => response)
            .catch(error => Promise.reject(error))
    }
}
export function deleteResource(data) {
    return () => {
        return api.deleteResource(data)
            .then(response => response)
            .catch(error => Promise.reject(error))
    }
}


/*
export function fetchAllChannel(data) {
    console.log('data',data)
    return () => {
        return api.fetchAllChannel(data)
            .then(response => response)
            .catch(error => Promise.reject(error))
    }
}


export function updateChannel(data) {
    return () => {
        return api.updateChannel(data)
            .then(response => response)
            .catch(error => Promise.reject(error))
    }
}


export function deleteChannel(data) {
    return () => {
        return api.deleteChannel(data)
            .then(response => response)
            .catch(error => Promise.reject(error))
    }
}
*/
