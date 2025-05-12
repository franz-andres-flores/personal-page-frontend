<template>
    <q-select filled v-model="year" :options="yearOptions" label="Año" @update:modelValue="selectYear" :dense="true" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { OptionDto } from '@/dto';
import { fetchCurrentYear, getYearList } from '@/helpers/utilities';

interface Props {
    value?: number;
}

export default defineComponent({
    name: 'YearSelectComponent',
    props: {
        value: { type: Number },
    },
    emits: ['year_selected'],
    setup(props: Props, { emit }) {
        const data = reactive({
            year: '',
            yearOptions: getYearList(2000, fetchCurrentYear())
        });

        if (props.value != undefined) {
            const year = props.value.toString();
            data.year = year;
        }

        const selectYear = (option: OptionDto) => {
            emit('year_selected', option);
        }

        return {
            ...toRefs(data),
            selectYear
        }
    }
});

</script>