#!/usr/bin/env ts-node
let aaa: number = parseInt(process.argv[2]);
let bbb: number = parseInt(process.argv[3]);
if (Number.isNaN(aaa) || Number.isNaN(bbb)) {
  console.log("请输入整数");
  process.exit(1) // 非 0 为出错退出
}
console.log(aaa + bbb);
process.exit(0) // 程序正常退出
