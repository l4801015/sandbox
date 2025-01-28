const IO = effect => ({
  run: () => effect(),
  map: f => IO(() => effect().then(f)),
  chain: f => IO(() => effect().then(x => f(x).run())),
});

IO.of = x => IO(() => Promise.resolve(x));

const log = value => IO(() => {
  console.log(value);
  return Promise.resolve(value);
});

const erudaInit = type => IO(() => {
  type.instance.init();
  return Promise.resolve(type);
});

const erudaImport = type => IO(() => 
  import('eruda').then(module => {
    type.instance = module.default;
    return type;
  })
);

const colorBackground = type => IO(() => {
  const background = type;
  document.body.style.backgroundColor = background.getColor();
  return Promise.resolve(type);
});

const Eruda = {
  enabled: true,
  instance: null
};

const Background = () => {
  let color = '#333';
  return {
    getColor: () => color,
  }
}

const eruda = IO.of(Eruda)
  .chain(x => erudaImport(x))
  .chain(x => erudaInit(x))
  .chain(x => log(x));

const background = IO.of(Background)
  .chain(x => colorBackground(x))
  .chain(x => log(x));

const main = async () => {
  await eruda.run().catch(e => console.error(e));
  await background.run().catch(e => console.error(e));
};

main();
