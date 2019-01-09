function min(a: number, b: number): number {
    if (a < b) {
        return a;
    } else {
        return b;
    }
}

let c: any = min(1, 2);
console.log(c);