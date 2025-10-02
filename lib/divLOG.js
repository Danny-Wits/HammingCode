const DivLOG = {
  connect: function (div) {
    this.div = div;
    this.hasDetailedLog = false;
    return this;
  },
  setDetailedLog: function (value) {
    this.hasDetailedLog = value;
    DivLOG.log("Detailed Logs ", value ? "enabled" : "disabled");
  },
  log: function (...messages) {
    this.div.innerHTML += `<li>${messages.join("")}</li>`;
    this.div.scrollTop = this.div.scrollHeight;
  },
  detailedLog: function (...messages) {
    if (this.hasDetailedLog) this.log(...messages);
  },
  delayedLog: async function (time, ...messages) {
    const li = document.createElement("li");
    this.div.appendChild(li);
    for (let message of messages) {
      li.innerText += message;
      await sleep(time);
    }
  },

  clear: function () {
    this.div.innerHTML = ``;
  },
};
