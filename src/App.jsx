import { useState } from 'react'
import './App.css'
import { CloudSunRain, MapPinned } from 'lucide-react';

function App() {
  const [cidade, setCidade] = useState('');
  const [clima, setClima] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  //Função para buscar dados do clima
  const buscaClima = async () => {
    //validação básica
    if(!cidade.trim()){
      setErro('Por favor, digite uma cidade');
      return;
    }

    setCarregando(true);
    setErro('');

    try{
      const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid${API_KEY}&units=metric&lang=pt_br`;
      const resposta = await fetch(url);

      if(!resposta.ok){
        throw new Error('Cidade não encontrada');
      }

      const dados = await resposta.json();
      setClima(dados);

    } catch (error){
        setErro(error.message);
        setClima(null);
    } finally {
        setCarregando(false);
    }
  }; //fecha buscaClima()

    const handleKeyPress = (e) => {
      if (e.key == 'Enter'){
        buscaClima();
      }
    };

  return (
    <>
      <div className="app-container">
        <div className="content-wrapper">
          <header>
            <h1>
              <CloudSunRain color="white" size={48} />
              Consulta de Clima
            </h1>
            <p>Exemplo de consumo de API com React</p>
          </header>

          <div className="busca-box">
            <div className="busca-container">
              <input 
                type="text" 
                placeholder="Digite o nome da cidade.." 
              />
              <button>Buscar</button>
            </div>
          </div>

          {/* Resultado do Clima*/}
          <div id="card-resultado">
            <div id="cidade-info">
              <div id="cidade-nome">
                <MapPinned style={{color: '#550808ff'}} size={48} />
                Campinas, BR
              </div>
              <p id="cidade-desc">
                Nublado
              </p>
            </div> {/* Fecha #cidade-desc*/}

           </div> {/* Fecha #cidade-desc*/}
           </div>
           </div>
    </>
  )
}

export default App
