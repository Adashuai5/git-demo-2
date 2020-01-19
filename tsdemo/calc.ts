#!/usr/bin/env ts-node
{
  let N1: number = parseInt(process.argv[2]);
  let operator: string = process.argv[3];
  let N2: number = parseInt(process.argv[4]);
  if (Number.isNaN(N1) || Number.isNaN(N2)) {
    console.log("请输入整数");
    process.exit(1); // 非 0 为出错退出
  }

  if (operator === "+") {
    console.log(N1 + N2);
  } else if (operator === "-") {
    console.log(N1 - N2);
  } else if (operator === "*") {
    console.log(N1 * N2);
  } else if (operator === "\\") {
    if (N2 === 0) {
      console.log("除数不能为 0 ");
      process.exit(2); // 非 0 为出错退出
    }
    console.log(N1 / N2);
  }
  process.exit(0); // 程序正常退出
}
