const generateButton = document.getElementById("generateButton");
const decodeButton = document.getElementById("decodeButton");
const dataInput = document.getElementById("data");
const payloadInput = document.getElementById("code");
const outputInput = document.getElementById("o_data");
dataInput.ariaAutoComplete = "none";
payloadInput.ariaAutoComplete = "none";
outputInput.ariaAutoComplete = "none";
let step = 0;
let o_step = 0;
let auto_error = true;
function setDecimalInput(value) {
  is_decimal_input = value;
  DivLOG.log("Decimal input is ", value ? "enabled" : "disabled");
}
function setAutoError(value) {
  auto_error = value;
  DivLOG.log("Auto error is ", value ? "enabled" : "disabled");
}
//Redirect logs to the page
DivLOG.connect(document.getElementById("console"));
async function welcome() {
  await DivLOG.delayedLog(50, ..."Welcome_to_Hamming_Code");
  await DivLOG.delayedLog(25, ..."Start_by_inputting_your_data");
  DivLOG.delayedLog(25, ..."Then_generate_the_code");
}
welcome();
async function generate() {
  DivLOG.clear();
  let value = is_decimal_input
    ? Number(dataInput.value).toString(2)
    : dataInput.value;
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
    await DivLOG.delayedLog(100, "Payload : ", ...value);
    payloadInput.value = value;
    generateButton.textContent = "Find the parity of R_bits";
  } else if (step == 2) {
    DivLOG.log("Finding parity /value of R_bits");
    payloadInput.value = await findParityValue(payloadInput.value, r_value);
    DivLOG.log("Parity was found");
    generateButton.textContent = "Done(Press Send to continue)";
    generateButton.disabled = true;
    payloadInput.removeAttribute("readonly");
  }
  step++;
}
async function send() {
  DivLOG.clear();
  DivLOG.log("Sending code to the receiver");
  await DivLOG.delayedLog(100, ..."Code : ", ...payloadInput.value);

  generateButton.textContent = "Generate Code";
  generateButton.disabled = false;
  dataInput.removeAttribute("readonly");
  let value = payloadInput.value;
  if (auto_error) {
    await sleep(500);
    await DivLOG.delayedLog(
      50,
      ..."Noise",
      ...Math.random().toString(32).slice(2)
    );
    let randomIndex = Math.floor(Math.random() * payloadInput.value.length);
    value = replaceAtIndex(
      payloadInput.value,
      randomIndex,
      payloadInput.value[randomIndex] == 0 ? "1" : "0"
    );
    await DivLOG.delayedLog(
      50,
      ..."Random_error_at_index_",
      value.length - randomIndex
    );
    await DivLOG.delayedLog(100, "Errored Code : ", ...value);
  }
  outputInput.value = value;
  outputInput.scrollIntoView({ behavior: "smooth" });
  step = 0;
  o_step = 0;
  DivLOG.log("Code was sent");
  decodeButton.textContent = "Decode";
}
async function decode() {
  let value = outputInput.value;
  DivLOG.clear();
  if (o_step == 0) {
    outputInput.removeAttribute("readonly");
    DivLOG.log("Decoding code");
    await DivLOG.delayedLog(50, ..."Payload : ", ...value);
    if (!parseInputData(value)) return;
    DivLOG.log("BinaryCheck ✅");
    decodeButton.textContent = "Find m and r";
  } else if (o_step == 1) {
    DivLOG.delayedLog(50, "Finding", ".", ".", ".");
    let [m, r] = await getMandR(value);
    DivLOG.log("m : ", m, " and r : ", r);
    setValue("o_m_value", m);
    setValue("o_r_value", r);
    decodeButton.textContent = "Do the Parity Check";
  } else if (o_step == 2) {
    DivLOG.delayedLog(200, "Finding", ".", ".", ".");
    let fixedValue = await checkParities(value, getValue("o_r_value"));
    if (fixedValue === value) {
      DivLOG.log("No error found");
    } else {
      DivLOG.log("Error was found and fixed");
      value = fixedValue;
      setValue("o_data", value);
    }
    decodeButton.textContent = "Get Data";
  } else if (o_step == 3) {
    DivLOG.delayedLog(200, "Getting Data", ".", ".", ".");
    let data = await getData(value, getValue("o_r_value"));
    DivLOG.log("Data : ", data);
    setValue("o_data", is_decimal_input ? parseInt(data, 2) : data);
    decodeButton.textContent = "Done(Send more to continue)";
  } else {
    decodeButton.textContent = "Decode";
    o_step = 0;
  }
  o_step++;
}
function inputs(e) {
  let value = e.target.value;
  if (is_decimal_input) value = Number(value).toString(2);
  DivLOG.log("data : ", value);
  let success = parseInputData(value);
  if (!success) return;
  setValue("m_value", mValue(value));
}

async function reset() {
  step = 0;
  o_step = 0;
  DivLOG.clear();
  dataInput.value = "";
  payloadInput.value = "";
  outputInput.value = "";
  setValue("m_value", 0);
  setValue("r_value", 0);
  setValue("o_m_value", 0);
  setValue("o_r_value", 0);
  setValue("o_data", 0);
  welcome();
}
function setValue(id, value) {
  document.getElementById(id).value = value;
}
function getValue(id) {
  return Number(document.getElementById(id).value);
}
