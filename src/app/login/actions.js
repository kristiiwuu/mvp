'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient() // connections btwn next.js and supa

  // access email and password form input values 
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error){
    if(error.code == 'invalid_credentials') {
      return redirect(`/error/invalid_credentials`)
    }
    else if(error.code == 'user_already_exists') {
      return redirect(`/error/user_already_exists`)
    }
    else if(error.code == 'weak_password') {
      return redirect(`/error/weak_password`)
    }
  }

  // revalidate home page and layout (and paths that might change when signed in)
  revalidatePath('/', 'layout')
  redirect('/student-portal')
}

export async function signup(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const { error: signupError } = await supabase.auth.signUp(data);

  if (signupError) {
    if(signupError.code == 'invalid_credentials') {
      return redirect(`/error/invalid_credentials`)
    }
    else if(signupError.code == 'user_already_exists') {
      return redirect(`/error/user_already_exists`)
    }
    else if(signupError.code == 'weak_password') {
      return redirect(`/error/weak_password`)
    }
    else {
      console.error('Sign-up error:', signupError.message)
      return redirect(`/error?message=${encodeURIComponent(signupError.message)}`)
    }
  }

  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
  .from('profiles')
  .insert({ 
    'UID': user.id,
    'name': formData.get('name') 
  })

  revalidatePath('/', 'layout')
  redirect('/student-portal')
}
