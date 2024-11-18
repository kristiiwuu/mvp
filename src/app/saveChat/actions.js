'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// insert a student to our supabase 'students' table
export async function saveChat(chat) {    
    const supabase = await createClient() // connections btwn next.js and supa

    // get JSON object of the logged in user
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
    .from('chat_history')
    .insert([
      { chat: JSON.stringify(chat),
        user_id: user.id
       }
    ])
  
    if(error) {
      console.error('Error inserting chat history:', error.message);
      return redirect(`/error?message=${encodeURIComponent(error.message)}`);
    }
  
    revalidatePath('/', 'layout')
    redirect('/')
  }
