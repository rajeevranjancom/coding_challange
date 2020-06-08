class Fruit {
    constructor (name,color) {
        this.name = name;
        this.color = color;
    }

    ripe () {
        console.log(`${this.name} has ripened`);
    }

    grow () {
        console.log(`${this.name} has grown`);
    }
}

class Apple extends Fruit {
    constructor (name,color,type,variety) {
        super(name,color);
        this.type = type;
        this.variety = variety;
    }
}

const apple01 = new Apple("apple01","red","type01","variety01");
console.log(apple01);
apple01.ripe();