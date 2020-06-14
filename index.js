const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😭');
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

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const result1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const result2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const result3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([result1Pro, result2Pro, result3Pro]);
    const images = all.map((el) => el.body.message);
    console.log('images->', images);

    await writeFilePro('dog.img.txt', images.join('\n'));
    console.log('Random dog images will saved to file!');
  } catch (err) {
    console.log('err -> ', err);
    throw err;
  }
  return '2: READY 🐕';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR 💣');
  }
})();

// console.log("1: Will get dog pics!");
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log("3: Done getting dog pics!");
//   })
//   .catch((err) => {
//     console.log("ERROR 💣");
//   });

// readFilePro(`${__dirname}/dog.txt`)
//   .then((result) => {
//     console.log(`Breed: ${result}`);
//     return superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
//   })
//   .then((result) => {
//     console.log(result.body.message);
//     return writeFilePro("dog.img.txt", result.body.message);
//   })
//   .then(() => {
//     console.log("Random dog will saved to file!");
//   })
//   .catch((err) => {
//     console.log("err -> ", err);
//   });
