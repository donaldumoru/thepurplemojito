class PostModel {
  constructor(dbRow) {
    this.id = dbRow.id;
    this.slug = dbRow.slug;
    this.title = dbRow.title;
    this.year = dbRow.year;
    this.location = {
      city: dbRow.city,
      country: dbRow.country,
      countryCode: dbRow.country_code,
    };
    this.tags = dbRow.tags;
    this.image = {
      cover: dbRow.cover_image,
      thumbnail: dbRow.thumbnail,
    };
    this.story = dbRow.story;
  }
}

export default PostModel;
