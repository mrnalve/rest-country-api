loadCountry = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => {
            displayCountry(data);
        });
};

displayCountry = (countries) => {
    let mainContainer = document.getElementById("mainContainer");
    countries.forEach((country) => {
        console.log(country);
        let countryCard = document.createElement("div");
        countryCard.classList.add('card', 'card-compact', 'w-96', 'bg-base-100', 'shadow-xl', 'my-4')
        countryCard.innerHTML = `
        <figure><img src="${country.flags.png}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title text-3xl font-medium">${country.name.common}</h2>
          <p class ="text-2xl font-light">Capital:- ${country.capital ? country.capital[0]: 'No Capital'}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Detail</button>
          </div>
        </div>
        `;
        mainContainer.appendChild(countryCard);
    });
};
loadCountry();
