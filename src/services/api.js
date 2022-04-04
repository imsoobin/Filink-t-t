import axios from "axios";
const API_URL = 'http://139.99.62.190:8000/api/v1/fund_projects/filter';

export const getData = (filter) => {
    return axios({
        url: API_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: filter
    })
}