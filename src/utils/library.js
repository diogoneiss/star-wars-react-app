import axios from 'axios';


const baseEndpoint = 'https://www.swapi.tech/api/starships/';

//used to configure retryAxios. Needed in case of too many requests error
const rAxiosConfig = {
    backoffType: 'exponential',
}

/**
 * @description gets the desired number of spaceships from star wars api, without much info
 * @param {Number} numberOfSpaceships desired number of spaceships
 * @returns {Array} returns a crude array of the data of all the spaceships
 */
async function getAllSpaceshipsRequest(limit) {
    const results = await axios.get(baseEndpoint + '?page=1&limit=' + limit, rAxiosConfig);
    // console.log(results);
    return results.data;
}


/** 
 * @description gets a single instance of a ship, in a cleaned format
 * @param {String} uid desired uid
 * @returns {Object} returns an object with the data of the ship
 * 
 */
async function getShipData(uid) {
    const result = await axios.get(baseEndpoint + uid, rAxiosConfig);
    return result.data;
}



/**
 * @description creates an array of uid's from the results of the getAllSpaceshipsRequest request
 * @param {Array} data, in the crude format of the getAllSpaceshipsRequest request
 * @returns {Array} array of uid's
 */
function createStarshipIdArray(data) {


    const originalArray = data.results;

    const cleanArray = originalArray.map(e => e.uid);

    return cleanArray;
}

/**
 * @description this function takes an array of uid's and makes a get request for each one
 * and returns an array of all the spaceships
 * @param {Array} shipArray
 * @returns {Array} array of all spaceships
 * 
 */
async function fillShipData(allShips) {

    const promisesArray = allShips.map(e => getShipData(e));

    return Promise.all(promisesArray)

}

/**
 * @description cleans the data from the previous step
 * @param {Array} data, in the crude format of the fillShipData request
 * @returns {Array} array of cleaned spaceships
 */
function cleanStarshipData(data) {

    const cleanedArray = data.map(e => e.result.properties);

    return cleanedArray;
}

/**
 * @description converts a time format, like 1 week, to the day equivalent. 
 * Works for hours, days, weeks, months, years
 * @param {String} input, like "7 months"
 * @returns {Number} the number of days equivalent to the input
 */
export function convertTimeToDays(input) {
    //split "1 day" into "1" and "day"


    if(input === "unknown"){
        return 0;
    }

    const splitted = input.split(' ');
    const quantity = splitted[0];
    const time = splitted[1];
    let finalTime = 0;

    if (time.includes('day')) {
        finalTime = Number(quantity)
    }
    else if (time.includes('hour')) {
        finalTime = Number(quantity) / 24;
    }
    else if (time.includes('week')) {
        finalTime = Number(quantity) * 7;
    }
    else if (time.includes('month')) {
        finalTime = Number(quantity) * 30;
    }
    else if (time.includes('year')) {
        finalTime = Number(quantity) * 365;
    }
    else {
        throw new Error('time not recognized');
    }

    return finalTime;


}

/**
 * @description gets all ship info for a desired number of starships, with complete info
 * @param {Number} numberOfSpaceships desired number of spaceships
 * @returns {Array} returns an array of spaceships with all the info
 */
const requestStarshipData = async (numberOfSpaceships = 36) => {

    //I could've gotten the total number of ships from a dummy 1 ship request, but I already now its 36 and it wont change 


    if (numberOfSpaceships > 36) {
        throw new Error('too many ships requested');
    }

    //iterate over the results and do a get request for each of the url
    const allShips = await getAllSpaceshipsRequest(numberOfSpaceships);

    //cleans the data to leave just uid's
    const shipUidArray = createStarshipIdArray(allShips);
    // console.log(shipUidArray);
    //gets all the data for the uid in an array
    const crudeShipData = await fillShipData(shipUidArray);

    //cleans the returned data in the previous step
    return cleanStarshipData(crudeShipData);

}

export default requestStarshipData;