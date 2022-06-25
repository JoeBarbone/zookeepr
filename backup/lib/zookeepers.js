const fs = require("fs");
const path = require("path");

function filterByQuery(query, zookeepers) {
  let filteredResults = zookeepers;
  if (query.age) {
    filteredResults = filteredResults.filter(
      // Since our form data will be coming in as strings, and our JSON is storing
      // age as a number, we must convert the query string to a number to
      // perform a comparison:
      (zookeeper) => zookeeper.age === Number(query.age)
    );
  }
  if (query.favoriteAnimal) {
    filteredResults = filteredResults.filter(
      (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (zookeeper) => zookeeper.name === query.name
    );
  }
  return filteredResults;
}

function findById(id, zookeepers) {
  const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
  return result;
}

function createNewZookeeper(body, zookeepers) {
  const zookeeper = body;
  zookeepers.push(zookeeper);
  fs.writeFileSync(
    path.join(__dirname, "../data/zookeepers.json"),
    JSON.stringify({ zookeepers }, null, 2)
  );
  return zookeeper;
}



const handleGetZookeepersSubmit = event => {
    event.preventDefault();
    const nameHTML = $zookeeperForm.querySelector('[name="name"]');
    const name = nameHTML.value;
  
    const ageHTML = $zookeeperForm.querySelector('[name="age"]');
    const age = ageHTML.value;
  
    const zookeeperObject = { name, age };
  
    getZookeepers(zookeeperObject);
};



const getZookeepers = (formData = {}) => {
    let queryUrl = '/api/zookeepers?';
  
    Object.entries(formData).forEach(([key, value]) => {
      queryUrl += `${key}=${value}&`;
    });
  
    fetch(queryUrl)
      .then(response => {
        if (!response.ok) {
          return alert(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then(zookeeperArr => {
        console.log(zookeeperArr);
        printResults(zookeeperArr);
      });
};
  
  getZookeepers();



function validateZookeeper(zookeeper) {
  if (!zookeeper.name || typeof zookeeper.name !== "string") {
    return false;
  }
  if (!zookeeper.age || typeof zookeeper.age !== "number") {
    return false;
  }
  if (
    !zookeeper.favoriteAnimal ||
    typeof zookeeper.favoriteAnimal !== "string"
  ) {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
};