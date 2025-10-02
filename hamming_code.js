const R_BIT_SYMBOL = "x";
let is_decimal_input = true;
function isBinary(number) {
  let flag = true;
  number
    .toString()
    .split("")
    .forEach((element) => {
      if (element !== "0" && element !== "1") {
        flag = false;
      }
    });
  DivLOG.detailedLog("Testing binary : ", number, flag ? "✅" : "❌");
  return flag;
}
function parseInputData(value) {
  if (!isBinary(value)) {
    DivLOG.log("Input data is not binary");
    return false;
  }
  return true;
}

function mValue(value) {
  return value.length;
}
async function rValue(m) {
  let r = 0;
  while (!(await rValueCheck(m, r))) {
    r++;
  }
  return r;
}
async function rValueCheck(m, r) {
  let LHS = Math.pow(2, r);
  let RHS = m + r + 1;
  await sleep(200);
  logCalculation(r, m);
  if (LHS >= RHS) {
    return true;
  }
  return false;
}

async function generateRBits(r, value) {
  let len = value.length;
  for (let i = 0; i < r; i++) {
    let insertionIndex = len + 1 - Math.pow(2, i) + i;
    value = addAtIndex(value, insertionIndex, R_BIT_SYMBOL);
  }
  return value;
}
async function findParityValue(value, r_value) {
  for (let i = value.length; i > 0; i--) {
    if (value[i] == R_BIT_SYMBOL) {
      await sleep(200);
      value = replaceAtIndex(
        value,
        i,
        await findParityOfR_BIT(value, value.length - i)
      );
      console.log(value);
    }
  }
  return value;
}
async function findParityOfR_BIT(value, bit) {
  let map = (await getMap(value.length, bit)).slice(1);
  DivLOG.detailedLog("R", bit, " bit map is : ", map.toString());
  let parity = 0;
  let valueMap = {};
  for (let i of map) {
    valueMap["d" + i] = Number(value[value.length - i]);
    parity += valueMap["d" + i];
  }
  DivLOG.detailedLog(JSON.stringify(valueMap));
  DivLOG.log("Parity of R", bit, " bit is : ", parity % 2);
  return parity % 2 ? "1" : "0";
}
async function getMap(size, r_bit) {
  let map = [];
  for (let i = 1; i <= size; i++) {
    if (Math.floor(i / r_bit) % 2 === 1) {
      map.push(i);
    }
  }
  return map;
}

async function getMandR(value) {
  await sleep(1);
  let len = value.length;
  let r = 0;
  while (!(await rValueCheck(len - r, r))) {
    r++;
  }
  return [len - r, r];
}
async function checkParities(value, r) {
  let length = value.length;
  let parity_results = {};
  let total_parity = 0;
  for (let i = 1; i <= r; i++) {
    await sleep(100);
    parity_results[i] = await checkParity(value, i);
    total_parity += parity_results[i] ? 0 : 1;
  }
  DivLOG.delayedLog(JSON.stringify(parity_results));

  if (total_parity == 0) {
    return value;
  } else {
    let error_string = "";
    await DivLOG.delayedLog(50, ..."Parity_check_failed");
    for (let p of Object.keys(parity_results)) {
      error_string += parity_results[p] ? "0" : "1";
    }
    await sleep(1000);
    //reverse
    error_string = error_string.split("").reverse().join("");
    DivLOG.clear();
    DivLOG.log("Error string is : ", error_string);
    const index = parseInt(error_string, 2);
    DivLOG.log("Error index is : ", index);
    await DivLOG.delayedLog(50, ..."Fixing_error...");
    value = replaceAtIndex(
      value,
      length - index,
      value[length - index] == 0 ? "1" : "0"
    );
    DivLOG.log("Fixed value is : ", value);
    DivLOG.log("Checking again ");
    await checkParities(value, r);
    return value;
  }
}
async function checkParity(value, r) {
  let map = await getMap(value.length, Math.pow(2, r - 1));
  DivLOG.detailedLog("R", r, " bit map is : ", map.toString());
  let parity = 0;
  let valueMap = {};
  for (let i of map) {
    valueMap["d" + i] = Number(value[value.length - i]);
    parity += valueMap["d" + i];
  }
  DivLOG.detailedLog(JSON.stringify(valueMap));
  DivLOG.log("Parity of R", r, " bit found is : ", parity % 2);
  return parity % 2 == 0;
}
async function getData(value, r) {
  let data = "";
  let r_bits_position = [];
  for (let i = 0; i < r; i++) {
    let insertionIndex = value.length - Math.pow(2, i);
    r_bits_position.push(insertionIndex);
  }
  DivLOG.detailedLog("R bits positions are : ", r_bits_position);
  for (let i = 0; i < value.length; i++) {
    if (r_bits_position.includes(i)) continue;
    data += value[i];
  }
  return data;
}
//! helpers
function logCalculation(r, m) {
  let LHS = Math.pow(2, r);
  let RHS = m + r + 1;
  DivLOG.log(" 2<sup>", r, "</sup> [", LHS, "] >= m + r + 1 [", RHS, "]");
  DivLOG.log("r : ", r, LHS >= RHS ? " ✅" : " ❌");
}
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function addAtIndex(string, index, element) {
  return string.slice(0, index) + element + string.slice(index);
}
function replaceAtIndex(string, index, element) {
  return string.slice(0, index) + element + string.slice(index + 1);
}
