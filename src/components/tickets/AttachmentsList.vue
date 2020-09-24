<template>
    <div class="list-attachments" v-if="data.length > 0">
        
        <ul>
            <li v-for="item in data" :key="item.id">
                <div v-if="item.type == 1">
                    <img :src="`${path}/${item.filename}`" v-img>
                </div>
                <div v-else>
                    <a :href="`${path}/${item.filename}`" target="_blank">
                        <img class="ext-icons" :src="`/images/icons/${getExtIcon(item.ext)}.png`">
                    </a>
                </div>
                <div class="filename">
                    <a :href="`${path}/${item.filename}`" target="_blank">{{item.filename}}</a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'AttachmentsList',
    props: {
        data: Array,
    },

    data() {
      return {
        path: process.env.NODE_ENV === 'development' ? 'http://api01.start.local/uploads/attachments' : 'http://api.spb-buh-desc-1.start.local/uploads/attachments'
      }
    },

    methods: {
        getExtIcon(ext) {
            return ext.match(/(pdf|xls|xlsx|txt|rdp|zip|7z|docx|doc)/) ? ext : 'txt'
        }
    }
}

</script>

<style lang="scss">


    .list-attachments {
       border-radius: 5px;
       margin-top: 10px;
       margin-bottom: 0px;

        ul {
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;
            flex-wrap: wrap;

            li {
                display: flex;
                flex-direction: column;
                align-items: center;
                background: #eaeaea;
                margin-right: 10px;
                margin-bottom: 10px;
                padding: 10px;
                border-radius: 5px;
                justify-content: flex-end;
                max-width: 120px;

                .filename {
                    width: 100%;
                    font-size: 11px;
                    white-space: nowrap;
                    overflow: hidden;
                }

                .date {
                    font-size: 10px;
                    opacity: 0.5;
                }

                .ext-icons {
                    max-width: 30px;
                }

                a {
                    color: #000;
                }
                
                img {
                    max-height: 50px;
                    max-width: 100px;
                    margin-bottom: 5px;
                }
            }

            
        }

        
    }



</style>
