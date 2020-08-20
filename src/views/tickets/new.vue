<template>
    <div class="create-ticket">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Список заявок</el-breadcrumb-item>
            <el-breadcrumb-item>Создание заявки</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header">
            <h1>Создание новой заявки</h1>
        </div>
        <div class="body mt-3">
           <div class="create-form mt-4">
                <div class="row" v-if="allowDevTicket">
                    <div class="col-12 col-md-4">
                        <div class="form-item">
                            <label>Тип заявки</label>
                            <el-select v-model="form.type" @change="changeType">
                                <el-option
                                v-for="item in selects.types"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-12">
                        <div :class="['form-item', {error: getError('title')}]">
                            <label>Тема заявки</label>
                            <el-input 
                                name="title"
                                v-model="form.name"
                                v-validate="'required'"
                                data-vv-as="Тема"
                            />
                            <div v-if="getError('title')" class="error-message">{{getError('title')}}</div>
                        </div>
                    </div>
                </div>

                <div class="row" v-if="isDevTicket && allowDevTicket && false">
                    <div class="col-12">
                        <div :class="['form-item', {error: getError('division_id')}]">
                            <label>Отдел</label>
                            <el-select
                                v-model="form.division_id"
                                name="division_id"
                                v-validate="'required'"
                                data-vv-as="Отдел"
                                filterable
                                remote
                                placeholder="Поиск"
                                reserve-keyword
                                :remote-method="getDivisionsList"
                                :loading="loading.divisions">
                                <el-option
                                    v-for="item in selects.divisions"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.id">
                                    <span class="division-code">({{item.code}})</span> {{item.label}}
                                </el-option>
                            </el-select>
                            <div v-if="getError('division_id')" class="error-message">{{getError('division_id')}}</div>
                        </div>
                    </div>
                </div>

                <div class="row" v-if="isDevTicket && allowDevTicket">
                    <div class="col-12">
                        <div :class="['form-item', {error: getError('reason')}]">
                            <label>Обоснование</label>
                            <el-input
                                type="textarea"
                                :rows="5"
                                placeholder=""
                                v-model="form.reason"
                                v-validate="'required'"
                                data-vv-as="Обоснование"
                                name="reason"
                            >
                            </el-input>
                            <div v-if="getError('reason')" class="error-message">{{getError('reason')}}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div :class="['form-item', {error: getError('text')}]">
                            <label>Описание</label>
                            <el-input
                                type="textarea"
                                :rows="10"
                                placeholder=""
                                v-model="form.text"
                                v-validate="'required'"
                                data-vv-as="Текст"
                                name="text"
                                @paste.native="onPasteImage"
                            >
                            </el-input>
                            <div v-if="getError('text')" class="error-message">{{getError('text')}}</div>
                        </div>
                    </div>
                </div>

                <div class="row" v-if="isDevTicket && allowDevTicket">
                    <div class="col-12">
                        <div :class="['form-item', {error: getError('result_dev')}]">
                            <label>Результат доработки</label>
                            <el-input
                                type="textarea"
                                :rows="5"
                                placeholder=""
                                v-model="form.result_dev"
                                v-validate="'required'"
                                data-vv-as="Результат доработки"
                                name="result_dev"
                            >
                            </el-input>
                            <div v-if="getError('result_dev')" class="error-message">{{getError('result_dev')}}</div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <el-button size="small" type="info" @click="openFileUpload"><font-awesome-icon icon="paperclip"/> Прикрепить файлы</el-button>
                    </div>
                </div>
                <div class="row" v-if="form.imagesAttachments.length > 0">
                    <div class="col-12 mt-3">
                        <h5>Изображения</h5>
                        <div class="image-attach-list">
                            <div class="item" v-for="(src, index) in form.imagesAttachments" :key="index">
                                <img :src="src" alt="">
                                <span class="remove-image" @click="removeImageAttach(index)">&times;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row  mt-3" v-if="form.attachments.length > 0">
                    <div class="col-12">
                        <h5>Вложения</h5>
                        <div class="files-list">
                            <ul>
                                <li v-for="(item, index) in form.attachments" :key="index">
                                    {{item.name}} 
                                    <span class="remove-file" @click="removeFilesAttach(index)">&times;</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <el-button type="success" @click="submit">Создать</el-button>
                    </div>
                </div>
                <input type="file" id="file" ref="file" @change="handleFileUpload" multiple/>
            </div>
        </div>
    </div>
</template>

<script>
import {HTTP} from '@/http/common'
import config from '@/config'
import { forms } from '@/mixins'

