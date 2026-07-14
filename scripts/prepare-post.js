import supabase from './supabase-client.js';
import fs from 'node:fs/promises';

const filesArr = ['cover.webp', 'thumb.webp', 'story.md'];

async function getFiles(slug) {
  try {
    // 2... get all files that need to be uploaded
    const filesInDir = await fs.readdir(`scripts/uploads/${slug}/`);
    const promises = filesArr
      .filter(file => filesInDir.includes(file))
      .map(async file => ({
        fileContent: await fs.readFile(`scripts/uploads/${slug}/${file}`),
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
      .from('thepurplemojito')
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
