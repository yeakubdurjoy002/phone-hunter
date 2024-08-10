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
              <p>${phone.slug}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
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
