const template = document.querySelector('#pet-card-template');
const wrapper = document.createDocumentFragment();

// https://www.meteosource.com/api/v1/free/find_places?text=Landsdale&language=en&key=d4h08vj6oqaxp6wvfndtwdija72hvqng406yt58s

async function start() {
  const weatherPromise = await fetch(
    'https://www.meteosource.com/api/v1/free/point?lat=-31.809S&lon=115.839E&sections=current%2Chourly&timezone=auto&language=en&units=auto&key=d4h08vj6oqaxp6wvfndtwdija72hvqng406yt58s',
  );
  const weatherData = await weatherPromise.json();
  const currentTemp = weatherData.current.temperature;
  document.querySelector('#temp').textContent = currentTemp;
  // console.log(weatherData.current.temperature);
}

start();

async function petsArea() {
  const petsPromise = await fetch(
    'https://learnwebcode.github.io/bootcamp-pet-data/pets.json',
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
