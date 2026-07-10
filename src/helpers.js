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

export { getRandomItems };
