let [arr, counter] = [[1,2,3,4,5] , 0];

for(let elem in arr){
    counter += arr[elem];
    
}
console.log(counter)