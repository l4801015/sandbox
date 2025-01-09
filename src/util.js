// Eruda initialization (side effect) -----------------

const initEruda = (eruda) => (settings) => {
  eruda.init();
  return settings;
}
 
// Logging Massage (side effect) ----------------------

const logMessage = (message) => (data) => {
  setTimeout(() => console.log(message), 1500);
  return data;
}

// Display canvas element (side effect) ---------------

const displayCanvas = (name) => (data) => {
  const canvas = document.createElement('canvas');
  canvas.id = name;
  document.body.appendChild(canvas);
  return data;
}

// Fullscreen canvas (side effect) --------------------

const fullscreenCanvas = (name) => (data) => {
  const canvas = document.getElementById(name);
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  return data;
}

// Background canvas color (side effect) --------------

const backgroundCanvas = (name, color) => (data) => {
  const canvas = document.getElementById(name);
  canvas.style.backgroundColor = color;
  return data;
}

// Exports --------------------------------------------

export { 
  initEruda,
  logMessage,
  displayCanvas,
  fullscreenCanvas,
  backgroundCanvas
};
