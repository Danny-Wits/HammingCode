const generateButton = document.getElementById("generateButton");
const dataInput = document.getElementById("data");
const payloadInput = document.getElementById("code");
let step = 0;
//Redirect logs to the page
DivLOG.connect(document.getElementById("console"));
DivLOG.log("Welcome to the Hamming Code");
async function generate() {
  DivLOG.clear();
  let value = document.getElementById("data").value;
  let r_value = document.getElementById("r_value").value;

  if (step == 0) {
    dataInput.setAttribute("readonly", true);
    DivLOG.log("Generating code");
    DivLOG.log("Finding suitable R value");
    generateButton.disabled = true;
    setValue("r_value", await rValue(mValue(value)));
    DivLOG.log("R value was found ");
    generateButton.textContent = "Find place for R_bits";
    generateButton.disabled = false;
  } else if (step == 1) {
    DivLOG.log("r = ", r_value);
    DivLOG.log("Finding place for R_bits");
    generateButton.disabled = true;
    value = await generateRBits(r_value, value);
    generateButton.disabled = false;
    DivLOG.log("Places were found");
    DivLOG.log("Payload : ", value);
    payloadInput.value = value;
    generateButton.textContent = "Find the parity of R_bits";
  } else if (step == 2) {
    DivLOG.log("Finding parity /value of R_bits");
    payloadInput.value = await findParityValue(payloadInput.value, r_value);
    DivLOG.log("Parity was found");
    dataInput.setAttribute("readonly", false);
    generateButton.textContent = "Generate Code";
    payloadInput.setAttribute("readonly", false);
  }
  step++;
}
function send() {
  DivLOG.log("Sending code to the receiver");
}
function inputs(e) {
  let value = e.target.value;
  let success = parseInputData(value);
  if (!success) return;
  DivLOG.log("data : ", value);
  setValue("m_value", mValue(value));
}
function setValue(id, value) {
  document.getElementById(id).value = value;
}
