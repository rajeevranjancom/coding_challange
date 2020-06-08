// Method 1

let [arr, check, largestnumber] = [[1,22,4,3,553,6454,1000,99,65], 0];

for(let elem in arr){
    if(arr[elem] > check){
        check = arr[elem];
    }
}
largestnumber  = check;
console.log(largestnumber)


// Method 2

let [arr,largenumber] = [[1,22,4,3,553,6454,1000,99,65]];
largenumber = arr.sort((a,b)=>{return a-b})[arr.length-  2];

console.log(largenumber)