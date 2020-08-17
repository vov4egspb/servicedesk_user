<template>
    <div class="comment-item" :class="{'user-comment': !isUserComment }">
        <div class="avatar">
            <img :src="`/images/${isUserComment ? 'avatar-user' : 'avatar'}.png`" alt="">
        </div>
        <div class="message">
            <div class="author">{{data.user_name}}</div>
            <div class="text" v-html="data.text"></div>

            <attachments-list :data="data.attachments" />
            
            <div class="date">{{ getDate(data.create_time) }}</div>
        </div>
    </div>
</template>

<script>

import helpers from '@/utils'
import axios from 'axios'
import AttachmentsList from '@/components/tickets/AttachmentsList.vue'

export default {
    name: 'comment',
    components: {
        AttachmentsList
    },
    mixins: [helpers],

    props: {
        data: Object
    },

    data() {
        return {
            showComment: true
        }
    },

    computed: {
        isUserComment() {
            return this.data.is_user_comment
        },

        isPublic() {
            return this.data.type == 2
        },
    },

    methods: {
       

        downloadAttachment(filename) {
            axios({
                url: 'download/' + filename,
                method: 'GET',
                responseType: 'blob', 
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', filename)
                document.body.appendChild(link)
                link.click()
            });
        }
    }
}
</script>


<style lang="scss" >

$privateColor: #ffe57e;
$successColor: green;
$failedColor: red;


.comment-item {
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;

    &.user-comment {
        flex-direction: row-reverse;

        .message {
            margin-right: 10px;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 0;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            background: #f5f5f5;
        }
    }

    &.public-comment {
        .message {
            background: #fffaea;
        }
    }

    
    .avatar {
        img {
            width: 40px;
        }
    }

    .message {
        position: relative;
        margin-left: 10px;
        background: #f5f5f5;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 15px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        max-width: 80%;
        width: 100%;
        padding: 12px;

        .private {
            position: absolute;
            right: 10px;
            top: 10px;

            img {
                width: 25px;
            }
        }

        .text {
            font-size: 14px;
        }

        .author {
            font-size: 14px;
            font-weight: bold;
            display: block;
            margin-bottom: 2px;
        }


        .image-attach-list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;

            .item {
                position: relative;
                margin-right: 10px;
                margin-bottom: 10px;

                img {
                    height: 70px;
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

        .date {
            margin-top: 5px;
            font-size: 11px;
            opacity: 0.5;
        }
    }
}


    .comment {
        border: 1px solid #f3f3f3;
        margin-top: 10px;

        

        .comment-body {
            font-size: 12px;
        }

        &:first-of-type {
            margin-top: 0;
        }

        &.private {
            border: 1px solid $privateColor;

            .comment-header {
                
                background:lighten($privateColor, 17%);
            }

            .expand-icon {
                background: $privateColor;
                color:#fff;
            }

            .comment-body {
                border-top: 1px solid $privateColor;
                font-size: 12px;
            }
            
        }

        &.success {
            border: 1px solid $successColor;

            .comment-header {
                
                background:lighten($successColor, 17%);
            }

            .expand-icon {
                background: $successColor;
                color:#fff;
            }

            .comment-body {
                border-top: 1px solid $successColor;
            }
            
        }

        &.failed {
            border: 1px solid $failedColor;

            .comment-header {
                
                background:lighten($failedColor, 17%);
            }

            .expand-icon {
                background: $failedColor;
                color:#fff;
            }

            .comment-body {
                border-top: 1px solid $failedColor;
            }
            
        }
        
        &-header {
            display:flex;
            align-items: center;
            padding: 8px 10px;
            transition: 0.3s;
            background:#fbfbfb;
            color:#555;

            &:hover {
                cursor: pointer;
                background:darken(#fbfbfb, 3%);
            }

            .expand-icon {
                width: 18px;
                height: 18px;
                background: #c3c3c3;
                color:#fff;
                opacity: 0.5;
                border-radius:3px;
                display: flex;
                font-size: 9px;
                align-items: center;
                justify-content: center;
                line-height: 18px;

                i {
                    &::before {
                        margin: 0;
                        padding: 0;
                    }
                }
            }

            .comment-date {
                margin-left: 20px;
                font-size: 11px;
            }

            .comment-author {
                margin-left: 20px;
                font-size: 12px;
                font-weight: bold;
            }

            .comment-id {
                flex-grow: 1;
                text-align: right;
                font-size: 11px;
                opacity: 0.5;
            }
        }

        &-body {
            padding: 20px 10px;
            border-top: 1px solid #f3f3f3;
        }

        &-footer {
            background: #fbfbfb;
            padding: 5px 10px;

            ul {
                padding: 0;
                margin: 0;
                list-style: none;
            }
        }
    }

</style>
