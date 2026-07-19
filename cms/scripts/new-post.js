import { Post } from '../lib/model.js';

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
  title: 'Riverfront wind',
  year: 2026,
  city: 'Rotterdam',
  country: 'Netherlands',
  country_code: 'NL',
  tags: ['food', 'restaurant', 'city'],
});

export default newPost;
