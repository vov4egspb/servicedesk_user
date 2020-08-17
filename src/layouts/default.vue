<template>
    <div class="default-layout">
        <div class="main-panel">
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
                                <div class="d-flex">
                                    <div class="agent-name">
                                        {{user.name}}<br>
                                        <span class="agent-email">{{user.email}}</span>
                                    </div>
                                    <div>
                                        <a href="#" @click.prevent="logout"><font-awesome-icon icon="sign-out-alt"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="content">
                            <fade-transition :duration="200" mode="out-in">
                                <router-view></router-view>
                            </fade-transition>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>

import {FadeTransition} from 'vue2-transitions'
import cookie from 'vue-cookie'

export default {
    components: {
        FadeTransition
    },

    data() {
        return {
            sidebarVisible: true,
            collapseMenu: false
        }
    },

    computed:{
        user() {
            return this.$store.getters.user
        }
    },

    methods: {
      

        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/login");
        }
    },
    created() {
       
    }
}

</script>



<style lang="scss">


    .default-layout {
        position: relative;
        max-width: 100%;
        min-height: 100vh;
        padding-top: 80px;
        

        .menu-icon {
            flex-grow: 1;
            font-size: 24px;

            svg {
                &:hover {
                    cursor: pointer;
                }
            }
        }

       
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

            a {
                color: #fff;
            }

            .agent-name {
                margin-right: 30px;
                font-size: 14px;
                font-weight: bold;
                line-height: 16px;
            }

            .agent-email {
                font-size: 11px;
                opacity: 0.7;
                font-weight: 400;
            }
        }

        .content {
            //padding: 20px;
        }

    }

    .sidebar-opened {

        .default-layout {
            padding-left: 300px;

            .sidebar {
                width: 300px;
            }

            .top-nav-bar {
                left: 300px;
            }
        }
    }

    .el-menu {
        border-right: 0 !important;
    }

    .el-menu-item {
        font-weight: 300;
        
        &.is-active {
            background: #2ec4b6;
            color:#fff !important;
        }
    }

</style>
