// Define a simple State monad
const State = (runState) => ({
  run: runState,
  map: (f) => State((s) => {
    const [newState, value] = runState(s);
    return [newState, f(value)];
  }),
  flatMap: (f) => State((s) => {
    const [newState, value] = runState(s);
    return f(value).run(newState); // f(value) returns a new State
  }),
});

// define a State monad helpers
const get = () => State((state) => [state, { ...state }]);
const put = (newState) => State(() => [newState, undefined]);

// Define a simple Identity monad
const Identity = x => ({
  emit: () => x,
  chain: f => f(x),
  map: f => Identity(f(x)),
  inspect: () => `Identity(${x})`
});

// Define a simple IO monad
const IO = fn => ({
    run: () => fn(),
    map: func => IO(() => func(fn())),
    chain: func => IO(() => func(fn()).run()),
    inspect: () => `IO(${fn.toString()})`
});

// define a simple Maybe monad
const Maybe = x => ({
  isJust: () => x !== null || x !== undefined,
  isNothing: () => x === null || x === undefined,
  map: f => Maybe(f(x)),
  inspect: () => `Maybe(${x})`
});

// define a simple Maybe monad helpers
const Nothing = () => Maybe(null || undefined);
const Just = x => Maybe(x);

// define a simple Either monad
const Either = (left, right) => ({
  isLeft: () => left !== null && right === null,
  isRight: () => right !== null && left === null,
  map: f => Either(f(left), right),
  inspect: () => `Either(${left}, ${right})`
});

// define a simple Either monad helpers
const Left = x => Either(x, null || undefined);
const Right = x => Either(null || undefined, x);

export { 
  State,
  Identity,
  IO,
  Maybe,
  Nothing,
  Just,
  Either,
  Left,
  Right
};
