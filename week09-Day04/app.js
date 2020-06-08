let [data, rendereddata] = [require('./students'), require('./utils')]

console.log(rendereddata.traverseObjectArray(data.data) + "\n\n")

console.log(rendereddata.addAgeToObjectPosition(30, 5, data))