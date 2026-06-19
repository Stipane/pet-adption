const template = document.querySelector('#pet-card-template');
const wrapper = document.createDocumentFragment();

// weatherapi.com
// http://api.weatherapi.com/v1/current.json/key=a905269254124490b7772422261406
// MongoDB connection string
// mongodb+srv://mckiee:Anfield008@mycluster.84w3kxe.mongodb.net/

async function start() {
  const weatherPromise = await fetch(
    'https://api.weatherapi.com/v1/current.json?key=c49777daabd7406898972832261406&q=Perth&aqi=no',
  );
  const weatherData = await weatherPromise.json();
  const currentTemp = weatherData.current.temp_c;
  console.log(currentTemp);
  document.querySelector('#temp').textContent = currentTemp;
  console.log(weatherData.current.temp_c);
}

start();

async function petsArea() {
  const petsPromise = await fetch(
    'https://chipper-torrone-9b8168.netlify.app/.netlify/functions/pets',
  );
  const petsData = await petsPromise.json();
  petsData.forEach((pet) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.pet-card').dataset.species = pet.species;
    clone.querySelector('h3').textContent = pet.name;
    clone.querySelector('.pet-description').textContent = pet.description;
    clone.querySelector('.pet-age').textContent = createAgeText(pet.birthYear);
    if (!pet.photo) pet.photo = 'images/fallback.jpg';
    clone.querySelector('.pet-card-photo img').src = pet.photo;
    clone.querySelector('.pet-card-photo img').alt =
      `A ${pet.species} named ${pet.name}`;

    wrapper.appendChild(clone);
  });
  document.querySelector('.list-of-pets').appendChild(wrapper);
}

petsArea();

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  if (age == 1) return '1 year old';
  if (age == 0) return 'Less than a year old';
  return `${age} years old`;
}

// pet filter button code
const allButtons = document.querySelectorAll('.pet-filter button');

allButtons.forEach((el) => {
  el.addEventListener('click', handleButtonClick);
});

function handleButtonClick(e) {
  // remove active active from all buttons
  allButtons.forEach((el) => el.classList.remove('active'));
  // add active class to the clicked button
  e.target.classList.add('active');
  // actually filter the pets according to button clicked
  const currentFilter = e.target.dataset.filter;
  document.querySelectorAll('.pet-card').forEach((el) => {
    if (currentFilter == el.dataset.species || currentFilter == 'all') {
      el.style.display = 'grid';
    } else {
      el.style.display = 'none';
    }
  });
}
