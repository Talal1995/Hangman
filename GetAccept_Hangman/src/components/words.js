const PROGRAMING_LANG = [
  "lion",
  "tiger",
  "elephant",
  "eagle",
  "fish",
  "shark",
  "duck",
  "monkey",
  "donkey",
  "dog",
  "cat",
  "cow",
  "fox",
  "hamster",
  "horse",
  "jaguar",
  "koala",
  "raccoon",
  "rat",
  "snail",
  "snake",
  "panther",
  "bear",
  "parrot",
  "dolphin",
  "zibra",
  "puma",
  "ostrich",
  "pig"
];

function randomWord() {
  return PROGRAMING_LANG[Math.floor(Math.random() * PROGRAMING_LANG.length)];
}

export { randomWord };