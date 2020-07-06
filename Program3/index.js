function getData(url) {
  return axios.get(url).then((response) => response.data.split("\n"));
}

async function processedData() {
  const url1 = "https://publictest.sandbox.tabapay.net/data1";
  const url2 = "https://publictest.sandbox.tabapay.net/data2";
  try {
    let nameArr = await getData(url1);
    nameArr = nameArr.map((data) => data.replace(/[^a-zA-Z]/gi, ""));

    let dataArr = await getData(url2);

    insertRows(nameArr, dataArr);
  } catch (e) {
    console.log(e);
  }
}

function insertRows(nameArr, dataArr) {
  const table = document.querySelector("table");
  for (let i = 0; i < nameArr.length - 1; i++) {
    const [currentName] = nameArr[i].split(",");
    const currentData = dataArr[i].split(",");

    const tr = document.createElement("tr");
    const nameData = document.createElement("td");
    nameData.innerText = currentName;

    const idData = document.createElement("td");
    idData.innerText = currentData[0];

    const pullCountData = document.createElement("td");
    pullCountData.innerText = `${currentData[2]} of ${currentData[1]}`;
    const pullAmountData = document.createElement("td");
    pullAmountData.innerText = `${currentData[4]} of ${currentData[3]}`;

    const pushCountData = document.createElement("td");
    pushCountData.innerText = `${currentData[6]} of ${currentData[5]}`;
    const pushAmountData = document.createElement("td");
    pushAmountData.innerText = `${currentData[8]} of ${currentData[7]}`;

    tr.appendChild(nameData);
    tr.appendChild(idData);
    tr.appendChild(pullCountData);
    tr.appendChild(pullAmountData);
    tr.appendChild(pushCountData);
    tr.appendChild(pushAmountData);

    table.appendChild(tr);
  }
}

processedData();
