#!/usr/bin/env ts-node

const arr1 = [];
const arr2 = [];
for (let i = 1; i <= 33; i++) {
  arr1.push(i);
  if (i <= 16) {
    arr2.push(i);
  }
}
const getObj = (arr) => {
  const obj = {};
  arr.forEach((item) => {
    obj[item] = 0;
  });
  return obj;
};

const obj1 = getObj(arr1);
const obj2 = getObj(arr2);

const getArr = () => {
  const six = [];
  const getRandom = (arr) => {
    const index = Math.floor(Math.random() * arr.length);
    six.push(arr[index]);
    arr.splice(index, 1);
    if (six.length === 6) return;
    getRandom(arr);
  };
  getRandom(arr1);
  six.sort((a, b) => a - b);
  six.forEach((item) => {
    obj1[item + ""] += 1;
  });
  six.push(arr2[Math.floor(Math.random() * arr2.length)]);
  obj2[six[six.length - 1] + ""] += 1;
  console.log(obj1, obj2);
};
for (let i = 0; i < 10; i++) {
  getArr();
}
