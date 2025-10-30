import { useState } from 'react'
import './App.css'
import { CloudSunRain, MapPinned, Thermometer, Droplet, Wind } from 'lucide-react';


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
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={buscaClima}
                disabled={carregando}
             >
                {carregando ? "Buscando..." : "Buscar"}
              </button>
            </div>
            {erro && <div className="error-message">{erro}</div>}
          </div>

          {clima && ( <>
          {/* Resultado do Clima */}
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

            {/* Temperatura Principal */}
            <div id="temperatura-box">
              <div id="temperatura-valor">
                22ºC
              </div>
              <div id="sensacao">
                Sensação Térmica: 25ºC
              </div>
            </div>

            <div className="detalhes-box">

              <div className="detalhes-item">
                <Thermometer style={{color: '#3fb2ffff'}} size={32} />
                <h2>Min/Max</h2>
                <h3>23ºC / 26ºC</h3>
              </div>

              <div className="detalhes-item">
                <Droplet style={{color: '#3fb2ffff'}} size={32} />
                <h2>Umidade</h2>
                <h3>10%</h3>
              </div>

              <div className="detalhes-item">
                <Wind style={{color: '#3fb2ffff'}} size={32} />
                <h2>Vento</h2>
                <h3>15 km/h</h3>
              </div>

            </div>{/* Fecha detalhes-box */}
          

          </div> {/* Fecha #card-resultado */}
          </>)}

        </div>
      </div>
    </>
  )
}

export default App
