import {serverSupabaseServiceRole, serverSupabaseUser} from "#supabase/server";

export default defineEventHandler(async(event) => {
    const client = serverSupabaseServiceRole(event);
    const user = await serverSupabaseUser(event);

    if(!user){
        return;
    }

    // Check if user record exists
    const { data } = await client.from('score').select('score').eq('user_id', user.id).single();

    // User record is not created yet
    if(!data){
        await client.from('score').insert({'user_id': user.id, score: 0, name: user.user_metadata.full_name});
    }

    return data?.score || 0;
})