// Maybe Monad
const Just = x => ({
  map: f => Just(f(x)),
  chain: f => f(x),
  fold: (_, g) => g(x),  // Success handler
  inspect: () => `Just(${x})`
});

const Nothing = () => ({
  map: () => Nothing(),
  chain: () => Nothing(),
  fold: f => f(),        // Failure handler
  inspect: () => 'Nothing'
});

// 'of' handles null/undefined automatically
const Maybe = {
  of: x => x != null ? Just(x) : Nothing()
};

export default Maybe
