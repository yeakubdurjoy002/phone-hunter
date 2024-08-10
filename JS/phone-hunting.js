const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones);
};

const displayPhones = (phones) => {
  // console.log(phones);
  // 1.get the id
  const phoneContainer = document.getElementById("phones-container");
  // clear phone container before adding new card
  phoneContainer.textContent = "";
  const showAllButton = document.getElementById("load-more");
  if (phones.length > 7) {
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }
  phones = phones.slice(0, 7);

  phones.forEach((phone) => {
    console.log(phone);
    //2.create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 p-10 shadow-xl`;
    // 3.create innerHTML
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
    // 4.appendChild
    phoneContainer.appendChild(phoneCard);
  });
  // hide the loading spinner
  loadingToggleSpinner(false);
};
// handle search button click
const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadingToggleSpinner(true);
  loadPhone(searchText);
};
const loadingToggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");

  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
const handleLoadMore = () => {};
