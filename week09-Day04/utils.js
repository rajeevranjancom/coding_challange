let traverseObjectArray = data =>{
    let datareturn = ''
    for(let elem in data){
        datareturn += `
Object ${elem} data is
Name    :  ${data[elem].Name}
Age     : ${data[elem].Age}
Address : ${data[elem].Address}
`
    }
    return datareturn
}

let addAgeToObjectPosition = (age, position, data)=>{
    let newobj = data.data[position]
    newobj.Age = age
    console.log(`The Age Value Changed At position : ${position} is : ${age}
    `)
    return newobj
}
module.exports = {
    traverseObjectArray : traverseObjectArray,
    addAgeToObjectPosition : addAgeToObjectPosition,
}