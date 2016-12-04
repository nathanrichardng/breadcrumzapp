/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

class CrumbResource {

  getCrumbs() {
    return fetch('https://johhnnytest:testing1234@breadcrumz.herokuapp.com/api/crumbs?longitude=-101&latitude=101', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("Fetched Crumbs: " + JSON.stringify(responseData));
      return responseData;
    }).catch(function (err) {
      console.log("Error fetching crumbs: " + err);
      return [];
    });
  }

  addCrumb(crumb) {
    return fetch('https://johhnnytest:testing1234@breadcrumz.herokuapp.com/api/crumbs', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(crumb),
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("added crumb: " + JSON.stringify(responseData));
      return responseData.message;
    }).catch(function (err) {
      console.log("Error adding crumb: " + err);
      return "error adding crumb: " + err;
    });
  }

}

module.exports = CrumbResource;