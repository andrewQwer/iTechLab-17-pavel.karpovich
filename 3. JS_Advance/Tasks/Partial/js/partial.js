let Partial = (func, ...partialArgs) => (...args) =>
  func.apply(this, newArgs.concat(args));

let G = (...args) => console.log(args);

F(G, 1, 2, 3, 4, 5, 6, 7)(8, 9, 10);

export {Partial}