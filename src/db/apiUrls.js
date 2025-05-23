import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("URLs")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to load URLs");
  }

  return data;
}

export async function deleteUrl(id) {
  const { data, error } = await supabase.from("URLs").delete("*").eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to delete URL");
  }

  return data;
}

export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${short_url}`;
  const { error: storageError } = await supabase.storage
    .from("qr")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qr/${fileName}`;

  const { data, error } = await supabase
    .from("URLs")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url,
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Unable to create short URL");
  }

  return data;
}

export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("URLs")
    .select("id,original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Error fetching short link");
  }

  return data;
}
export async function getUrl({ id, user_id }) {
  // console.log("getUrl called with:", { id });
  const { data, error } = await supabase
    .from("URLs")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();
  if (error) {
    console.error(error.message);
    throw new Error("Short URL not found");
  }

  return data;
}
