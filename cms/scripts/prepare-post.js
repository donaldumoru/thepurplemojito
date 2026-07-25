import supabase from '../lib/supabase-client.js';
import fs from 'node:fs/promises';
import path from 'node:path';
const dirname = path.dirname('cms/posts/');

const filesArr = ['cover.webp', 'thumbnail.webp', 'story.md'];

async function getFiles(slug) {
  try {
    const filesInDir = await fs.readdir(`${dirname}/posts/${slug}/`);

    const promises = filesArr
      .filter(file => filesInDir.includes(file))
      .map(async file => ({
        fileContent: await fs.readFile(`${dirname}/posts/${slug}/${file}`),
        fileName: file,
        fileType: file.endsWith('webp') ? 'image/webp' : 'text/markdown',
      }));

    const result = await Promise.allSettled(promises);
    const files = result.map(result => {
      const { value } = result;
      const { fileContent, fileName, fileType } = value;
      return { fileContent, fileName, fileType };
    });

    return files;
  } catch (error) {
    console.log(error);
  }
}

async function uploadFiles(slug, arr) {
  const promises = await Promise.allSettled(
    arr.map(async file => {
      const { fileContent, fileName, fileType } = file;

      try {
        const { data, error } = await supabase.storage
          .from('posts')
          .upload(`${slug}/${fileName}`, fileContent, {
            contentType: fileType,
          });
        if (error) {
          throw new Error(`${fileName} failed to upload`);
        }

        const result = await data;
        return result;
      } catch (error) {
        console.log(error);
      }
    }),
  );

  return promises.every(promise => promise.status === 'fulfilled');
}

const insertMetadata = async function (post) {
  try {
    const { data, error } = await supabase
      .from(process.env.VITE_DB_TABLE)
      .insert([post])
      .single()
      .select();

    if (error) {
      throw new Error(error);
    }

    const result = await data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { getFiles, uploadFiles, insertMetadata };
