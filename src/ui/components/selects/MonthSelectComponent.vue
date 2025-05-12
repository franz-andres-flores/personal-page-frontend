<template>
    <q-select filled v-model="month" :options="monthOptions" label="Mes" @update:modelValue="selectMonth" :dense="true" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { fetchMonthByNumber, fetchMonthsOfYear } from '@/helpers/utilities';
import { OptionDto } from '@/dto';

interface Props {
    value?: number;
}

export default defineComponent({
    name: 'MonthSelectComponent',
    props: {
        value: { type: Number },
    },
    emits: ['month_selected'],
    setup(props: Props, { emit }) {
        const data = reactive({
            month: '',
            monthOptions: fetchMonthsOfYear()
        });

        if (props.value != undefined) {
            const month = fetchMonthByNumber(props.value);
            data.month = month;
        }

        const selectMonth = (option: OptionDto) => {
            emit('month_selected', option);
        }

        return {
            ...toRefs(data),
            selectMonth
        }
    }
});

</script>