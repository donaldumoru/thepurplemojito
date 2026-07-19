import { datasetValidator } from '../lib/model.js';
import { getFiles, uploadFiles, insertMetadata } from './prepare-post.js';
import newPost from './new-post.js';

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

    // TODO: check why failed uploads return fulfilled
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
