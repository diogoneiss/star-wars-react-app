import { convertTimeToDays} from './library.js'

export const  calculateAllStops =  (requestedDistance, starshipData) =>  {
     return  starshipData.map(data => calculateSingleStop(requestedDistance, data));
}

const calculateSingleStop =  (requestedDistance, starship) =>  {
   //MGLT = MGLT per h
   const maxDaysWithoutStop = convertTimeToDays(starship.consumables);
   const shipSpeed = starship.MGLT;
  
   if ( maxDaysWithoutStop === 0 || shipSpeed === "unknown") {
       return -1;
   } else {
       //maxDaysWithoutStop * shipSpeed gives me MGLT/day, now i need to cancel the /day part, multiplying by 24
      return Math.floor(requestedDistance / (maxDaysWithoutStop * shipSpeed * 24 ));
   }
}

export default calculateSingleStop;
