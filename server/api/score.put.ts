import {serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server';
import { z } from 'zod';


const UpdateScoreDto = z.object({
    correct: z.boolean(),
    wrong: z.number()
})


export default defineEventHandler(async(event) => {
    const client = serverSupabaseServiceRole(event);
    const user = await serverSupabaseUser(event);

    if(!user){
        return
    }

    const userId = user.id;
    const body = await readBody(event); 

    const data = UpdateScoreDto.safeParse(body);

    if(!data.success){
        return;
    }
    
    const {
        correct,
        wrong
    } = data.data;

    const score = correct ? 10 : wrong * -2;

    const {data: dbData}: {data: {score: number}} = await client.from('score').select('score').eq('user_id', userId).single();

    const scoreToUpdate = dbData.score + score < 0 ? 0 : dbData.score + score;

    const {data: responseData}: {data: {score: number}} = await client.from('score').update({score: scoreToUpdate }).eq('user_id', userId).select('score').single();

    return responseData.score;
})