const R_BIT_SYMBOL = "x";
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
  while (true) {
    let LHS = Math.pow(2, r);
    let RHS = m + r + 1;
    await sleep(3);
    if (LHS >= RHS) {
      break;
    }
    logCalculation(r, m);
    r++;
  }
  logCalculation(r, m);

  return r;
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
  console.log(value, value.length);
  for (let i = value.length; i > 0; i--) {
    if (value[i] == R_BIT_SYMBOL) {
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
  DivLOG.log("R", bit, " bit map is : ", map.toString());
  let parity = 0;
  let valueMap = {};
  for (let i of map) {
    valueMap["d" + i] = Number(value[value.length - i]);
    parity += valueMap["d" + i];
  }
  DivLOG.log(JSON.stringify(valueMap));
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
