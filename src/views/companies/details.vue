<template>
    <div class="list" v-loading="loading.init">
        <div class="header" v-if="details.id">
            <el-button type="default"  @click="$router.push('/companies')">Все компании</el-button>
            <h1>{{details.name}}</h1>
        </div>
        <div class="body mt-3">
          <el-tabs type="border-card" class="mt-3">

            <el-tab-pane label="Детали">
              {{details}}
            </el-tab-pane>

            <el-tab-pane label="Базы">
              <el-button type="primary" size="mini" @click="openAddBaseModal"><i class="el-icon-plus"></i> Добавить базу</el-button>
              <el-table
                :data="bases"
                style="width: 100%"
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
                    prop="conf_name"
                    label="Конфигурация"
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
                        <div class="table-time">{{scope.row.create_ts | time}}</div>
                      </span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="Статус" width="160" sortable>
                  <template slot-scope="scope">
                      <bases-status :id="scope.row.status"/>
                    </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="Пользователи">
              <el-button type="primary" size="mini" @click="modal.addUser = true"><i class="el-icon-plus"></i> Добавить пользователя</el-button>
              <el-table
                :data="users"
                style="width: 100%"
                >
                <el-table-column
                    prop="id"
                    label="#"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="Имя"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="samaccountname"
                    label="Логин"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="Дата создания"
                    width="140"
                    >
                    <template slot-scope="scope">
                      <span class="cell__center">
                        <div>{{scope.row.create_ts | date}}</div>
                        <div class="table-time">{{scope.row.create_ts | time}}</div>
                      </span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="Статус" width="160" sortable>
                  <template slot-scope="scope">
                      <user-status :id="scope.row.status"/>
                    </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>

        <el-dialog
          :visible.sync="modal.addUser"
          width="550px"
          append-to-body 
          title="Добавление нового пользователя" 
          :show-close="false" 
          :close-on-click-modal="false" 
        >
          <div class="row" v-loading="loading.addUser">
            <div class="col-12">
              <div class="form-item">
                <label>Имя</label>
                <el-input 
                  v-model="addUserForm.name" 
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-item ">
                <label>Подключить базы</label>
                <el-select v-model="addUserForm.bases" multiple placeholder="Выберите">
                  <el-option
                    v-for="item in bases"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="col-12">
              <div class="form-item ">
                <el-checkbox v-model="addUserForm.share">Общий диск</el-checkbox>
              </div>
            </div>
            <div class="col-12">
              <el-button
                type="success"
                size="mini"
                @click="addUserSubmit"
              >
                Продолжить
              </el-button>
              <el-button
                type="link"
                size="mini"
                @click="resetAddUserForm"
              >
                Отмена
              </el-button>
            </div>
            
          </div>
        </el-dialog>

        <el-dialog
          :visible.sync="modal.addBase"
          width="550px"
          append-to-body 
          title="Добавление новой базы" 
          :show-close="false" 
          :close-on-click-modal="false" 
        >
          <div class="row" v-loading="loading.addBase">
            <div class="col-12">
              <div class="form-item">
                <label>Имя базы</label>
                <el-input 
                  v-model="addBaseForm.name" 
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-item ">
                <label>Конфигурация</label>
                <el-select v-model="addBaseForm.configuration" placeholder="Выберите">
                  <el-option
                    v-for="item in selects.configurations"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="col-12">
              <el-button
                type="success"
                size="mini"
                @click="addBaseSubmit"
              >
                Продолжить
              </el-button>
              <el-button
                type="link"
                size="mini"
                @click="resetAddBaseForm"
              >
                Отмена
              </el-button>
            </div>
            
          </div>
        </el-dialog>
    </div>
</template>

<script>
import {HTTP} from '@/http/common'
import basesStatus from '@/components/basesStatus.vue'
import userStatus from '@/components/userStatus.vue'

export default {
  components: {
    basesStatus,
    userStatus
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
          init: false,
          addUser: false,
          addBase: false,
        },
        modal: {
          addUser: false,
          addBase: false
        },
        details: {},
        bases: [],
        users: [],

        addUserForm: {
          name: '',
          share: true,
          bases: []
        },
        addBaseForm: {
          name: '',
          configuration: null
        },

        selects: {
          configurations: []
        }
      }
    },

    created() {
      this.init()
    },

    methods: {
        init() {
          this.loading.init = true
          let id = this.$router.currentRoute.params.id
          HTTP.get(`companies/${id}`)
              .then(res => {
                if (res.data.success) {
                  this.details = res.data.details
                  this.bases = res.data.bases
                  this.users = res.data.ad_users
                }
              })
              .catch(err => {
                throw new Error(err)
              })
              .finally(() => this.loading.init = false)
        },

        addUserSubmit() {
          this.loading.addUser = true
          HTTP.post(`ad_users/add`, {company_id: this.details.id, ...this.addUserForm})
              .then(res => {
                if (res.data.success) {
                  this.$notify({
                    title: 'Успешно',
                    message: 'Пользователь добавлен',
                    type: 'success'
                  })
                  this.resetAddUserForm()
                  this.init()
                } else {
                  this.$notify({
                    title: 'Ошибка получения данных',
                    message: res.message,
                    type: 'error'
                  })
                }
              })
              .catch(err => {
                throw new Error(err)
              })
              .finally(() => this.loading.addUser = false)
        },

        addBaseSubmit() {
          this.loading.addBase = true
          HTTP.post(`db/add`, {company_id: this.details.id, ...this.addBaseForm})
              .then(res => {
                if (res.data.success) {
                  this.$notify({
                    title: 'Успешно',
                    message: 'Задание поставлено в очередь',
                    type: 'success'
                  })
                  this.resetAddBaseForm()
                  this.init()
                } else {
                  this.$notify({
                    dangerouslyUseHTMLString: true,
                    title: 'Ошибка получения данных',
                    message: res.data.errors.join('<br>'),
                    type: 'error'
                  })
                }
              })
              .catch(err => {
                throw new Error(err)
              })
              .finally(() => this.loading.addBase = false)
        },

        async openAddBaseModal() {
          this.modal.addBase = true
          this.loading.addBase = true
          try {
            await this.initAddBase()
          } catch (err) {
            this.loading.addBase = false
            throw new Error(err)
          }
          this.loading.addBase = false
        },

        initAddBase() {
          return HTTP.get('db/init')
            .then(res => {
              if (res.data.success) {
                this.selects.configurations = res.data.configurations
              }
            })
        },

        resetAddUserForm() {
          this.modal.addUser = false
          this.addUserForm = {
            name: '',
            bases: [],
            share: true
          }
        },

        resetAddBaseForm() {
          this.modal.addBase = false
          this.addBaseForm = {
            name: ''
          }
        }
    }
}
</script>
