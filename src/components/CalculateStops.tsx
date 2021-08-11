import React from 'react';

// import { Container } from './styles';
import requestStarshipData from '../utils/library.js';
import ShipModel from '../types';
import calculateSingleStop from '../utils/index';

//Isso aqui vai ser o card resultado, que vai ser renderizado no componente através de um map no array
const RenderShipInstance = (ship: ShipModel, stops: number) => {

  //se for = -1 não pode ser calculado, mostrar "indefinido"
  const numberOfStops = calculateSingleStop(stops, ship);

  return <>
    <h1>{ship.name}</h1>
    <p>{ship.manufacturer}</p>
    <p>{ship.model}</p>
    <br />
    <p>{stops}</p>
  </>
}

//Criar um componente para mostrar a lista de cards renderizado, apenas depois que todos os cálculos estiverem finalizados e o usuário tiver finalizado a digitação
const ShowAllCards = (ships: ShipModel[], stops: number, clicked: boolean) => {
  //Só vc fazer a lógica do map no componente acima.

  //Se o resultado da API ainda não tiver chegado, esperar e não mostrar os cards.

  const [retrievedFromAPI, setRetrievedFromAPI] = React.useState(false);

  if (retrievedFromAPI) {
    //aqui vc bota o map no array
    return <>

    </>
  }

  //caso de não recuperado ainda, esperar e não mostrar os cards.
  //seria legal colocar uma veriricação de erros? De repente trocar a lógica de retrievedFromAPI para incluir também um estado de erro da requisição
  else {
    return (<>
      <p>Aqui vc coloca um spinner bonitinho</p>
    </>)
  }
}


//Componente principal
const CalculateStops: React.FC = () => {


  //a funcao calculateStops para calcular o numero de stops está dentro de cada card

  //quando clicar mostra o componente
  const [clicked, setClicked] = React.useState(false);

  const [desiredSearch, setDesiredSearch] = React.useState("")

  //recuperar os dados da API salvos no redux
  const ships = null;

  //não faz sentido setar pra falso pq vc nunca vai "ocultar" os cards, apenas mostrar
  const buscarResultados = (e) => {
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