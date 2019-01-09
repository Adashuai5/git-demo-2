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

let Arr = selectSort([12,31245,354,2,41,21]);
console.log(Arr);

function min(a: number, b: number): number {
    if (a < b) {
        return a;
    } else {
        return b;
    }
}

let c: any = min(1, 2);
console.log(c);