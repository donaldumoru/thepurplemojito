export const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

export const toggleVisibility = function (view, classNames) {
  view.classList.toggle(classNames.active);
  view.classList.toggle(classNames.inactive);
};
