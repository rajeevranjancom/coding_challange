
// 1. { a: 1, b: 2, c: 3 } = { a: ‘1 Cola’, b: ‘2 Cola’, c: ‘3 Cola’ }

function addCola(AddCola, num1, num2, num3) {
  this.a = `${num1} ${AddCola} `;
  this.b = `${num2}  ${AddCola}`;
  this.c = `${num3} ${AddCola}`;
}

addCola.prototype.fill = function() {
  addCola.prototype.a = 1;
  addCola.prototype.b = 2;
  addCola.prototype.d = 3;
};

var obj = new addCola("Cola", 1, 2, 3, 4);
console.log(obj);
/////////////////////////////////////////////////////////////////////////////
// var given = "stark";
// var insert = "ironman";

function placemeAlternatively(insert, given) {
  var third = [];
  // var sum = given.length + insert.length;
  // console.log(sum);
  if (isNaN(insert)) {
    if (given.length == insert.length) {
      console.log("they are equal");
      for (let j = 0; j < given.length; j++) {
        third[j] = given[j];
        console.log(third[j]);
        third[j + 1] = insert[j];
        console.log(third[j + 1]);
      }
    } else {
      console.log("The length of both are not equal");
      var lenGiven = given.length;
      // console.log(lenGiven);
      var resultString = insert.length;
      // console.log(resultString);
      var subStr = insert.substring(lenGiven, resultString);
      // console.log(subStr);
      for (let j = 0; j < given.length; j++) {
        third[j] = given[j];
        console.log(third[j]);
        third[j + 1] = insert[j];
        console.log(third[j + 1]);
      }
      for (let j = 0; j < subStr.length; j++) {
        const element = subStr[j];
        console.log(element);
      }
    }
  } else {
    console.log("The given string is number");
    console.log(given);
  }
}

var obj = new placemeAlternatively("ironman", "stark");
console.log(obj);
