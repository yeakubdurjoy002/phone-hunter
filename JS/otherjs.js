// Global variables to track search state
let currentSearchText = "";
let currentPage = 0;
let phonesPerPage = 7; // Number of phones to show per page
let allPhones = []; // Store all fetched phones

// Load phones function with pagination
const loadPhone = async (searchText, page) => {
  // If the search text changes, reset the page and phones array
  if (currentSearchText !== searchText) {
    currentSearchText = searchText;
    currentPage = 0;
    allPhones = [];
  }

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  allPhones = data.data; // Store all phones fetched
  displayPhones(allPhones.slice(0, (page + 1) * phonesPerPage));
};

// Display phones function
const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.textContent = ""; // Clear previous phones

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 p-10 shadow-xl`;
    phoneCard.innerHTML = `
    <figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              
              <div class="card-actions justify-center">
                <button onclick="showDetailsButton('${phone.slug}');my_modal_5.showModal()"  class="btn btn-primary">Show Details</button>
              </div>
            </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });

  // Show or hide the "Load More" button
  const showAllButton = document.getElementById("load-more");
  if (phones.length < allPhones.length) {
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }

  // Hide the loading spinner
  loadingToggleSpinner(false);
};
// implement showDetailsButton
const showDetailsButton = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  // console.log(data);
  const phone = data.data;
  showPhoneDetails(phone);
};
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-phone-detail-name");
  phoneName.innerText = phone.name;
  // show the modal
  my_modal_5.showModal();
};
// Handle search button click
const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value.trim(); // Trim spaces
  if (searchText) {
    // Check if searchText is not empty
    loadingToggleSpinner(true);
    loadPhone(searchText, currentPage);
  }
};

// Handle "Load More" button click
const handleLoadMore = () => {
  currentPage++;
  displayPhones(allPhones.slice(0, (currentPage + 1) * phonesPerPage));
};

// Loading spinner toggle function
const loadingToggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");

  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
