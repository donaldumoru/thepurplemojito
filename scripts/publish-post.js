import { Post, datasetValidator } from './model.js';
import { getFiles, uploadFiles, insertMetadata } from './prepare-post.js';

/*****************************************************************
 * Required metadata for a new post
 *
 *
 *
 * Before running `npm run publish`, create a post <new Post({})> that follows
 * this structure:
 *
 *
 * {
 *   title: "<Post title>", // String (4–20 characters)
 *   year: 2026, // Number (≤ current year)
 *   city: "<City>", // Non-empty string
 *   country: "<Country>", // Non-empty string
 *   country_code: "<ISO country code>" // Non-empty string
 *   tags: ["tag1", "tag2"], // Non-empty array of strings
 * }
 *
 *
 * The metadata above is validated by the Post model (using jpath validation) before being inserted into the Supabase table
 ******************************************************************/

/************************************************************************************************/
const newPost = new Post({
  title: 'Yellow Tram Turn',
  year: 2023,
  city: 'Lisbon',
  country: 'Portugal',
  country_code: 'PT',
  tags: ['summer', 'friends', 'travel', 'holiday', 'party'],
});

// TODO: better error handling for any failures in the pipeline
const addNewPost = async function (post) {
  try {
    // 1... validate metadata
    const error = datasetValidator(post);
    if (error) {
      throw new Error(error);
    }

    console.log('data valid: ', post);

    const { slug } = post;

    // 2... get all files that need to be uploaded
    const filesToUpload = await getFiles(slug);

    console.log(
      'files ready to be uploaded to storage bucket: ',
      filesToUpload,
    );

    // 3.... upload to storage bucket
    const uploadSuccessful = await uploadFiles(slug, filesToUpload);

    // 4....if files upload was successful, insert metadata to database table
    if (!uploadSuccessful) {
      console.log('there was a problem uploading files... pls try again');
      return;
    }

    console.log(
      'upload successful and ready to insert metadata in database table',
    );

    const metadata = await insertMetadata(newPost);

    console.log('successfully published: ', metadata);
  } catch (error) {
    console.log(error.message);
  }
};

addNewPost(newPost);
