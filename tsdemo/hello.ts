function sayHello(person: Array) {
  return 'Hello, ' + person;
}

let user = [0, 1, 2];
console.log(sayHello(user));

function getLength(something: string | number)  {
  return something.toString();
}