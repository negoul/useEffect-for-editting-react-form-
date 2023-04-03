import api from "api/filter.api";



export function fetchAllChannelList() {
    console.log('nn')
    return () => {
        return api.fetchAllChannelList()
            .then(response => {
                    const modifiedResponse = response.map((it) =>
                        ({
                            value: it.id,
                            label: `${it.name} - ${it.channelName}`,
                        }))
                    return modifiedResponse
                }
            )
            .catch(error => Promise.reject(error))
    }
}

export function fetchRequestTypeList() {
    return () => {
        return api.fetchRequestTypeList()
            .then(response => {
                    const modifiedResponse = response.map((it) =>
                        ({
                            value: {id: it.id, name: it.name},
                            label: it.faName,
                        }))
                    return modifiedResponse
                }
            )
            .catch(error => Promise.reject(error))
    }
}
export function fetchRequestTypeListSelect() {
    return () => {
        return api.fetchRequestTypeList()
            .then(response => {
                    const modifiedResponse = response.map((it) =>
                        ({
                            value:  it.id,
                            label: it.faName,
                        }))
                    return modifiedResponse
                }
            )
            .catch(error => Promise.reject(error))
    }
}
export function fetchStatusList() {
    return () => {
        return api.fetchStatusList()
            .then(response => {
                    const modifiedResponse = response.map((it) =>
                        ({
                            value:  it.code,
                            label: it.desc,
                        }))
                    return modifiedResponse
                }
            )
            .catch(error => Promise.reject(error))
    }
}
export function fetchStatusErrorList() {
    return () => {
        return api.fetchStatusList()
            .then(response => {
                    const modifiedResponse = response.map((it) =>
                        ({
                            value:  it.code,
                            label: it.desc,
                        }))
               const errorResponse = modifiedResponse.filter(item => item.value !== "0")
                    return errorResponse
                }
            )
            .catch(error => Promise.reject(error))
    }
}

export function fetchApiMethod() {
    return () => {
        return api.fetchApiMethod()
            .then(response => {
                    const modifiedResponse = response.map((it) =>
                        ({
                            value:  it.id,
                            label: it.description,
                        }))
                    return modifiedResponse
                }
            )
            .catch(error => Promise.reject(error))
    }
}