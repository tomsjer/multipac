const EventEmitter = require('events');

class Router extends EventEmitter {
  constructor(container) {
    super();

    this.history = [];
    this.paths = {};
    this.container = container;

    this.initListeners();
  }
  initListeners() {

    window.addEventListener('popstate', (e)=> {
      this.container.innerHTML = '';
      this.emit(window.location.pathname);
    });

    this.on(window.location.pathname, ()=>{
      console.log(window.location.pathname);
    });
  }
  start() {
    this.emit(window.location.pathname);
  }
  to(pathname) {
    window.history.pushState({ path: pathname }, null, pathname);
    this.emit(pathname);
  }
}

module.exports = Router;
