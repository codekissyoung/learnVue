// 构造函数示例
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 在原型上添加方法
Person.prototype.sayHello = function() {
    return `Hello, my name is ${this.name}`;
};
Person.prototype.eat = function() {
    return `${this.name} is eating`;
};

// 创建实例
const person1 = new Person('Alice', 25);
const person2 = new Person('Bob', 30);

console.log('person1:', person1);
console.log('person1.sayHello():', person1.sayHello());
console.log('person2.eat():', person2.eat());

// 原型链继承示例
function Student(name, age, major) {
    // 继承属性
    Person.call(this, name, age);  // 调用父类构造函数，继承父类的属性
    this.major = major;  // 添加子类特有的属性
}

// 继承方法（设置原型链）
Student.prototype = Object.create(Person.prototype);  // 创建一个以Person.prototype为原型的对象，并将其设为Student的原型
// 修复构造函数指向
Student.prototype.constructor = Student;  // 重置constructor属性，使其指向Student本身

// 添加子类特有方法
Student.prototype.study = function() {
    return `${this.name} is studying ${this.major}`;
};

const student1 = new Student('Charlie', 22, 'Computer Science');
console.log('\nstudent1:', student1);
console.log('student1.sayHello():', student1.sayHello()); // 继承自Person
console.log('student1.study():', student1.study()); // Student特有方法

// 原型链查找演示
console.log('\n原型链查找演示:');
console.log('student1.__proto__ === Student.prototype:', student1.__proto__ === Student.prototype);
console.log('Student.prototype.__proto__ === Person.prototype:', Student.prototype.__proto__ === Person.prototype);
console.log('Person.prototype.__proto__ === Object.prototype:', Person.prototype.__proto__ === Object.prototype);
console.log('Object.prototype.__proto__:', Object.prototype.__proto__); // null，原型链的终点
