import { useState } from 'react'
import './App.css'
import { CloudSunRain, MapPinned } from 'lucide-react';

function Cadastro() {
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
      Página 2
      <a href="#">VOLTAR</a>
      kkkkkk
    </>
  )
}

export default Cadastro