export default {
    mixins: [forms],
    components: {
    },
   
    data() {
        return {
           
            loading: {
                init: false,
                divisions: false,
            },
            form: {
                type: 1,
                division_id: null,
                name: '',
                text: '',
                reason: null,
                result_dev: null,
                queue_id: '11',
                priority: 2,
                attachments: [],
                imagesAttachments: []
            },
            selects: {
                types: [
                    {id: 1, label: 'Стандартная'},
                    {id: 2, label: 'На доработку'},
                ],
                users: [],
                agents: [],
                queues: [],
                priority: [
                    {id: 1, name: 'Низкий'},
                    {id: 2, name: 'Средний'},
                    {id: 3, name: 'Высокий'},
                ]
            }
        }
    },

    computed: {

        isDevTicket() {
            return this.form.type == 2
        },

        allowDevTicket() {
            return this.$store.getters.isAllowDevTicket
        }
        
    },

    methods: {

        submit() {
            this.$validator.validateAll().then(async isValid => {
                if (isValid) {
                    this.loading.init = true

                    const formData = new FormData()

                    for (const field in this.form) {
                        if (field !== 'attachments' && field !== 'imagesAttachments') {
                        formData.append(field, this.form[field])
                        }
                    }

                    this.form.attachments.forEach(item => {
                        formData.append('files[]', item.file, item.name);
                    })

                    this.form.imagesAttachments.forEach(item => {
                        formData.append('images[]', item);
                    })

                    HTTP.post('tickets/create', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(res => {
                            if (res.data.success) {
                                this.$router.push(`/tickets/detail/${res.data.id}`)
                            } else {
                                this.$notify({
                                    title: 'Ошибка',
                                    dangerouslyUseHTMLString: true,
                                    message: res.data.message,
                                    type: 'error'
                                })
                            }
                        })
                        .catch(err => {
                            throw new Error(err)
                        })
                        .finally(() => this.loading.init = false)
                }
            })

        },

        onPasteImage(e) {
            const items = e.clipboardData.items

            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const blob = items[i].getAsFile()
                    const URLObj = window.URL || window.webkitURL
                    const source = URLObj.createObjectURL(blob)
                   
                    this.toDataURL(source, dataUrl => {
                        this.form.imagesAttachments.push(dataUrl)
                    })
                }
            }
        },

        removeImageAttach(index) {
            this.form.imagesAttachments.splice(index, 1)
        },

        removeFilesAttach(index) {
            this.form.attachments.splice(index, 1)
        },

        toDataURL(url, callback) {
            const xhr = new XMLHttpRequest()
            xhr.onload = function() {
                const reader = new FileReader()
                reader.onloadend = function() {
                callback(reader.result)
                }
                reader.readAsDataURL(xhr.response)
            };
            xhr.open('GET', url)
            xhr.responseType = 'blob'
            xhr.send()
        },

        openFileUpload() {
            this.$refs.file.click()
        },

        handleFileUpload() {
            this.$refs.file.files.forEach(file => {
                this.form.attachments.push({
                    name: file.name,
                    file: file
                })
            })
        },

        getDivisionsList(q) {
            this.loading.divisions = true
            return new Promise((resolve, reject) => {
                HTTP.post(`tickets/get_divisions_list/`, {q})
                    .then(res => {
                        this.selects.divisions = res.data.divisions
                        resolve()
                    })
                    .catch(err => reject(err))
                    .finally(() => this.loading.divisions = false)
            })
        },

        changeType() {
            this.$nextTick(() => {
                this.$validator.reset()
            })
        }


    }
}
</script>

<style lang="scss">
    .create-ticket {

        h1 {
            font-size: 32px;
            margin-top: 20px;
        }
        

        .image-attach-list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            padding: 20px 20px 10px 20px;
            background: #fbfbfb;
            border-radius: 5px;

        .item {
            position: relative;
            margin-right: 10px;
            margin-bottom: 10px;

            img {
                height: 100px;
                border-radius: 5px;
            }

            .remove-image {
                position: absolute;
                top: 5px;
                right: 5px;
                width: 15px;
                height: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                background: #dc3545;
                border-radius: 50%;
                transition: 0.3s;

                &:hover {
                    cursor: pointer;
                    background: red;
                }
            }

        }
        
        
    }

    

    #file {
            display: none;
        }

        .files-list {
            
            padding: 20px;
            background: #fbfbfb;
            border-radius: 5px;
            ul {
                margin: 0;
                padding: 0;
                list-style: none;
                
                li {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #e6e6e6;
                    padding: 5px;
                    transition: 0.1s;

                    &:last-child {
                        border-bottom: none;
                    }

                    &:hover {
                        background: #f5f5f5;
                    }
                }
            }

            .remove-file {
                width: 15px;
                height: 15px;
                font-size: 11px;
                border-radius: 50%;
                background: #dc3545;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 5px;

                &:hover {
                    cursor: pointer;
                    background: darken(#dc3545, 5%);
                }


            }
        }


    }
</style>