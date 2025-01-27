// IO.js
const IO = (effect) => ({
  // Functor: Transform the result (pure function)
  map: (f) => IO(() => effect().then(f)),

  // Monad: Chain IO actions (can handle async)
  chain: (f) => IO(() => effect().then((x) => f(x).run())),

  // Execute the effect (returns a Promise)
  run: () => effect(),

  // Fantasy Land compatibility aliases
  ap: (other) => IO(() => effect().then(f => other.run().then(x => f(x)))),
  of: (value) => IO(() => Promise.resolve(value)),
});

// Static constructor for values
IO.of = (value) => IO(() => Promise.resolve(value));

// Static constructor for node-style callbacks
IO.fromNode = (fn) => IO(() => new Promise((resolve, reject) => {
  fn((err, data) => err ? reject(err) : resolve(data));
}));

export default IO;
