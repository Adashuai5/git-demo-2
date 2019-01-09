function selectSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        var minIndex = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        var temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
var Arr = selectSort([12, 31245, 354, 2, 41, 21]);
console.log(Arr);
function min(a, b) {
    if (a < b) {
        return a;
    }
    else {
        return b;
    }
}
var c = min(1, 2);
console.log(c);
