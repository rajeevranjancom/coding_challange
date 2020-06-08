var arr = [];
var ob = [];
var percentage = 0;

for (var i = 0; i < 10; i++) {
    percentage = window.prompt("Enter student  attendance in percentage: ");
    ob[0] = percentage;



    if (percentage >= 81 && percentage <= 100) {
        ob[1] = 5000
    } else if (percentage >= 61 && percentage <= 80) {
        ob[1] = 3500
    } else if (percentage >= 41 && percentage <= 60) {
        ob[1] = 3500
    } else if (percentage >= 0 && percentage <= 40) {
        ob[1] = 3500
    } else {
        alert("Invalid value")
        i = i - 1;
        continue;

    }

    arr.push(ob);
    ob = []
}


for (var i = 0; i < 10; i++) {
    document.write("{attendance" + ":" + arr[i][0] + ",stipend" + ":" + "Rs." + arr[i][1] + "}</br>");
}