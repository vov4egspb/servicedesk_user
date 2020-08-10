import { HTTP } from '@/http/common'
import cookie from 'vue-cookie'

export default {

    state: {
        user: {
            name: '',
            mail: '',
            superuser: null
        },
        token: cookie.get('token') || null
    },

    mutations: {
        updateToken(state, data) {
            cookie.set('token', data.access, { expires: '1Y' })
            cookie.set('refreshToken', data.refresh_token, { expires: '1Y' })
            state.token = data.access
        },

        updateUser(state, data) {
            state.user = data
        },

        logout(state) {
            cookie.delete('token');
            cookie.delete('refreshToken');
            state.token = null
        }
    },

    actions: {

        login: ({ commit }, data) => {
            return new Promise((resolve, reject) => {
                HTTP.post('auth/login', data)
                    .then(response => {
                        if (response.data.success) {
                            commit('updateToken', response.data)
                        }
                        resolve(response.data)
                    })
                    .catch(err => reject(err) )
            })
        },

        updateToken: ({ commit, dispatch}) => {
            return new Promise( resolve => {
                const refreshToken = cookie.get('refreshToken');
                HTTP.post('auth/refreshtoken', { refresh_token: refreshToken } )
                    .then( response => {
                        if(response.data.success) {
                            commit('updateToken', response.data)
                            resolve(response.data)
                        } else {
                            dispatch('logout')
                        }
                    })
                    .catch( error => {
                        console.log(error)
                        dispatch('logout')
                    })
            })
        },

        initUser: ({ commit, state }) => {
            //if (state.token) {
                return new Promise((resolve, reject) => {
                    HTTP.get('common/init')
                        .then((response) => {
                            commit('updateUser', response.data.agent)
                            resolve()
                        })
                        .catch((error) => {
                            console.log(error)
                            reject(error)
                        })
                  resolve()
                })
            //}
        },

        logout: ({ commit }) => {
            commit('logout')
        }

    },

    getters: {
        user: state => state.user,
        isLogged: state => state.token ? true : false
    }

}