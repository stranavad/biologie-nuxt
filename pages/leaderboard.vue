<template>
    <div class="flex justify-between mb-5">
        <span class="text-xl font-semibold dark:text-gray-200 text-gray-800">Leaderboards</span>
        <NuxtLink to="/game" class="text-lg font-semibold dark:text-gray-200 text-gray-800">Back to game</NuxtLink>
    </div>
    <div class="flex flex-col gap-2">
        <div v-for="score, index in scores" class="flex justify-between dark:text-gray-400 text-gray-700">
            <span class="text-md" :class="{'text-green-500': score.user_id === user?.id}">
                <span class="font-semibold mr-2">{{ index + 1 }}. </span>
                {{ score.name }}
            </span>
            <span class="text-lg font-semibold">{{ score.score }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
const client = useSupabaseClient();
const user = useSupabaseUser();

definePageMeta({
    middleware: 'auth'
})

const { data: scores } = await useAsyncData('scores', async () => {
    const {data} = await client.from('score').select('score, name, user_id').order('score', {ascending: false});
    
    return data;
})
</script>