<template>
    <div>
        <h5>单个值</h5>
        <elu-dict-tag :options="options" :value="value1"></elu-dict-tag>
        <h5>多个值</h5>
        <elu-dict-tag :options="options" :value="value2"></elu-dict-tag>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [
                { label: '选项1', value: '1',},
                { label: '选项2', value: '2' },
                { label: '选项3', value: '3' },
            ],
            value1: '1',
            value2: ['1', '2']
        }
    }
}
</script>