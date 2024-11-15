'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient() // connections btwn next.js and supa

  // access email and password form input values 
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Sign-up error:', error.message)
    // if (error.message == "weak_password") {
    //   return redirect('/errors/weak-password')
    // }
    return redirect(`/error?message=${encodeURIComponent(error.message)}`)
  }

  // revalidate home page and layout (and paths that might change when signed in)
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('Sign-up error:', error.message)
    return redirect(`/error?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

// insert a student to our supabase 'students' table
export async function insertStudent(formData) {
  const supabase = await createClient() // connections btwn next.js and supa

  const { data, error } = await supabase
  .from('students')
  .insert(
    { name: formData.get('name'), student_id: formData.get('student_id') },
  );

  if(data) {
    redirect('/');
  }

  if(error) {
    console.error('Error inserting student:', error.message);
    return redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/', 'layout')
  redirect('/')
}


