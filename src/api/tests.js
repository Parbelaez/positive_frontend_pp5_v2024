const axios = require('axios');

const countryInstance = axios.create({
    baseURL: 'https://countriesnow.space/api/v0.1/countries'
});

// Use async/await or .then() to handle the response
async function getCountries() {
    try {
        const response = await countryInstance.get('/')
        return response.data['data']; // Return the data directly
    } catch (error) {
        console.error('An error occurred:', error.response);
        throw error;
    }
}

// Call the function to fetch and log the countries
getCountries()
    .then(countries => {
        console.log(countries); // Log the countries outside the promise
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });