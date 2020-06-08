let result = '';
for(let i = 1; i<=5; i++){
    for(let j = 0; j<i; j++){
        result += '*';
    }
    result += '\n';
}
for(let i = 4; i>0; i--){
    for(let j = 0; j<i; j++){
        result += '*';
    }
    result += '\n';
}

console.log(result)