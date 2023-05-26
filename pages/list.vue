<template>
    <div class="flex justify-between text-lg font-semibold dark:text-gray-200 text-gray-800">
        <span>
            Vsechny kyticky
        </span>
        <div class="flex gap-4">
            <NuxtLink
                to="/game"
            >
                Hra
            </NuxtLink>
            <NuxtLink
                to="/leaderboard"
            >
                Kdo vede?
            </NuxtLink>
        </div>
    </div>
    <div class="flex justify-between items-center my-4">
        <input
            type="text"
            class="w-[60%] py-1 px-2 dark:bg-gray-800 bg-gray-200 rounded-md text-gray-700 dark:text-gray-300"
            placeholder="Vyhledej kyticku"
            @input="searchPlants($event.target?.value || '')"
        />

        <div class="text-sm font-semibold">
            <button
                :class="baseButtonClass"
                class="rounded-l-md border-r"
                @click="globalShow = false"
            >
                Skryt
            </button>
            <button
                :class="baseButtonClass"
                class="rounded-r-md border-l"
                @click="globalShow = true"
            >
                Odhalit
            </button>
        </div>
    </div>
    <div class="flex flex-col">
        <ListPlant
            v-for="(plant) in plants"
            :key="plant.name"
            :plant="plant"
            :global-show="globalShow"
        />
    </div>
</template>

<script lang="ts" setup>
import jsonData from '~/data/data.json';
import { Plant } from '~/types';

const baseButtonClass = 'bg-cyan-700 py-0.5 px-2 border-gray-900 hover:opacity-70 transition-opacity duration-100 text-gray-300'

const data: Plant[] = shuffle(jsonData.plants);

const plants = ref<Plant[]>(data);
const globalShow = ref(false);

let searchTimeout: NodeJS.Timeout;
function searchPlants(search: string){
    if(globalShow.value){
        globalShow.value = false;
        nextTick(() => (globalShow.value = true));
    } else {
        globalShow.value = true
    }

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const lowercaseSearch = search.toLowerCase();
        plants.value = data.filter(({name}) => name.toLowerCase().includes(lowercaseSearch))

    }, 50);
}
</script>