const root = document.querySelector(".root");

function buildTree(data, node) {
  const listItem = document.createElement("li");
  const textSpan = document.createElement("span");

  if (data.children.length) {
    const newNode = document.createElement("ul");

    newNode.classList.add("nested");

    textSpan.innerText = data.title;
    textSpan.classList.add("caret");

    listItem.appendChild(textSpan);
    listItem.appendChild(newNode);

    node.appendChild(listItem);

    data.children.forEach((child) => buildTree(child, newNode));
  } else {
    textSpan.innerText = data.title;
    const textSpan2 = document.createTextNode("⦿ ");

    listItem.appendChild(textSpan2);
    listItem.appendChild(textSpan);
    node.appendChild(listItem);
  }
}

buildTree(dummydata, root);

const carets = document.querySelectorAll(".caret");

carets.forEach((caret) => {
  caret.addEventListener("click", function () {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
});
