import {serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server';
import { z } from 'zod';


const UpdateScoreDto = z.object({
    wrong: z.number()
})


export default defineEventHandler(async(event) => {
    const client = serverSupabaseServiceRole(event);
    const user = await serverSupabaseUser(event);

    if(!user){
        return
    }

    const userId: string = user.id;
    const body = await readBody(event); 

    const data = UpdateScoreDto.safeParse(body);

    if(!data.success){
        return;
    }
    
    const {
        wrong
    } = data.data;

    const correct = !wrong;

    // Wrong can be negative
    const score = correct ? 10 : Math.abs(wrong) * -2;

    const {data: dbData}: {data: {score: number}} = await client.from('score').select('score').eq('user_id', userId).single();

    const scoreToUpdate = dbData.score + score < 0 ? 0 : dbData.score + score;

    const {data: responseData}: {data: {score: number}} = await client.from('score').update({score: scoreToUpdate }).eq('user_id', userId).select('score').single();

    // Update results
    const {data: results} = await client.from('answers').select('id, correct, created_at').order('created_at', {ascending: false}).eq('user_id', userId);

    // If there is less then 100 results, we simply add a new one
    if(results.length >= 50){
        // We have to delete the last one
        const lastId = results[results.length - 1].id;

        await client.from('answers').delete().eq('id', lastId)
    }

    // Inserting history result
    await client.from('answers').insert({'user_id': userId, correct})

    return responseData.score;
})