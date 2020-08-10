<template>
    <div class="default-layout">
        <div class="sidebar">
            <el-menu class="el-menu-vertical-demo" :collapse="collapseMenu" :default-active="$route.path">
            
                <el-menu-item index="/dashboard" @click="$router.push('/dashboard')">
                    <font-awesome-icon icon="tachometer-alt" class="el-menu-icon"/>
                    <span slot="title">Главный экран</span>
                </el-menu-item>

                <el-submenu index="1">
                    <template slot="title">
                    <font-awesome-icon icon="desktop" class="el-menu-icon"/>
                    <span slot="title">Заявки</span>
                    </template>
                    <el-menu-item index="2" v-if="false">
                        <span slot="title">Мои заявки</span>
                    </el-menu-item>
                    <el-menu-item index="/tickets/list/11" @click="$router.push('/tickets/list/11')">
                        <span slot="title">Общая очередь</span>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <span slot="title">Все очереди</span>
                    </el-menu-item>
                </el-submenu>

                <el-menu-item index="4" @click="$router.push('/settings')">
                    <font-awesome-icon icon="cog" class="el-menu-icon"/>
                    <span slot="title">Настройки</span>
                </el-menu-item>

            </el-menu>

           
        </div>
        <div class="main-panel">
            <div class="top-nav-bar">
                <div class="menu-icon">
                    <font-awesome-icon icon="bars" @click="toggleSidebar"/>
                </div>
                <div class="agent-name">
                    {{agent.name}}<br>
                    <span class="agent-email">{{agent.mail}}</span>
                </div>
                <div>
                    <a href="#" @click.prevent="logout"><font-awesome-icon icon="sign-out-alt"/></a>
                </div>
            </div>
            <div class="content">
                <fade-transition :duration="200" mode="out-in">
                    <router-view></router-view>
                </fade-transition>
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
        agent() {
            return this.$store.getters.agent
        }
    },

    methods: {
        toggleSidebar() {
            let currentStatus = document.body.classList.contains('sidebar-opened')
          
            if (currentStatus) {
                document.body.classList.remove('sidebar-opened')
                cookie.delete('sidebar')
                this.collapseMenu = true

            } else {
                document.body.classList.add('sidebar-opened')
                cookie.set('sidebar', '1', { expires: '1Y' })
                this.collapseMenu = false
            }
        },

        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/login");
        }
    },
    created() {
        if (!cookie.get('sidebar')) {
            document.body.classList.remove("sidebar-opened");
            this.collapseMenu = true
        } else {
            document.body.classList.add("sidebar-opened");
            this.collapseMenu = false
        }
    }
}

</script>



<style lang="scss">

    $sidebarWidth: 64px;

    .default-layout {
        position: relative;
        max-width: 100%;
        min-height: 100vh;
        padding-left: $sidebarWidth;
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

        .sidebar {
            display: block;
            z-index: 2;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            width: $sidebarWidth;
            height: 100vh;
            background: #fff;
            color:#fff;
            -webkit-box-shadow: 5px 0px 18px -6px rgba(0,0,0,0.4);
            -moz-box-shadow: 5px 0px 18px -6px rgba(0,0,0,0.4);
            box-shadow: 5px 0px 18px -6px rgba(0,0,0,0.4);
            transition: width 0.3s;

            .el-menu-icon {
                margin-right: 10px;
            }

            .options-button {
                position: absolute;
                bottom: 0;
                width: 100%;
                padding: 20px;
                text-align: center;
                background: #444;
                transition: 0.3s;

                &:hover {
                    cursor: pointer;
                    background: #333;
                }
            }
        }

        .main-panel {
            //padding-top: 100px;
        }

        .top-nav-bar {
            position: fixed;
            top: 0;
            right: 0;
            left: 64px;
            height: 70px;
            background: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            padding-right: 20px;

            a {
                color: #000;
            }

            .agent-name {
                margin-right: 30px;
                font-size: 14px;
                font-weight: 300;
            }

            .agent-email {
                font-size: 11px;
                opacity: 0.7;
            }
        }

        .content {
            padding: 20px;
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
