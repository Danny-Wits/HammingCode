const DivLOG = {
  connect: function (div) {
    this.div = div;
    return this;
  },
  log: function (...messages) {
    this.div.innerHTML += `<li>${messages.join("")}</li>`;
    this.div.scrollTop = this.div.scrollHeight;
  },
  clear: function () {
    this.div.innerHTML = ``;
  },
};
