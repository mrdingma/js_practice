// card front
const ccWrapper = document.querySelector("#wrapper");
const ccFrontDots = document.querySelector("#dots");
const bottomRightLogo = document.getElementById("circle-logo");

const expDate = document.querySelector("#exp-date");

const logo = document.querySelector("#logo");
const logoTxt = document.querySelector("#logo-text");
const altLogo = document.querySelector("#altLogo");

const name = document.querySelector("#name");

const el1 = document.querySelector("#e1");
const el2 = document.querySelector("#e2");
const el3 = document.querySelector("#e3");

// card back
const ccv = document.querySelector("#ccv");

// form input
const ccNumberInput = document.querySelector("#in1");
const monthInput = document.querySelector("#in2");
const ccvInput = document.querySelector("#in3");
const nameInput = document.querySelector("#in4");
const clearBtn = document.querySelector("#clearbtn");

const form = document.querySelector("form");
const submitBtn = document.querySelector("#submitbtn");

ccNumberInput.addEventListener("keydown", function (event) {
  var key = event.keyCode || event.charCode;

  if (key == 8 || key == 46) {
    if (this.value.slice(-2).charAt(0) === " ") {
      this.value = this.value.slice(0, this.value.length - 1);
      changeHandler(Number(this.id.match(/[0-9]/g)[0]));
    }
  }
});

clearBtn.addEventListener("click", clearAllInputs);

form.addEventListener("submit", alertData);

function alertData(e) {
  e.preventDefault();

  alert(`CC Number: ${ccNumberInput.value}\n
  Expiration: ${monthInput.value}\n
  CCV: ${ccvInput.value}\n
  Name: ${nameInput.value}`);

  clearAllInputs();
}

function clearAllInputs() {
  ccNumberInput.value = "";
  ccFrontDots.innerText = "●●●● ●●●● ●●●● ●●●●";

  monthInput.value = "";
  expDate.innerText = "●●/●●";

  ccvInput.value = "";
  ccv.innerText = "";

  nameInput.value = "";
  name.innerText = "TabaPay Customer";

  for (let i = 1; i <= 4; i++) {
    changeHandler(i);
  }

  clearButtonToggler();
}

function flipCard(orientation) {
  const isShowingFront = !ccWrapper.classList.contains("flip-card");

  if (orientation === "front" && !isShowingFront) {
    ccWrapper.classList.toggle("flip-card");
  }

  if (orientation === "back" && isShowingFront) {
    ccWrapper.classList.toggle("flip-card");
  }
}

function cardNumValidator() {
  const str = ccNumberInput.value;

  if (str.length === 0) {
    ccNumberInput.classList.remove("error");
    changeTopLeft("TP");
    changeBotRight("TP");
    return true;
  } else {
    ccNumberInput.classList.add("error");
    // AMEX
    if (prefixGet(str, 2) === "37" || prefixGet(str, 2) === "34") {
      changeBotRight("AMEX");

      if (str.length === 17 && !str.match(/[^0-9||\s]/gi)) {
        ccNumberInput.classList.remove("error");
        return true;
      }
      // VISA
    } else if (prefixGet(str, 1) === "4") {
      changeBotRight("VISA");

      if (prefixGet(str, 7) === "4003 90") {
        changeTopLeft("BOA");
      } else if (prefixGet(str, 7) === "4071 10") {
        changeTopLeft("WF");
      } else {
        changeTopLeft("TP");
      }

      if (str.length === 19 && !str.match(/[^0-9||\s]/gi)) {
        ccNumberInput.classList.remove("error");
        return true;
      }
    } else {
      changeTopLeft("TP");
      changeBotRight("TP");
    }
  }
  return false;
}

function changeTopLeft(flag) {
  switch (flag) {
    case "BOA":
      altLogo.src = "https://www.tabapay.com/CI/BA.png";
      logo.classList.add("hide");
      logoTxt.classList.add("hide");
      altLogo.classList.remove("hide");
      break;
    case "WF":
      altLogo.src = "https://www.tabapay.com/CI/WF.png";
      logo.classList.add("hide");
      logoTxt.classList.add("hide");
      altLogo.classList.remove("hide");
      break;
    case "TP":
      logo.classList.remove("hide");
      logoTxt.classList.remove("hide");
      altLogo.classList.add("hide");
      break;
    default:
      console.log(`error TP logo 1`);
  }
}

