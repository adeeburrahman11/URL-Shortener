import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);

  return session.session?.user;
}

export async function signup({ name, email, password, profile_pic }) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);

  // If the project is configured to require email confirmation, `signUp`
  // may not create a session. To make the UX consistent (user is able to
  // use authenticated flows immediately after signing up) attempt to sign
  // the user in using the provided credentials when no session is present.
  // This is a best-effort fallback and will silently return the original
  // signUp data if sign-in fails.
  try {
    // `data` may contain a `session` in some Supabase configurations.
    // If no session exists, try signing in to create one.
    if (!data?.session) {
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({ email, password });
      if (!signInError) return signInData;
      // if sign in failed, fall through and return original signUp data
    }
  } catch (err) {
    // ignore sign-in fallback errors; return the signUp response below
    // but log for debugging so we don't have an unused-variable lint error
    // and have visibility when developing.
    console.debug("signup: automatic sign-in fallback failed:", err?.message);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
