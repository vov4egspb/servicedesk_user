<template>
    <div class="list-event">
        <div v-if="data.length > 0">
            <el-timeline>
                <el-timeline-item
                v-for="(event, index) in data"
                :key="index"
                :type="index + 1 != data.length ? 'primary' : 'success'"
                :timestamp="event.create_time">
                <span class="event-agent-name">{{event.author}}</span> <span v-html="event.text"></span>
                </el-timeline-item>
            </el-timeline>
        </div> 
        <div class="no-data" v-else>Нет записей</div>
    </div>
</template>

<script>
import helpers from '@/utils'
export default {
    name: 'EventsList',
    mixins: [helpers],
    props: {
        data: Array,
    }
}
</script>

<style lang="scss">

    .list-event {
        margin-top: 10px;
        font-size: 12px;

        .event-agent-name {
            font-weight: bold;
        }

        .el-timeline {
            padding-left: 10px;
            margin-left: 0 !important;
        }

        .el-timeline-item__content {
            font-size: 12px;
        }
    }
</style>
