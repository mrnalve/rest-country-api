// load api from rest country api
loadCountry = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      displayCountry(data.slice(0, 6));
    });
};
// show all country
showMoreData = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      displayCountry(data);
    });
  let showMoreData = document.getElementById("showMoreData");
  showMoreData.style.display = "none";
};

// display all country in web page
displayCountry = (countries) => {
  let mainContainer = document.getElementById("mainContainer");
  mainContainer.innerHTML = ''
  countries.forEach((country) => {
    // console.log(country.cca2);
    let countryCard = document.createElement("div");
    countryCard.classList.add(
      "card",
      "card-compact",
      "w-96",
      "bg-base-100",
      "shadow-xl",
      "my-4"
    );
    countryCard.innerHTML = `
        <figure><img src="${country.flags.png}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title text-3xl font-medium">${country.name.common
      }</h2>
          <p class ="text-2xl font-light">Capital:- ${country.capital ? country.capital[0] : "No Capital"
      }</p>
          <div class="card-actions justify-end">
            <label for="my-modal" class="btn btn-primary" onclick="loadId('${country.cca2
      }')">Detail</label>
          </div>
        </div>
        `;
    mainContainer.appendChild(countryCard);
  });
};

// display country filter by region
const selectElement = document.getElementById('select')
selectElement.addEventListener('change', (event) => {
  const selectedOptionValue = event.target.value;
  let url;
  if (selectedOptionValue === 'allCountry') {
    url = "https://restcountries.com/v3.1/all"
  } else {
    url = `https://restcountries.com/v3.1/region/${selectedOptionValue}`
  }
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCountry(data));
});
// call loadCountry function
loadCountry();

// load country details
let loadId = (countryCode) => {
  let url = `https://restcountries.com/v3.1/alpha/${countryCode}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCountryDetail(data[0]));
};

// display country details with modal
displayCountryDetail = (detail) => {
  let modalBox = document.getElementById("modalBox");
  modalBox.innerHTML = ""; // clear previous content
  let modalDiv = document.createElement("div");
  let {
    name,
    flags,
    cca2,
    capital,
    region,
    area,
    maps,
    population,
    continents,
  } = detail;
  modalDiv.innerHTML = `
        <h1 class="text-2xl font-bold my-2">Name:- ${name.common}</h1>
        <img class="w-72" src="${flags.png}" alt="">
        <p class="text-xl">Continents:- ${continents[0]}</p>
        <p class="text-xl">Country code:- ${cca2}</p>
        <p class="text-xl">Capital:- ${capital}</p>
        <p class="text-xl">Region:- ${region}</p>
        <p class="text-xl">Area:- ${area}</p>
        <p class="text-xl">Maps:- ${maps.googleMaps}</p>
        <p class="text-xl">Population:- ${population}</p>
        <div class="modal-action">
            <label for="my-modal" class="btn">Close</label>
        </div>
    `;
  modalBox.appendChild(modalDiv);
};
