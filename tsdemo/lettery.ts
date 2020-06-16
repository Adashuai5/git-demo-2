#!/usr/bin/env ts-node

let redBallCount = {},
  blueBallCount = {};

for (let i = 1; i <= 33; i++) {
  redBallCount[i] = 0;
  if (i <= 16) {
    blueBallCount[i] = 0;
  }
}

const getArr = () => {
  const redBallPool = [];
  const blueBallPool = [];
  for (let i = 1; i <= 33; i++) {
    redBallPool.push(i);
    if (i <= 16) {
      blueBallPool.push(i);
    }
  }
  const resultArray = [];
  const getRandom = (arr) => {
    const index = Math.floor(Math.random() * arr.length);
    resultArray.push(arr[index]);
    arr.splice(index, 1);
    if (resultArray.length === 6) return;
    getRandom(arr);
  };
  getRandom(redBallPool);
  resultArray.sort((a, b) => a - b);
  resultArray.forEach((item) => {
    redBallCount[item + ""] += 1;
  });
  resultArray.push(
    blueBallPool[Math.floor(Math.random() * blueBallPool.length)]
  );
  blueBallCount[resultArray[resultArray.length - 1] + ""] += 1;
  console.log("result:", resultArray);
};
for (let i = 0; i < 10; i++) {
  getArr();
}
console.log("count:", redBallCount, blueBallCount);
console.log("time:", new Date().toLocaleString());
