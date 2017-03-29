const EventEmitter = require('events');

class Router extends EventEmitter {
  constructor(container) {
    super();

    this.history = [];
    this.paths = {};
    this.container = container;

    this.updateHtml().then(()=>{
      this.initListeners();
    });
  }
  initListeners() {

    const self = this;

    window.addEventListener('popstate', (e)=> {
      e.preventDefault();
      this.updateHtml()
      .then(()=>{
        this.emit(window.location.pathname);
      });
    });
  }
  start() {
    this.updateHtml().then(()=>{
      this.emit(window.location.pathname);
    });
  }
  to(pathname) {
    window.history.pushState({ path: pathname }, null, pathname);
    this.updateHtml()
    .then(()=>{
      this.emit(pathname);
    });
  }
  updateHtml() {
    const self = this;
    const promise = new Promise((resolve, reject)=>{
      fetch(`${window.location.pathname}.html`)
      .then((response)=>{
        response.text().then((html)=>{
          this.container.innerHTML = html;
          document.querySelectorAll('a').forEach((el)=>{
            el.onclick = (e)=>{
              e.preventDefault();
              self.to(e.target.attributes.href.textContent);
            };
          });
          resolve();
        });
      })
      .catch((err)=>{
        console.log(err);
        reject(err);
      });
    });

    return promise;
  }
}

module.exports = Router;
;