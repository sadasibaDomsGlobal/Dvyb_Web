// lib/utils.js

export const scrollLeft = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollBy({
      left: -300, // adjust scroll distance
      behavior: "smooth",
    });
  }
};

export const scrollRight = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  }
};
