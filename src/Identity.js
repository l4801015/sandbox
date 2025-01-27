const Identity = {
  of: value => ({
    map: f => Identity.of(f(value)),
    chain: f => f(value),
    fold: () => value,
    inspect: () => `Identity(${value})`
  })
};

export default Identity
