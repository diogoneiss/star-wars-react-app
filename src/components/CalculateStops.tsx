import React from 'react';

// import { Container } from './styles';
import requestStarshipData from '../utils/library.js';
import ShipModel from '../types';
import calculateSingleStop from '../utils/index';

type RenderShipProps = {
  key:string, 
  ship: ShipModel, 
  stops: number
}



//Isso aqui vai ser o card resultado, que vai ser renderizado no componente através de um map no array
const RenderShipInstance: React.FC<RenderShipProps> = ({key:string, ship: ShipModel, stops: number}) => {

  //se for = -1 não pode ser calculado, mostrar "indefinido"
  const numberOfStops = calculateSingleStop(props.ship, props.stops);

  return <>
    <h1>{ship.name}</h1>
    <p>{ship.manufacturer}</p>
    <p>{ship.model}</p>
    <br />
    <p>{numberOfStops === -1? 'Número de paradas indefinido' : numberOfStops}</p>
  </>
}

//Criar um componente para mostrar a lista de cards renderizado, apenas depois que todos os cálculos estiverem finalizados e o usuário tiver finalizado a digitação
const ShowAllCards = (ships: ShipModel[], stops: number, clicked: boolean) => {
  //Lógica do map no componente acima.

  //Se o resultado da API ainda não tiver chegado, esperar e não mostrar os cards.

  const retrievedFromAPI = null; // = useSelector para verificar se os dados já chegaram ou erro
  if (retrievedFromAPI) {
    return <>

    {ships.map(ship => 
       <RenderShipInstance key={ship.name} ship={ship} stops={stops} />
     )
    }
    </>
  }

  //caso de não recuperado ainda, esperar e não mostrar os cards.
  //colocar uma veriricação de erros, com a lógica de retrievedFromAPI para incluir também um estado de erro da requisição
  else {
    return (<>
      <p>Aqui fica um spinner bonitinho</p>
    </>)
  }
}


//Componente principal
const CalculateStops: React.FC = () => {


  //a funcao calculateStops para calcular o numero de stops está dentro de cada card

  //quando clicar mostra o componente
  const [clicked, setClicked] = React.useState(false);

  //busca no input
  const [desiredSearch, setDesiredSearch] = React.useState("")

  //recuperar os dados da API salvos no redux
  const ships = null; //useSelector...

  //não faz sentido setar pra falso pq vc nunca vai "ocultar" os cards, apenas mostrar
  const buscarResultados = (e) => {
    e.preventDefault();
    setClicked(true);
    setDesiredSearch(e.target.value);
  };


  return <>

    <div>
      <input type="text" defaultValue={desiredSearch} onBlur={(e) => buscarResultados(e.target.value)}
        placeholder="Qual distância, em MGLT, você deseja calcular o número de paradas?" />

      <button onClick={() => setClicked(true)}>Calcular</button>

    </div>

    {clicked && <ShowAllCards ships={ships} stops={Number(desiredSearch)} />}

  </>;
}

export default CalculateStops;