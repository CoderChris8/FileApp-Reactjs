"use strict";

var _tls = require("tls");

function person(name, age) {
    this.name = name;
    this.age = age;
}

var chris = new person("Chris", 24);
var cris = new person("Cris", 20);

console.log(chris);
console.log(chris.name);
console.log(cris);
console.log(cris.age);
//# sourceMappingURL=test.js.map