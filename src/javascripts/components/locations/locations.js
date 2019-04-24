import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const shootTimeClass = (shootTime) => {
  let selectedClass = '';
  switch (shootTime) {
    case 'Morning':
      selectedClass = 'bg-secondary';
      break;
    case 'Afternoon':
      selectedClass = 'bg-success';
      break;
    case 'Evening':
      selectedClass = 'bg-info';
      break;
    case 'After Dark':
      selectedClass = 'bg-danger';
      break;
    default:
      break;
  }
  return selectedClass;
};

const domStringBuilder = (array) => {
  let domString = '';
  domString += '<div id="locations" class="row">';
  array.forEach((location) => {
    domString += `<div id="${location.id}" class="col-12 col-sm-6 col-md-4 col-lg-3">`;
    domString += '  <div class="card location">';
    domString += `    <div class="card-header ${shootTimeClass(location.shootTime)}">`;
    domString += `      ${location.name}`;
    domString += '    </div>';
    domString += `    <img class="card-img-top" src="${location.imageUrl}" alt="Picture of ${location.name}">`;
    domString += '    <div class="card-body">';
    domString += `      <p class="card-text address">${location.address}</p>`;
    domString += '    </div>';
    domString += '  </div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('locations', domString);
};

const movieLocations = (specificMovieLocationsArray) => {
  const specifiedLocations = [];
  specificMovieLocationsArray.forEach((movie) => {
    specifiedLocations.push(locations.filter(x => x.id === movie)[0]);
  });
  domStringBuilder(specifiedLocations);
};

const filteredLocations = (e) => {
  const buttonId = e.target.id;
  const morningLocations = locations.filter(x => x.shootTime === 'Morning');
  const afternoonLocations = locations.filter(x => x.shootTime === 'Afternoon');
  const eveningLocations = locations.filter(x => x.shootTime === 'Evening');
  const darkLocations = locations.filter(x => x.shootTime === 'After Dark');
  switch (buttonId) {
    case 'morning':
      domStringBuilder(morningLocations);
      break;
    case 'afternoon':
      domStringBuilder(afternoonLocations);
      break;
    case 'evening':
      domStringBuilder(eveningLocations);
      break;
    case 'dark':
      domStringBuilder(darkLocations);
      break;
    default:
      domStringBuilder(locations);
      break;
  }
};

const filterByTextEvent = (e) => {
  const searchText = e.target.value;
  const searchLocations = locations.filter((x) => {
    const hasName = x.name.includes(searchText);
    const hasAddress = x.address.includes(searchText);
    return hasName || hasAddress;
  });
  domStringBuilder(searchLocations);
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((response) => {
      const locationResults = response.data.locations;
      locations = locationResults;
      domStringBuilder(locations);
      document.getElementById('buttons').querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', filteredLocations);
      });
      document.getElementById('search-input').addEventListener('keyup', filterByTextEvent);
    })
    .catch(error => console.error(error));
};

const showFilters = () => {
  document.getElementById('filters').style.display = 'block';
};

const hideFilters = () => {
  document.getElementById('filters').style.display = 'none';
};

export default {
  initializeLocations,
  movieLocations,
  showFilters,
  hideFilters,
};
