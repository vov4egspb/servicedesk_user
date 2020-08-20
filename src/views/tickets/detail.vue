<template>
    <div class="detail" v-loading="loading.init">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Список заявок</el-breadcrumb-item>
            <el-breadcrumb-item>#{{detail.id}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header-wrapper">
            <div class="header">
                <div>
                    <h1>#{{detail.id}}: {{detail.name}}</h1>
                    <span class="ticket-date">{{detail.create_time}}</span>
                </div>
                <div class="d-flex align-items-start">
                <ticket-status type="bage" :id="detail.status"/>
                </div>
            </div>
            <div class="info-wrapper">
                <div class="agent">
                    Очередь: <span v-if="detail.queue_name">{{detail.queue_name}}</span><template v-else>нет</template>
                </div>
                <div class="agent ml-3">
                    Исполнитель: <span v-if="detail.agent_name">{{detail.agent_name}}</span><template v-else>нет</template>
                </div>
            </div>
        </div>
        <div class="body mt-3">
            <el-tabs type="border-card">
                <el-tab-pane label="Текст обращения">
                    <attachments-list :data="attachments" />
                    <div v-if="detail.type == 1" class="text" v-html="detail.text"></div>
                    <div v-else class="text">
                        <div>
                            <div><b>Обоснование необходимости доработки:</b></div>
                            <div class="mt-1"><p>{{detail.reason}}</p></div>
                        </div>
                        <div>
                            <div><b>Описание задачи:</b></div>
                            <div class="mt-1"><p>{{detail.text}}</p></div>
                        </div>
                        <div>
                            <div><b>Результат доработки:</b></div>
                            <div class="mt-1"><p>{{detail.result_dev}}</p></div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label">
                        Комментарии
                        <el-badge v-if="comments.length" type="warning" :value="comments.length" class="item"/>
                    </span>
                    <comments-list 
                        :ticketId="detail.id" 
                        :data="comments" 
                        :disabled="closed"
                        @updateComment="init"
                    />
                </el-tab-pane>
                <el-tab-pane label="История">
                    <events-list :data="events" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/http/common'
import config from '@/config'
import ticketStatus from '@/components/tickets/ticketStatus.vue'
import CommentsList from '@/components/tickets/CommentsList.vue'
import AttachmentsList from '@/components/tickets/AttachmentsList.vue'
import EventsList from '@/components/tickets/EventsList.vue'

export default {
    components: {
        ticketStatus,
        CommentsList,
        AttachmentsList,
        EventsList
    },
   
    data() {
        return {
           
            loading: {
                init: false
            },
            detail: {},
            comments: [],
            events: [],
            attachments: [],
            
            selects: {
                statuses: config.statusesList
            }
        }
    },

    computed: {
        closed() {
            return ['5','6'].includes(this.detail.status) 
        },
    },

    created() {
        this.init()
    },

    methods: {
        init() {
            const id = this.$router.currentRoute.params.ticketId
            this.loading.init = true
            HTTP.get(`tickets/detail/${id}`)
                .then(res => {
                    if (res.data.success) {
                        this.detail = res.data.ticket
                        this.comments = res.data.comments
                        this.events = res.data.events
                        this.attachments = res.data.attachments
                    } else {
                        this.$router.push('/tickets/list')
                    }
                })
                .catch(err => {
                    throw new Error(err)
                })
                .finally(() => this.loading.init = false)
        },
       
    }
}
</script>

<style lang="scss">

    .detail {
        position: relative;

        .ticket-text {
            font-size: 14px;
        }


        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;

            .ticket-date {
                margin-top: 5px;
                font-size: 14px;
            }

            h1 {
                font-size: 32px;
                padding: 0;
                margin: 0;
            }
        }

        .header-wrapper {
            padding: 15px;
            background: #f5f7fa;
            border: 1px #e4e7ed solid;
            border-radius: 5px;
            margin-top: 20px;
        }

       

        .body {
            margin-top: 10px;

            .text {
                margin-top: 10px;
                font-size: 14px;
            }

        }

        .el-breadcrumb__separator {
            font-size: 11px;
        }

        .info-wrapper {
            padding: 10px 0;
            display: flex;

            .agent {
                font-size: 14px;
                span {
                    margin-left: 5px;
                    padding: 3px 11px 4px 11px;
                    background: #4c4c4c;
                    color: #fff;
                    font-size: 12px;
                    border-radius: 5px;
                }
            }
        }

        .el-badge__content {
            background-color: #67c23a;
            border-radius: 10px;
            color: #FFF;
            display: inline-block;
            font-size: 10px;
            height: 18px;
            line-height: 16px;
            padding: 0 6px;
            text-align: center;
            white-space: nowrap;
            border: 1px solid #FFF;
        }

        


    }

</style>