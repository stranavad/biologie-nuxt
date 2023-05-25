import {serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async(event) => {
    const client = serverSupabaseServiceRole(event);

    // Score results
    const {data: scoreResults}: {data: {score: number, user_id: string, name: string}[]} = await client.from('score').select('score, name, user_id').order('score', {ascending: false});

    const results = new Map<string, {user_id: string, score: number, name: string, answers: number, answersCorrect: number}>()

    scoreResults.map((result) => {
        results.set(result.user_id, {score: result.score, name: result.name, user_id: result.user_id, answers: 0, answersCorrect: 0});
    })
    // Answers results
    const {data: answersData}: {data: {user_id: string, correct: boolean}[]} = await client.from('answers').select('user_id, correct');

    answersData.map((answer) => {
        const data = results.get(answer.user_id);

        if(!data){
            return
        }

        results.set(answer.user_id, {...data, answers: data.answers + 1, answersCorrect: answer.correct ? data.answersCorrect + 1 : data.answersCorrect})
    });

    return [...results.values()]
        .map(({user_id, name, score, answers, answersCorrect}) => ({
            user_id,
            name,
            score,
            result: (answersCorrect/answers) || 0
        }))
})