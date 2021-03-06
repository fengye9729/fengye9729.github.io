# class 与 class 的继承

ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

> ES6 的 class 区别 ES5 构造函数实现的类

- 类的内部所有定义的方法，都是不可枚举的 ; 采用 ES5 的写法，原型上的方法就是可枚举的。
- 类必须使用 new 调用，否则会报错; 构造函数不用 new 也可以执行。
- 类不存在变量提升（hoist）

**实例属性新写法**
实例属性除了定义在 constructor() 方法里面的 this 上面，也可以定义在类的最顶层。这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

**静态方法 与 静态属性**
- 静态方法
  - 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
  - 如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
  - 如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例。
  - 父类的静态方法，可以被子类继承。
  - 静态方法也是可以从super对象上调用的。

- 静态属性
  静态属性指的是 Class 本身的属性，即 Class.propName，而不是定义在实例对象（this）上的属性。
(目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。)(现在有一个提案提供了类的静态属性，写法是在实例属性法的前面，加上 static 关键字。)

> class 继承

Class 可以通过 extends 关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

```js
class Point {
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
// super :父类的构造函数，用来新建父类的this对象。
```
- 子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
- 如果子类没有定义 constructor 方法，这个方法会被默认添加
在子类的构造函数中，只有调用 super 之后，才可以使用 this 关键字，否则会报错。子类实例的构建，基于父类实例，只有 super 方法才能调用父类实例。
- 父类的静态方法，也会被子类继承。
- Object.getPrototypeOf 方法可以用来从子类上获取父类。
- super 这个关键字，既可以当作函数使用，也可以当作对象使用
  - 作为函数调用时：
    - super 作为函数调用时，代表父类的构造函数。但是指向子类，返回的是子类的实例
    - 作为函数时，super() 只能用在子类的构造函数之中，用在其他地方就会报错。
  - 作为对象调用时：
    - super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
    - 在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例。
    - 在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例。