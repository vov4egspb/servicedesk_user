<template>
    <div class="public-layout">
        <div class="top-nav-bar">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="logo-wrapper">
                                <img src="/images/logo.png" alt="">
                                <span>
                                    SERVICEDESK
                                    <div class="text">
                                        АО "УК "Старт"
                                    </div>    
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
}
</script>

<style lang="scss">

    body {
        padding: 0;
        margin: 0;
    }

    .public-layout {
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        //background: #000;

        .top-nav-bar {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            height: 60px;
            background: #1a1a46;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            padding-right: 20px;
            color: #fff;

            .logo-wrapper {
                display: flex;
                align-items: center;
                font-weight: bold;
                font-size: 24px;
                line-height: 22px;

                img {
                    height: 40px;
                    margin-right: 10px;
                }

                span {
                    padding-top: 4px;
                    .text {
                        font-size: 11px;
                        opacity: 0.7;
                        font-weight: 300;
                    }
                }
            }
        }

        
    }

</style>
