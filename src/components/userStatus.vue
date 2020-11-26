<template>
    <span v-if="id" :class="`status ${status[id].className}`">{{status[id].text}}</span>
</template>

<script>
import config from '@/config'
export default {
    name: 'userStatus',
    props: {
        id: String,
        type: String
    },
    data() {
        return {
            status: config.userStatusesList
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

    &-pending {
      color: #fff;
      background: #ff5e00;
      border-color: #ff5e00;
    }

    &-active {
        color: #fff;
        background: #16a085;
        border-color: #16a085;
    }
}
</style>
