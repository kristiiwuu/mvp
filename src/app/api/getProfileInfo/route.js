"use server"
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
    const supabase = await createClient(); // connections btwn next.js and supa

    // get JSON object of the logged in user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error('Error fetching user:', userError);
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // get user's name
    let { data: nameData, error: nameError } = await supabase
        .from('profiles')
        .select('name')
        .eq('UID', user.id);

    if (nameError) {
        console.error('Error fetching name:', nameError);
        return new Response(JSON.stringify({ error: 'Error fetching name' }), { status: 500 });
    }

    // Check if nameData is not empty and return the user name
    if (nameData) {
        return new Response(JSON.stringify({ name: nameData[0].name, email: user.email }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ name: '', email: user.email }), { status: 200 });
    }
}