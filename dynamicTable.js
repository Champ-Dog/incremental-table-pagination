data = [];

const tableBody = document.getElementById("table-body");
const tableFooter = document.getElementById("footer");

function renderTableElement(element) {
  const rows = `<tr>
                  <td>${element.name}</td>
                  <td>${element.value}</td>
                </tr>`;
  tableBody.insertAdjacentHTML("beforeend", rows);
}

const itemsPerPage = 10;
let nextPageThreshold = itemsPerPage;
let pagesExist = 0;

function processResults(result, moreResults) {
  if (moreResults) {
    data.push(result);
    if (data.length < itemsPerPage + 1) {
      renderTableElement(result);
    }
    if (data.length == nextPageThreshold) {
      pagesExist++;
      newPage(pagesExist);
      nextPageThreshold += itemsPerPage;
    }
  }
  if (!moreResults) {
    if (pagesExist > Math.ceil(dataSet.length / itemsPerPage)) {
      pagesExist++;
      newPage(pagesExist);
    }
  }
}

function newPage(num) {
  let newPageNum = `<th onclick="showPage(${num})">${num}</th>`;
  tableFooter.insertAdjacentHTML("beforeend", newPageNum);
}

function showPage(pageNum) {
  tableBody.innerHTML = "";
  const start = (pageNum - 1) * itemsPerPage;
  const end = pageNum * itemsPerPage;
  for (let i = start; i < end; i++) {
    data[i] ? renderTableElement(data[i]) : null;
  }
}

async function createSomeData(quantity) {
  for (let i = 1; i < quantity; i++) {
    await requestDelayInterval(500);
    newObject = {
      name: `Element${i}`,
      value: `${i}`,
    };
    processResults(newObject, true);
  }
  processResults("", false);
}

const requestDelayInterval = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

createSomeData(52);
