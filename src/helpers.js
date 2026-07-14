const randomNumber = arr => Math.floor(Math.random() * arr.length - 1);

const randomItemsClosure = function () {
  const selectedItems = [];
  return function (arr, n) {
    if (!arr.length) {
      return selectedItems;
    }

    while (selectedItems.length < n) {
      let f = arr[randomNumber(arr)];
      if (!selectedItems.includes(f)) {
        selectedItems.push(f);
      }
    }

    return selectedItems;
  };
};

const getRandomItems = randomItemsClosure();

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

export { getRandomItems, PostModel };
