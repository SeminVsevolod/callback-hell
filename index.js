const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file 😭");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(`Could not write file: ${file} 😭`);
      resolve(`File ${file} has written successfully`);
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((result) => {
    console.log(`Breed: ${result}`);
    return superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
  })
  .then((result) => {
    console.log(result.body.message);
    return writeFilePro("dog.img.txt", result.body.message);
  })
  .then(() => {
    console.log("Random dog will saved to file!");
  })
  .catch((err) => {
    console.log("err -> ", err);
  });
