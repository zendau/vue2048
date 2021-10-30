import axios from "axios"

const API_URL = process.env.VUE_APP_API_URL

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export default $api