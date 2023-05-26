<template>
    <div class="flex justify-between text-lg font-semibold dark:text-gray-200 text-gray-800 mb-4">
        <span>
            Kdo vede?
        </span>
        <div class="flex gap-4">
            <NuxtLink
                to="/game"
            >
                Hra
            </NuxtLink>
            <NuxtLink
                to="/list"
            >
                Kyticky
            </NuxtLink>
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <div
        v-for="score, index in scores"
        class="flex justify-between"
        :class="score.user_id === user?.id ? 'text-green-500' : 'dark:text-gray-400 text-gray-700'"
        >
            <span class="text-md" :class="{'text-green-500': score.user_id === user?.id}">
                <span class="font-semibold mr-2">{{ index + 1 }}. </span>
                {{ score.name }}
            </span>
            <div class="flex items-center gap-4">
                <span class="text-sm">
                    {{ score.score }}
                </span>
                <span class="text-md font-semibold">
                    {{ (score.result * 100).toFixed(0) }}%
                </span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const user = useSupabaseUser();

definePageMeta({
    middleware: 'auth'
});

const {data: scores} = await useFetch('/api/score')
</script>