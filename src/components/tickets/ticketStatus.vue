<template>
    <span v-if="id">
        <span :class="`status ${status[id].className}`" v-if="type == 'bage'" @click="$emit('click')">{{status[id].text}}</span>
    </span>
</template>

<script>
import config from '@/config'
export default {
    name: 'ticketStatus',
    props: {
        id: String,
        type: String
    },
    data() {
        return {
            status: config.statusesList
        }
    }
}
</script>

<style lang="scss">
    .status {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 4px;

    &-new {
        color: #fff;
        background: #0095ff;
        border-color: #0095ff;
    }

    &-inwork {
        color: #fff;
        background: #ff5e00;
        border-color: #ff5e00;
    }

    &-pending {
        color: #409EFF;
        background: #ecf5ff;
        border-color: #b3d8ff;
    }

    &-fail {
        color: #fff;
        background: #dc3545;
        border-color: #dc3545;
    }

    &-close {
        color: #fff;
        background: #16a085;
        border-color: #16a085;
    }
}
</style>