function changeBotRight(flag) {
  switch (flag) {
    case "AMEX":
      bottomRightLogo.src = `https://www.tabapay.com/CI/A.png`;
      // bottomRightLogo.style.height = "55px";
      break;
    case "VISA":
      bottomRightLogo.src = `https://www.tabapay.com/CI/V.png`;
      bottomRightLogo.style.height = "35px";
      break;
    case "TP":
      bottomRightLogo.src = `https://www.tabapay.com/CI/TabaPay.png`;
      bottomRightLogo.style.height = "55px";
      break;
    default:
      console.log(`error TP logo 2`);
  }
}

function prefixGet(str, count) {
  return str.slice(0, count);
}

function clearButtonToggler() {
  if (
    ccNumberInput.value.length === 0 &&
    monthInput.value.length === 0 &&
    ccvInput.value.length === 0 &&
    nameInput.value.length === 0
  ) {
    clearBtn.disabled = true;
  } else {
    clearBtn.disabled = false;
  }
}

function dateValidator() {
  const str = monthInput.value;

  if (str.length === 0) {
    monthInput.classList.remove("error");
    return true;
  } else {
    monthInput.classList.add("error");

    if (/\d{2}\/\d{2}/gi.test(str)) {
      const [month, year] = str.split("/");
      const currentYear = +new Date().getFullYear().toString().substr(2, 2);

      if (
        month.length === 2 &&
        year.length === 2 &&
        +month >= 1 &&
        +month <= 12 &&
        +year >= currentYear
      ) {
        monthInput.classList.remove("error");
        return true;
      }
    }
  }

  return false;
}

function ccvValidator() {
  const str = ccvInput.value;
  const n = str.length;
  ccvInput.classList.add("error");

  if (n === 0 || (n >= 3 && n <= 4 && !/[^0-9]+/gi.test(str))) {
    ccvInput.classList.remove("error");
    return true;
  }

  return false;
}

function changeHandler(target) {
  switch (target) {
    case 1:
      if (!cardNumValidator()) {
        el1.style.display = "block";
      } else {
        el1.style.display = "none";
      }

      let str = ccNumberInput.value;
      let charCount = str.length;
      if (charCount && charCount % 5 === 0 && str.slice(-1) !== " ") {
        str = str.slice(0, str.length - 1) + " " + str.slice(-1);
        ccNumberInput.value = str;
      }

      clearButtonToggler();

      if (ccNumberInput.value.length !== 0) {
        ccFrontDots.innerText = ccNumberInput.value;
        submitFormVerify();
      } else {
        ccFrontDots.innerText = "●●●● ●●●● ●●●● ●●●●";
      }
      break;
    case 2:
      if (!dateValidator()) {
        el2.style.display = "block";
      } else {
        el2.style.display = "none";
      }

      clearButtonToggler();

      if (monthInput.value.length !== 0) {
        expDate.innerText = monthInput.value;
        submitFormVerify();
      } else {
        expDate.innerText = "●●/●●";
      }
      break;
    case 3:
      if (!ccvValidator()) {
        el3.style.display = "block";
      } else {
        el3.style.display = "none";
      }

      clearButtonToggler();

      if (ccvInput.value.length !== 0) {
        ccv.innerText = ccvInput.value;
        submitFormVerify();
      } else {
        ccv.innerText = "";
      }

      break;
    case 4:
      if (nameInput.value.length !== 0) {
        name.innerText = nameInput.value;
      } else {
        name.innerText = "TabaPay Customer";
      }
      clearButtonToggler();

      submitFormVerify();
      break;

    default:
      console.log(`error in text changer`);
  }
}

function submitFormVerify() {
  const inputsArr = [ccNumberInput, monthInput, ccvInput, nameInput];
  const elArr = [el1, el2, el3];

  for (let input of inputsArr) {
    if (input.value.length === 0) {
      submitBtn.disabled = true;
      return;
    }
  }

  for (let el of elArr) {
    if (window.getComputedStyle(el).display === "block") {
      submitBtn.disabled = true;
      return;
    }
  }

  submitBtn.disabled = false;
}
