'use strict';

function f(){
    console.log(this)
}

f()

let f1 = new f()

var j = {
    name: "link",
    f : f
}

j.f()




