import eruda from 'eruda';
eruda.init();

const state = (runstate) => ({
  run: runstate,

  map: (f) => state((s) => {
    const [newstate, value] = runstate(s);
    return [newstate, f(value)];
  }),

  flatmap: (f) => state((s) => {
    const [newstate, value] = runstate(s);
    return f(value).run(newstate); // Ensure f(value) returns a valid state
  }),

  pipe: function (...fns) {
    return fns.reduce((acc, fn) => acc.flatmap(fn), this);
  },
  fork: function (...fns) {
    return null
  }
});

const settings = {
  eruda: false
};

// Example transformation functions
const increment = (n) => state((s) => [s + 1, n + 1]);
const double = (n) => state((s) => [s + 2, n * 2]);

// Using the pipe function
const initialState = 0;
const computation = state((s) => [s, 0])
  .pipe(increment, double)

const [finalState, result] = computation.run(initialState);

console.log(`Final State: ${finalState}, Result: ${result}`);

