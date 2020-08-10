<template>
    <div class="public-layout">
        <fade-transition :duration="200" mode="out-in">
            <router-view></router-view>
        </fade-transition>
    </div>
</template>

<script>

import cookie from 'vue-cookie'
import {FadeTransition} from 'vue2-transitions'

export default {
    components: {
        FadeTransition
    },

    data() {
        return {
            loading: false
        }
    },

    computed: {
        currentLang() {
            return cookie.get('lang') === 'ru' ? 'Русский' : 'English'
        }
    },

    methods: {
        changeLocale(locale) {
            this.loading = true
            cookie.set('lang', locale, { expires: '1Y' })
            setTimeout(() => {
                document.location.reload(true);
            }, 200)
        },
    }
}
</script>

<style lang="scss">

    body {
        padding: 0;
        margin: 0;
    }

    .public-layout {
        position: relative;
        background-image: url(/images/bg.jpg);
        background-position: center center;
        background-size: cover;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;

        &:after {
            z-index: 0;
            content: "";
            position: absolute;
            top:0 ;
            left:0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
        }
    }

</style>
