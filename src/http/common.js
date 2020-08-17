import axios from 'axios'
import cookie from 'vue-cookie'
import store from '@/store'

let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(access_token) {
    subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber(callback) {
    subscribers.push(callback)
}

const HTTP = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://api01.start.local/users/v1/' : 'http://api01.start.local/users/v1/',
})


// Request interceptors
HTTP.interceptors.request.use(
    (config) => {
        var token = cookie.get('token')
        if (token) {
            config.headers['Authorization'] = token
        }
        return Promise.resolve(config)
    },
    (error) => {
        return Promise.reject(error)
    }
)

//response interceptors
HTTP.interceptors.response.use(function (response) {
    return response
}, function (error) {
    const { config, response: { status } } = error

    const originalRequest = config

    if (status === 401) {
        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true

            store.dispatch('updateToken').then((response) => {
                isAlreadyFetchingAccessToken = false
                onAccessTokenFetched(response.access)
            })
        }
        const retryOriginalRequest = new Promise((resolve) => {
            addSubscriber(access_token => {
                originalRequest.headers.Authorization = access_token
                resolve(HTTP(originalRequest))
            })
        })
        return retryOriginalRequest
    }
        
    if (status === 403) {
        store.dispatch('logout')
    }
        


    return Promise.reject(error)
})


export { HTTP }
