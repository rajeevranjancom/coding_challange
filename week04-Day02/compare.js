let [arr1, arr2, result] = [[1,2,3,4,5], [1,2,3,4,55], ''];

function check(){
    if(arr1.length === arr2.length){
        for(let i=0; i<arr1.length; i++){
          if(arr1[i] === arr2[i]){
            result = 'Arrays Match';
            
          }else{
            result = 'Arrays Doesnt match'
          }
        }
    }else{
        result =  `Arrays Lenght Doesn't Match`;
    }
    return result;
}

console.log(check())