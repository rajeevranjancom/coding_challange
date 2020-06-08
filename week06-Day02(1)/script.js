var parentElement = document.querySelector('.parent');
var spanElement = parentElement.querySelectorAll("span");

function name() {
    arr = [];
    for (var i = 0; i < 5; i++) {
        var a = window.prompt("Enter Name :  ");
        arr.push(a);
    }
    return arr;
}

function span_body(name, color, span) {
    if (name.length < 5 || color.length < 5) {
        alert("process can't be done");
    } else if (span.length < 5) {
        alert("span length insufficient");
    } else {
        for (var i = 0; i < 5; i++) {
            var current_span = span[i];
            var current_name = name[i];
            var current_color = color[i];
            current_span.insertAdjacentText('beforeed', "name " + current_name + " & " + "color " + current_color);
            current_span.style.color = current_color;
        }
    }
}
colors = ["#ffffff", "#ee82ee", "#ffa500", "#3cb321"];
span_body(name(), colors, spanElement);