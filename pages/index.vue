<template>
    <div class="mt-10 flex flex-col items-center">
        <span class="text-2xl font-semibold dark:text-gray-100 mb-10">
            Nejdrive se musite registrovat/prihlasit!
        </span>
        <button
            class="p-2 rounded-md bg-cyan-600 text-gray-100"
            @click="logIn"
        >
            Registrovat/Prihlasit
        </button>
    </div>
</template>
<script lang="ts" setup>
const user = useSupabaseUser();
const authClient = useSupabaseAuthClient();

watch(() => user.value, (newValue) => {
    if(newValue){
        navigateTo('/game');

    }
}, {immediate: true})

async function logIn(){
    if(!user.value){
        const {error} = await authClient.auth.signInWithOAuth({provider: 'google'});
    }
}

</script>