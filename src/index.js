//import eruda from 'eruda';

const Identity = x => ({
  fold: () => x,
  map: f => Identity.of(f(x)),
  chain: f => f(x),
});

const IO = effect => ({
  run: () => effect(),
  map: f => IO(() => effect().then(f)),
  chain: f => IO(() => effect().then(x => f(x).run())),
});

IO.of = x => IO(() => Promise.resolve(x));

const log = value => IO(() => {
  console.log(value);
  return Promise.resolve();
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

const Eruda = {
  enabled: true,
  instance: null
};

const pipe = IO.of(Eruda)
  .chain(x => erudaImport(x))
  .chain(x => erudaInit(x))
  .chain(x => log(x));

pipe.run().catch(e => console.error(e));

document.body.style.backgroundColor = '#333';
