<script setup lang="ts">
import jsonData from '~/data/data.json';
import {Answer, Plant} from "~/types";
import {ref} from "vue";
import {getRandomElements, shuffle, getImageUrl} from "~/utils";

definePageMeta({
  middleware: 'auth'
})

const data: Plant[] = jsonData.plants;

const nextImage = ref<string | null>(null);
const currentPlant = ref<Plant | null>(null);
const answers = ref<Answer[]>([]);
const score = ref(0);

async function updateScore(wrong: number){
  const response = await fetch('/api/score', {
    method: 'PUT',
    body: JSON.stringify({
      wrong
    })
  });

  const responseData = await response.json();

  score.value = responseData
}

async function answerPlant(answer: Answer){
  if(answer.name === currentPlant.value!.name){
    answers.value[answers.value.findIndex(({name}) => name === answer.name)].correct = true;

    // Wrong answer count
    const wrongAnswers = answers.value.filter(({wrong}) => wrong).length;

    await updateScore(wrongAnswers);

    getNextPlant();
    return;
  }

  answers.value[answers.value.findIndex(({name}) => name === answer.name)].wrong = true;
}

function getNextPlant (firstPlant:boolean=false){

  let newPlant = data[Math.floor(Math.random() * data.length)];
  let newAnswers = shuffle([...getRandomElements(data.filter(({name}) => name !== newPlant!.name), 5).map(({name}) => name), newPlant.name]).map((name) => ({name, wrong: false, correct: false}));

  if(!firstPlant){
    nextImage.value = newPlant.image;
  }

  setTimeout(() => {
    currentPlant.value = newPlant;
    answers.value = newAnswers
  }, firstPlant ? 0 : 750);
}

function created(){
  getNextPlant(true);
}

onMounted(async () => {
    const response = await fetch('/api/score', {
      method: 'POST',
    });

  score.value = await response.json();
})

function getAnswerClass(answer: Answer){
  if(answer.wrong){
    return 'text-red-500 cursor-not-allowed dark:bg-red-900/50 bg-red-200/50 pointer-events-none';
  }

  if(answer.correct){
    return 'text-green-500 cursor-not-allowed dark:bg-green-900/50 bg-green-200/50 pointer-events-none'
  }

  return 'dark:text-gray-300 text-gray-700 dark:bg-gray-800 bg-gray-300 hover:opacity-70 '
}

created();
</script>

<template>
    <nuxt-img v-if="nextImage" quality="50" :src="getImageUrl(nextImage)" style="display: none"/>
    <div class="flex justify-between items-center mb-2">
        <div class="flex gap-4">
          <NuxtLink to="/leaderboard" class="text-lg font-semibold dark:text-gray-300 text-gray-800">Kdo vede?</NuxtLink>
          <NuxtLink to="/list" class="text-lg font-semibold dark:text-gray-300 text-gray-800">Kyticky</NuxtLink>
        </div>
        <span class="text-lg font-semibold dark:text-gray-300 text-gray-800">Skore: <span class="text-2xl">{{score}}</span></span>
    </div>
    <div v-if="currentPlant" class="my-2">
        <nuxt-img :src="getImageUrl(currentPlant.image)" quality="50" style="aspect-ratio: 576/392;" class="w-full object-contain"/>
    </div>
    <div class="flex flex-col">
        <button
            v-for="answer in answers"
            class="block text-left text-xs font-semibold py-3 px-2 rounded-md my-2 transition-opacity duration-100"
            :key="`${currentPlant!.name}-${answer.name}`"
            :class="getAnswerClass(answer)"
            :disabled="answers.some(({correct}) => correct)"
            @click="answerPlant(answer)"
        >
        {{answer.name}}
        </button>
    </div>
</template>

<style scoped>
</style>
