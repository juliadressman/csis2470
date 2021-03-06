
const peopleSort = (people) => {

  const comparator = (a, b) => {
    if (a.lname.toLowerCase() < b.lname.toLowerCase()) return -1;
    else if (a.lname.toLowerCase() > b.lname.toLowerCase()) return 1;
    else if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    else return 0;
  };

  let _people = [...people];
  _people.sort(comparator);
  return _people;
};

const peopleFilter = (people, subString) => {
  return people.filter((p) => {
    return (
      p.name.toLowerCase().startsWith(subString) ||
      p.lname.toLowerCase().startsWith(subString) ||
      p.relation.toLowerCase().startsWith(subString) ||
      p.name.concat(" ").concat(p.lname).toLowerCase().startsWith(subString)
    );
  });
};

const loadJson = async () => {
  const res = await fetch("FriendsandFamily.json");
  let { people } = await res.json();
  return people;
};

const makeList = (people) => {
  let list = document.querySelector("ul");
  while (list.childElementCount) {
    list.removeChild(list.firstElementChild);
  }

  let headerRow = document.createElement("li");
  headerRow.classList.add("person");
  headerRow.classList.add("header");
  let header1 = document.createElement("span");
  let header2 = document.createElement("span");
  let header3 = document.createElement("span");
  header1.textContent = "Last Name";
  header2.textContent = "First Name";
  header3.textContent = "Relation";
  headerRow.appendChild(header1);
  headerRow.appendChild(header2);
  headerRow.appendChild(header3);
  list.appendChild(headerRow);

  for (let p of people) {
    let li = document.createElement("li");
    li.classList.add("person");
    li.id = p.name.toLowerCase().concat(p.lname.toLowerCase());
    let name = document.createElement("span");
    let lname = document.createElement("span");
    let relation = document.createElement("span");
    name.textContent = p.name;
    lname.textContent = p.lname;
    relation.textContent = p.relation;
    li.appendChild(lname);
    li.appendChild(name);
    li.appendChild(relation);
    list.appendChild(li);
  }
  document.querySelector("main").appendChild(list);
};

const populateSelects = (people) => {
  let fname = document.querySelector(".fname");
  let lname = document.querySelector(".lname");
  for (let p of people) {
    let fOption = document.createElement("option");
    let lOption = document.createElement("option");
    fOption.value = p.name;
    fOption.textContent = p.name;
    lOption.value = p.lname;
    lOption.textContent = p.lname;
    fname.appendChild(fOption);
    lname.appendChild(lOption);
  }
};

const results = async (filter = "") => {
  let people = await loadJson();
  let filtered = await peopleFilter(people, filter);
  let sorted = peopleSort(filtered);
  if (document.querySelector(".fname").childElementCount <= 1) {
    populateSelects(sorted);
  }
  makeList(sorted);
};

document.body.addEventListener("load", () => results(), true);

document
  .querySelector(".name")
  .addEventListener(
    "input",
    (e) => results(e.target.value.toLowerCase()),
    true
  );

document
  .querySelector(".fname")
  .addEventListener(
    "input",
    (e) => results(e.target.value.toLowerCase()),
    true
  );
document
  .querySelector(".lname")
  .addEventListener(
    "input",
    (e) => results(e.target.value.toLowerCase()),
    true
  );