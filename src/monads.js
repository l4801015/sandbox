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



// Define a simple IO monad
const IO = fn => ({
    run: () => fn(),
    map: func => IO(() => func(fn())),
    chain: func => IO(() => func(fn()).run()),
    inspect: () => `IO(${fn.toString()})`
});

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

const Identity = {
  of: (value) => identity(value)
};

export default Identity;
