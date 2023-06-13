const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const goToCategory = () => {
  const categories = [
    "kInKortrijk",
    "begijnhof",
    "skatepark",
    "kortrijkWeide",
    "astridPark",
    "textureMuseum",
  ];

  categories.forEach((category) => {
    const categoryElement = document.querySelector(`.${category}`);
    categoryElement.addEventListener("click", () => {
      window.location.href = `./category.html?category=${category}`;
    });
  });
};

const fillPage = () => {
  const name = urlParams.get(`category`);
  console.log(category);
};

const init = () => {
  goToCategory();
  fillPage();
};

init();
