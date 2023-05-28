<template>
    <div
        class="flex flex-col"
    >
        <nuxt-img
            :src="`/plants/${plant.image}`"
            :key="plant.image"
            quality="50"
            loading="lazy"
            style="aspect-ratio: 576/392;"
        />
        <div class="py-6 h-full min-h-[30vh] flex items-start justify-center">
            <button
                class="flex justify-center items-center px-2 py-1 rounded-md text-gray-700 dark:text-gray-300 font-semibold dark:bg-gray-800 bg-gray-300 hover:opacity-70 transition-opacity duration-100"
                @click="show = !show"
            >
                {{ show ? plant.name : [...new Array(plant.name.length)].map(() => '*').join('') }}
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Plant } from '~/types';

const props = defineProps<{plant: Plant, globalShow: boolean}>();

const show = ref(false);

watch(() => props.globalShow, (newValue) => {
    show.value = newValue
}, {immediate: true})
</script>