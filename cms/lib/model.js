import jpath from '@codemax/jpath';

const currentYear = new Date().getFullYear();
const BUCKET_URL = process.env.BUCKET_URL;

class Post {
  constructor(post) {
    this.title = post.title;
    this.year = post.year;
    this.city = post.city;
    this.country = post.country;
    this.country_code = post.country_code;
    this.tags = post.tags;
    this.slug = this.#createSlug();
    this.cover_image = `${BUCKET_URL}${this.slug}/cover.webp`;
    this.thumbnail = `${BUCKET_URL}${this.slug}/thumb.webp`;
    this.story = `${BUCKET_URL}${this.slug}/story.md`;
    this.imageAltText = post.image_alt_text;
  }

  #createSlug() {
    const { city, title } = this;
    const slug = [city, title]
      .join(' ')
      .replace(/[^a-zA-Z ]/g, '')
      .split(' ')
      .join('-')
      .toLowerCase();
    return slug;
  }
}

const datasetValidator = jpath.valueTest({
  title: jpath.limit(String, 4, 20),
  year: jpath.limit(Number, currentYear),
  city: jpath.notEmpty(String),
  country: jpath.notEmpty(String),
  country_code: jpath.notEmpty(String),
  tags: jpath.notEmpty([, , String]),
  imageAltText: jpath.notEmpty(String),
});

export { Post, datasetValidator };
