<template>
    <div class="list" v-loading="loading.init">
        <div class="header">
            <h1>Компании</h1>
        </div>
        <div class="body">
            <el-table
                :data="companies"
                style="width: 100%"
                @row-click="openDetail"
                >
                <el-table-column
                    prop="id"
                    label="#"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="Название"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="inn"
                    label="ИНН"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="Адрес"
                    min-width="180">
                </el-table-column>
                
                <el-table-column
                    prop="create_time"
                    label="Дата создания"
                    width="140"
                    >
                    <template slot-scope="scope">
                      <span class="cell__center">
                        <div>{{scope.row.create_ts | date}}</div>
                        <div class="time">{{scope.row.create_ts | time}}</div>
                      </span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="Статус" width="160" sortable>
                  <template slot-scope="scope">
                      <company-status :id="scope.row.status"/>
                    </template>
                </el-table-column>
            </el-table>
            
        </div>

    </div>
</template>

<script>
import {HTTP} from '@/http/common'
import companyStatus from '@/components/companyStatus.vue'

export default {
  components: {
    companyStatus
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
        loading: {
          init: false
        },
        companies: [],
      }
    },

    created() {
      this.init()
    },

    methods: {
        init() {
          this.loading.init = true
          HTTP.post('companies')
              .then(res => {
                if (res.data.success) {
                  this.companies = res.data.companies
                }
              })
              .catch(err => {
                throw new Error(err)
              })
              .finally(() => this.loading.init = false)
        },

        openDetail(row) {
          this.$router.push(`/companies/details/${row.id}`)
        }
    }
}
</script>
