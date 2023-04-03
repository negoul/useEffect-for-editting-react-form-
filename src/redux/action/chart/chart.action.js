import api from "api/charts/charts.api";



export function fetchChartData(data) {
    return () => {
        return api.fetchChartsData(data)
            .then(response => response)
            .catch(error => Promise.reject(error))
    }
}

