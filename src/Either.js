const Either = {
  Right: (value) => ({
    map: (fn) => Either.Right(fn(value)),
    chain: (fn) => fn(value),
    fold: (_, onRight) => onRight(value),
  }),
  Left: (error) => ({
    map: () => Either.Left(error),
    chain: () => Either.Left(error),
    fold: (onLeft, _) => onLeft(error),
  }),
  of: (value) => Either.Right(value),
};

export default Either;
