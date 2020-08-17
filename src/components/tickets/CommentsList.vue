<template>
    <div class="list-comments">
        <div class="comments-control" v-if="!disabled">
            <el-button 
                type="success" 
                size="small" 
                @click="addCommentVisible = !addCommentVisible">
                Добавить комментарий
            </el-button>
        </div>
        <div v-if="data.length > 0">
            <comment 
                v-for="comment in data" 
                :key="comment.id" 
                :data="comment"
                ref="collapsible"
            />   
        </div> 
        <div class="no-data" v-else>Нет комментариев</div>

        <el-dialog 
            width="60%" 
            append-to-body 
            title="Новый комментарий" 
            :close-on-click-modal="false" 
            :show-close="false" 
            :visible.sync="addCommentVisible" 
            custom-class="add-comment-dialog"
        >
            
            <div class="row">
                <div class="col-12">
                </div>

                <div class="col-12">
                    <div class="form-item comment-field" :class="{error: getError('text')}">
                        <label>Ваш комментарий</label>
                        <el-input 
                            name="text"
                            v-validate="'required'"
                            type="textarea" 
                            v-model="form.text" 
                            :rows="5" 
                            @paste.native="onPasteImage"
                        />
                        <span class="error-message" v-if="getError('text')">{{getError('text')}}</span>
                    </div>
                </div>

                
                <div class="col-12 d-flex align-items-center justify-content-between">
                    
                    <el-button size="small" @click="openFileUpload"><font-awesome-icon icon="paperclip"/> Прикрепить файлы</el-button>
                </div>

                <div class="col-12 files-list" v-if="form.attachments.length > 0">
                    <h5>Вложения</h5>
                    <ul>
                        <li v-for="(item, index) in form.attachments" :key="index">
                            {{item.name}} 
                            <span class="remove-file" @click="removeFilesAttach(index)">&times;</span>
                        </li>
                    </ul>
                </div>

                <div class="col-12 mt-3" v-if="form.imagesAttachments.length > 0">
                    <h5>Изображения</h5>
                    <div class="image-attach-list">
                        <div class="item" v-for="(src, index) in form.imagesAttachments" :key="index">
                            <img :src="src" alt="">
                            <span class="remove-image" @click="removeImageAttach(index)">&times;</span>
                        </div>
                    </div>
                </div>

                
            </div>

            <div class="row add-ticket-footer">
               <div class="col-12">
                    <el-button type="success" size="mini" :loading="loading.addComment" @click="addCommentSubmit">Добавить</el-button>
                    <el-button type="link" size="mini" @click="close">Отмена</el-button>
                </div>
            </div>
            <input type="file" id="file" ref="file" @change="handleFileUpload" multiple/>
        </el-dialog>
    </div>
</template>

<script>

import {HTTP} from '@/http/common'
import comment from '@/components/tickets/Comment'

export default {
    components: {
        comment
    },

    props: {
        ticketId: String,
        data: Array,
        disabled: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            addCommentVisible: false,
            loading: {
                commentInit: false,
                addComment: false
            },
            tpl:[],
            form: {
                text: '',
                type: '1',
                imagesAttachments: [],
                attachments: []
            }
        }
    },

    computed: {
        listCommentTpl() {
            return this.$store.getters.commentTpl
        }
    },

    methods: {

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

        removeImageAttach(index) {
            this.form.imagesAttachments.splice(index, 1)
        },

        removeFilesAttach(index) {
            this.form.attachments.splice(index, 1)
        },

        selectTplComment(text) {
            this.form.text = text
        },

        close() {
            this.form = {
                text: '',
                type: '1',
                imagesAttachments: [],
                attachments: []
            }
            this.$nextTick(() => {
                this.$validator.reset()
            })
            this.addCommentVisible = false
            this.$refs.file.value = ''
        },

        addCommentSubmit() {
            this.$validator.validateAll().then(async isValid => {

                if (!isValid) {
                    return
                }

                this.loading.addComment = true

                const formData = new FormData()

                formData.append('text', this.form.text)
                formData.append('type', this.form.type)

                this.form.attachments.forEach(item => {
                    formData.append('files[]', item.file, item.name);
                })

                this.form.imagesAttachments.forEach(item => {
                    formData.append('images[]', item);
                })

                HTTP.post(`tickets/add_comment/${this.ticketId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(res => {
                        if(res.data.success) {
                            this.$emit('updateComment')
                            this.loading.addComment = false
                            this.close()
                        }
                    })
                    .catch(err => console.log(err))
                    .finally(() => this.loading.addComment = false)
            })
        },

        getError(fieldName) {
            return this.errors.first(fieldName)
        },
        
    }
}

</script>

<style lang="scss">

    .image-attach-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;

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

    .list-comments {
        padding: 0 !important;

        .add-comment-btn {
            height: 40px;
            border-radius: 20px;
            border: none;
            outline: none;
            background: #2ec4b6;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.3s;
            font-size: 12px;
            padding: 0 15px;
            margin: 10px auto;

            svg {
                font-size: 16px;
                margin-right: 5px;
            }

            &:hover {
                cursor: pointer;
                background:darken( #2ec4b6, 5%);
            }
        }

        .comments-control {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-bottom: 15px;

            a {
                font-size: 11px;
                color: #3d3d3d;

                &:last-child::before {
                    content: '/';
                    padding: 0 2px;
                    opacity: 0.5;
                }

                &:hover {
                    color:#2ec4b6;
                }
            }
        }

        .no-data {
            font-size: 14px;
            opacity: 0.5;
        }
    }

    .add-comment-dialog {

        h5 {
            font-size: 16px;
            color: #000;
            font-weight: bold;
        }

        #file {
            display: none;
        }

        .files-list {
            margin-top: 20px;
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


        .el-radio-group {
            label {
                margin-bottom: 0;
            }
        }

        .comment-field {
            position: relative;

            .tpl-select {
                position: absolute;
                right: 0;
                top: -15px;

                .el-dropdown-link {
                    font-size: 12px;
                }
            }
        }

        .add-ticket-footer {
            margin-top: 20px;
        }
    }
</style>
