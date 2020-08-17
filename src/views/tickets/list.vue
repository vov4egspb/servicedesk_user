<template>
    <div class="list" v-loading="loading.init">
        <div class="header">
            <h1>Ваши заявки</h1>
            <div class="d-flex align-items-center">
                <span :class="['filter-btn mr-4']" @click="show.filter = !show.filter">
                    <font-awesome-icon icon="filter"/>
                    {{show.filter ? 'скрыть' : 'показать'}} фильтр
                </span>
                <el-button type="success" @click="$router.push('/tickets/new')">Создать заявку</el-button>
            </div>
        </div>
        <div class="filter-wrapper" v-if="show.filter">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-item">
                        <label>Номер</label>
                        <el-input v-model="filter.id" type="number" @keyup.native.enter="init"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-item">
                        <label>Тема</label>
                        <el-input v-model="filter.name" @keyup.native.enter="init"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-item">
                        <label>Статус</label>
                        <el-select v-model="filter.status" clearable>
                            <el-option
                            v-for="item in selects.statuses"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="form-item">
                        <label>Период</label>
                        <el-date-picker
                            v-model="filter.date"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="от"
                            end-placeholder="до">
                        </el-date-picker>
                    </div>
                </div>
                <div class="col-12">
                    <el-button size="small" type="success" @click="init">Поиск</el-button>
                    <el-button size="small" @click="reset">Сброс</el-button>
                </div>
            </div>
        </div>
        <div class="body">
            <el-table
                :data="tickets"
                @row-click="openDetail"
                style="width: 100%"
                >
                <el-table-column
                    prop="id"
                    label="Номер"
                    width="110">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="Название"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="queue_name"
                    label="Очередь"
                    >
                </el-table-column>
                <el-table-column
                    prop="agent_name"
                    label="Исполнитель"
                    >
                    <template slot-scope="scope">
                        <span class="cell__center">
                            {{scope.row.agent_id ? scope.row.agent_name : '-'}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="Дата создания"
                    width="130"
                    >
                    <template slot-scope="scope">
                        <span class="cell__center">
                            <div>{{scope.row.create_time | date}}</div>
                            <div class="time">{{scope.row.create_time | time}}</div>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="Статус" width="100" sortable>
                    <template slot-scope="scope">
                        <span class="cell__center"><ticket-status type="bage" :id="scope.row.status"/></span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="mt-3"
                v-if="tickets.length > 0"
                background
                :page-size="pagination.perPage"
                @current-change="changePage"
                
                layout="prev, pager, next"
                :total="pagination.total">
            </el-pagination>
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
        
    },

    filters: {
        time: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.split(' ')[1]
        },

        date: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.split(' ')[0]
        }
    },
    data() {
        return {
            show: {
                filter: false
            },
            loading: {
                init: false
            },
            tickets: [],

            pagination: {
                total: null,
                currentPage: 1,
                perPage: 20,
                limit: null
            },

            filter: {
                id: null,
                name: '',
                status: null,
                period: []
            },

            selects: {
                statuses: config.statusesList
            }
        }
    },

    created() {
        this.init()
    },

    methods: {
        init() {
            this.loading.init = true
            HTTP.post('tickets/list_tickets', {...this.filter, ...this.pagination})
                .then(res => {
                    if (res.data.success) {
                        this.tickets = res.data.tickets
                        this.pagination.total = res.data.count
                    }
                })
                .catch(err => {
                    throw new Error(err)
                })
                .finally(() => this.loading.init = false)
        },

        reset() {
            this.show.filter = false
            this.filter = {
                id: null,
                name: '',
                status: null,
                period: []
            }
            this.init()
        },

        changePage(page) {
            this.pagination.currentPage = page
            this.init()
        },

        openDetail(row) {
            this.$router.push(`/tickets/detail/${row.id}`)
        },
    }
}
</script>

<style lang="scss">

    .list {
        position: relative;


        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;

            h1 {
                font-size: 32px;
            }
        }

        .filter-btn {
            font-size: 14px;
            font-weight: bold;

            &:hover {
                color: #67c23a;
                cursor: pointer;
            }

             &.active {
                color: #67c23a;
            }

            svg {
                font-size: 11px;
            }
        }

        .filter-wrapper {
            background: #f3f3f3;
            border-radius: 5px;
            padding: 20px;
        }

        .body {
            margin-top: 10px;

            table {
                .time {
                    font-size: 12px;
                    opacity: 0.5;
                }
            }

            .el-table__row {
                &:hover {
                    cursor: pointer;
                }
            }

        }

        .el-pagination {
            padding: 0;
            margin: 0;
        }

        .el-pagination.is-background .el-pager li:not(.disabled):hover {
            color: #1a1a46;
        }

        .el-pagination.is-background .el-pager li:not(.disabled).active {
            background-color: #1a1a46;
            color: #FFF;
        }

        .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
            background-color: #1a1a46;
            color: #FFF;
        }

        
        .el-pagination.is-background .el-pager li {
           border-radius: 5px;
        }

        .el-pager li {
            font-size: 11px;
        }

        


    }

</style>