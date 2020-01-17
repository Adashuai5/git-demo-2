// 元组 Tuple ; interface
interface Person {
  gender: string;
}
function merry(a: Person, b: Person): [Person, Person] {
  if (a.gender !== b.gender) return [a, b];
  throw new Error("异性结合，暂不合法！");
}

let a = { gender: "男" };
let b = { gender: "女" };
console.log(merry(a, b));

// 函数重载
function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: number, b: string): string;
function add(a: any, b: any): any {
  // any 为必需项
  return a + b;
}

let Add1 = add(1, 2);
let Add2 = add("1", "2");
let Add3 = add(1, "2");

console.log(Add1);
console.log(Add2);
console.log(Add3);

// 排序
function selectSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    let temp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

let Arr = selectSort([12, 31245, 354, 2, 41, 21]);
console.log(Arr);

// 取最小
function min(a: number, b: number): number {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}

let c: any = min(1, 2);
console.log(c);
