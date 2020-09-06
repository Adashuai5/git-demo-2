/*
在一个深度位置的对象当中寻找一个键值对，如果找到返回键值所在的路径，如果没有找到，则返回null。
const obj = {
  a: { b: 2 },
  c: { d: 3 },
};
find(obj, "d", 3); 返回["c", "d"];
*/
const obj = {
  a: { b: 2 },
  g: 1,
  c: { d: { e: 3 } },
  f: 4,
};
const find = (obj, key, value, arr: (number | string)[] = [-1]) => {
  arr[0] = (arr[0] as number) + 1;
  for (let i in obj) {
    if (typeof obj[i] === "object") {
      arr.push(i);
      find(obj[i], key, value, arr);
    } else if (obj[i] === value && i === key) {
      arr.push(i);
      break;
    }
  }
  return arr.slice(-arr[0]);
};
console.log(find(obj, "e", 3));
