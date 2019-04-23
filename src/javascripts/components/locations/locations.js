import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const domStringBuilder = () => {
  let domString = '';
  domString += '<h2>Locations:</h2>';
  domString += '<div id="locations" class="row">';
  locations.forEach((location) => {
    domString += `<div id="${location.id}" class="col-12 col-sm-6 col-md-4 col-lg-3">`;
    domString += '  <div class="card location">';
    domString += '    <div class="card-header">';
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

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((response) => {
      const locationResults = response.data.locations;
      locations = locationResults;
      domStringBuilder();
    })
    .catch(error => console.error(error));
};

export default { initializeLocations };
