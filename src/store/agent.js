import { HTTP } from '@/http/common'

export default {

    state: {
        commentTpl: []
    },

    mutations: {
        updateCommentTpl(state, data) {
            state.commentTpl = data
        }
    },

    actions: {

        getCommentTpl: ({ commit }, data) => {
            HTTP.get('agents/get_comment_tpl')
                .then(response => {
                    if (response.data.success) {
                        commit('updateCommentTpl', response.data.tpl)
                    }
                })
                .catch(err => console.log(err))
        }

    },

    getters: {
        commentTpl: state => state.commentTpl
    }

}