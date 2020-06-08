
let [arr,largenumber] = [[1,22,4,3,553,6454,1000,99,65]];
largenumber = arr.sort((a,b)=>{return a-b})[arr.length-  1];

console.log(largenumber)