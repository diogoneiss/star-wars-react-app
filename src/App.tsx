import React from 'react';
import CalculateStops from './components/CalculateStops';

function App() {

  //TODO: inserir lógica do redux aqui
  //TODO: fazer e armazenar a chamada API através de um useEffect. a função necessária está em utils/library, requestStarshipData().
  React.useEffect(() => {

  }, []);

  return (
    <div className="App">
      <header className="App-header">
      </header>
        <h1>
          Calculadora de paradas Star Wars
        </h1>
        

          <CalculateStops />                          
       
    
    </div>
  );
}

export default App;
