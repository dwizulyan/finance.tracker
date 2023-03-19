// Initializing the dropdown
const dropdownButton = document.querySelector(".fa-chevron-circle-down");
const dropdownMenu = document.querySelector(".dropdown-menu");

// init the submit button
const submitButton = document.querySelector(".submit");

// init the wrapper of the records
const recordsWrapper = document.querySelector(".records-list");

// init the inputs values
const balance = document.querySelector(".balance");
const categoryRecords = document.querySelector(".category");

// init the totalBalance Tag
const totalBalanceText = document.querySelector(".totalBalance");

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  insertRecords(Number(balance.value), categoryRecords.value.trim());
  renderTotalBalance();
  renderRecords();
  balance.value = "";
});

// Function to insert the data to the local storage
function insertRecords(...data) {
  if (balance.value.trim() === "") return;
  const opt = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const dataToObj = {
    balance: data[0],
    category: data[1],
    timeAdded: new Date(Date.now()).toLocaleString("en-EN", opt),
  };
  console.log(dataToObj);
  const dataRecords = JSON.parse(localStorage.getItem("records")) || [];
  dataRecords.push(dataToObj);
  localStorage.setItem("records", JSON.stringify(dataRecords));
}

// Function for rendering the balance records
function renderRecords() {
  const data = JSON.parse(localStorage.getItem("records")) || [];
  const balance = (recordsWrapper.innerHTML = data
    .map(
      (item) =>
        `
     <div class="item">
    <h3>${formatCurrency(item.balance)}</h3>
    <p class="balance">${item.category}</p>
    <p class="date">Added at : ${item.timeAdded}</p>
  </div>
  `
    )
    .join(""));
}

// Function to count all records to a total balance
function totalBalance() {
  const balanceList = JSON.parse(localStorage.getItem("records"));
  const expanseBalance = [];
  const incomeBalance = [];

  const income = balanceList.filter((data) => data.category === "income");
  const expanse = balanceList.filter((data) => data.category === "expanse");
  console.log(income);
  console.log(expanse);

  console.log(expanseBalance);
  console.log(incomeBalance);
  income.map((data) => {
    incomeBalance.push(data.balance);
  });
  expanse.map((data) => {
    expanseBalance.push(data.balance);
  });
  const totalIncome = incomeBalance.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const totalExpanse = expanseBalance.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  console.log(`income : ${totalIncome} Expanse : ${totalExpanse}`);

  return totalIncome - totalExpanse;
}

// function to format number into indonesian currency
function formatCurrency(value) {
  if (typeof value !== "number") return;

  const result = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

  return result;
}

// Function for rendering the total balance
function renderTotalBalance() {
  console.log(totalBalance());
  totalBalanceText.innerHTML = `Total Balance : ${formatCurrency(
    totalBalance()
  )}`;
}

// Init the event handler
dropdownButton.addEventListener("click", activeDropdown);

function activeDropdown() {
  const ANIMATION_IN_CLASS = "fadeIn";
  const ANIMATION_OUT_CLASS = "fadeOut";

  const menuIsActiveAndAnimatingIn =
    dropdownMenu.classList.contains(ANIMATION_IN_CLASS) &&
    dropdownMenu.classList.contains("active");

  if (menuIsActiveAndAnimatingIn) {
    dropdownMenu.classList.remove("active", ANIMATION_IN_CLASS);
    dropdownMenu.classList.add(ANIMATION_OUT_CLASS);
  } else {
    dropdownMenu.classList.add("active", ANIMATION_IN_CLASS);
    dropdownMenu.classList.remove(ANIMATION_OUT_CLASS);
  }
}

// Initial Render
renderTotalBalance();
renderRecords();

// Other initial
//localStorage.clear();
