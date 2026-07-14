import jpath from '@codemax/jpath';

const currentYear = new Date().getFullYear();
const BUCKET_BASE_URL = process.env.BUCKET_BASE_URL;
const bucketRegExp = new RegExp(BUCKET_BASE_URL);

class Post {
  constructor(post) {
    this.title = post.title;
    this.year = post.year || currentYear;
    this.location = post.location;
    this.tags = post.tags || [];
    this.image = post.image;
    this.story = post.story;
    this.#createSlug();
  }

  #createSlug() {
    const { city } = this.location;
    const { title } = this;
    const slug = [city, title].join(' ').split(' ').join('-').toLowerCase();
    this.slug = slug;
  }
}

const datasetValidator = jpath.valueTest({
  title: jpath.limit(String, 4, 20),
  year: jpath.limit(Number, currentYear),
  location: {
    city: jpath.notEmpty(String),
    country: jpath.notEmpty(String),
    country_code: jpath.notEmpty(String),
  },
  tags: jpath.notEmpty([, , String]),
  image: {
    cover_image: bucketRegExp,
    thumbnail: bucketRegExp,
  },
  story: bucketRegExp,
});

const data = new Post({
  title: 'hmmm',
  year: 2020,
  location: { city: 'Eindhoven', country: 'Netherlands', country_code: 'NL' },
  tags: ['mood'],
  image: {
    cover_image:
      'https://glnisnrojngbrrotgaih.supabase.co/storage/v1/object/public/posts/barcelona-port-sunset/cover.webp',
    thumbnail:
      'https://glnisnrojngbrrotgaih.supabase.co/storage/v1/object/public/posts/barcelona-port-sunset/thumb.webp',
  },
  story:
    'https://glnisnrojngbrrotgaih.supabase.co/storage/v1/object/public/posts/barcelona-port-sunset/story.md',
});

const error = datasetValidator(data);
if (error) {
  console.log(error);
} else {
  console.log('dataset is valid');
}

export default Post;
