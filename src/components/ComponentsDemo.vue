<template>
    <div>
        <h2>DictTag</h2>
        <elu-dict-tag :options="options" :value="value1"></elu-dict-tag>
        <!-- <elu-dict-tag :options="options" :value="value2"></elu-dict-tag> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [
                { label: '选项1', value: '1', },
                { label: '选项2', value: '2' },
                { label: '选项3', value: '3' },
            ],
            value1: '1',
            value2: ['1', '2']
        }
    }
}
</script>

<style scoped>
h2 {
    margin-bottom: 20px;
    color: #606266;
    font-size: 18px;
    border-left: 4px solid #409eff;
    padding-left: 12px;
}
</style>