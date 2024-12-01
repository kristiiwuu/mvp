// 'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'

// import { createClient } from '@/utils/supabase/server'

// export async function update(formData) {
//   const supabase = await createClient() // connections btwn next.js and supa

//   const { data: { user }, error: userError } = await supabase.auth.getUser();

//   if(userError) {
//     return redirect(`/profile-page?error=${encodeURIComponent(userError.message)}`);
//   }

//     // update email and password if user changed  
//     const { data, error } = await supabase.auth.updateUser({
//         email: formData.email ? formData.email : user.email,
//         password: formData.password ? formData.password : user.password,
//     })

//     if(error) {
//         return redirect(`/profile-page?error=${encodeURIComponent(error.message)}`);
//     }

//     // update name if user changed name
//     if (formData.name) {
//         const { profilesData, profilesError } = await supabase
//         .from('profiles')
//         .update({ name: formData.name })
//         .eq('UID', user.id)

//         if(profilesError) {
//             return redirect(`/profile-page?error=${encodeURIComponent(profilesError.message)}`);
//         }
//     }

   
    
//     return redirect('/student-portal')
        
// }