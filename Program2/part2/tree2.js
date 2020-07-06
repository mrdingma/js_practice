function hasChildren(parentName) {
  return dummydata2.some(function (el) {
    return el.parent === parentName;
  });
}

function getChildren(parentName) {
  return dummydata2.filter(function (el) {
    return el.parent === parentName;
  });
}

function createListItem(el) {
  const li = document.createElement("li"),
    span = document.createElement("span"),
    bullet = document.createTextNode("⦿ ");

  li.id = el.name;
  if (hasChildren(el.name)) {
    span.classList.add("caret");
    span.addEventListener("click", expand);
  } else {
    li.appendChild(bullet);
  }
  span.textContent = el.name;
  li.appendChild(span);
  return li;
}

function expand(event) {
  const target = event.target,
    parent = target.parentElement,
    id = parent.id,
    kids = getChildren(id),
    items = kids.map(createListItem),
    ul = document.createElement("ul");

  items.forEach(function (li) {
    ul.appendChild(li);
  });

  parent.appendChild(ul);
  target.classList.toggle("caret-down");
  target.removeEventListener("click", expand);
  target.addEventListener("click", collapse);
}

function collapse(event) {
  const target = event.target,
    parent = target.parentElement,
    ul = parent.querySelector("ul");

  parent.removeChild(ul);
  target.classList.toggle("caret-down");
  target.removeEventListener("click", collapse);
  target.addEventListener("click", expand);
}

function buildTree() {
  const root = document.querySelector("#root"),
    rootArr = dummydata2.filter((item) => item.parent === null);

  if (rootArr.length) {
    const listItemArr = rootArr.map(createListItem);
    ul = document.createElement("ul");
    listItemArr.forEach((item) => ul.appendChild(item));

    root.appendChild(ul);
  }
}

buildTree();
