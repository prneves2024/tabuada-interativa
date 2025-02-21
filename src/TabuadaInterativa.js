import React, { useState, useEffect } from 'react';

const TabuadaInterativa = () => {
  const [numeroAtual, setNumeroAtual] = useState(1);
  const [multiplicador, setMultiplicador] = useState(1);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [emExecucao, setEmExecucao] = useState(false);
  
  const cores = [
    '#3B82F6', // azul
    '#10B981', // verde
    '#8B5CF6', // roxo
    '#F59E0B', // amarelo
    '#EC4899'  // rosa
  ];

  const falarOperacao = (num, mult, resultado, mostrarResultado) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'pt-PT';
    
    // Ajustes para voz mais musical
    utterance.pitch = mostrarResultado ? 1.4 : 1.2;
    utterance.rate = 0.85;
    utterance.volume = 1;
    
    if (mostrarResultado) {
      utterance.text = `${resultado}`;
      utterance.pitch = 1.5;
    } else {
      utterance.text = `${num} vezes ${mult}`;
      utterance.pitch = 1.2;
    }
    
    synth.speak(utterance);
  };

  const proximaOperacao = () => {
    if (multiplicador < 10) {
      setMultiplicador(prev => prev + 1);
    } else {
      setMultiplicador(1);
      setNumeroAtual(prev => prev === 10 ? 1 : prev + 1);
    }
    setMostrarResultado(false);
  };

  useEffect(() => {
    if (emExecucao) {
      falarOperacao(numeroAtual, multiplicador, numeroAtual * multiplicador, false);
      
      const resultadoTimer = setTimeout(() => {
        setMostrarResultado(true);
        
        setTimeout(() => {
          falarOperacao(numeroAtual, multiplicador, numeroAtual * multiplicador, true);
        }, 800);
      }, 2000);

      const proximaTimer = setTimeout(() => {
        proximaOperacao();
      }, 4000);

      return () => {
        clearTimeout(resultadoTimer);
        clearTimeout(proximaTimer);
      };
    }
  }, [numeroAtual, multiplicador, emExecucao]);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Tabuada Divertida</h1>
        
        <h2 className="subtitle">Que tabuada queres ver?</h2>
        
        <div className="buttons-grid">
          {[1,2,3,4,5,6,7,8,9,10].map(num => (
            <button
              key={num}
              onClick={() => {
                setNumeroAtual(num);
                setMultiplicador(1);
                setMostrarResultado(false);
                setEmExecucao(false);
              }}
              className={`number-button ${numeroAtual === num ? 'active' : ''}`}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="control-button-container">
          <button
            onClick={() => setEmExecucao(!emExecucao)}
            className={`control-button ${emExecucao ? 'stop' : 'start'}`}
          >
            {emExecucao ? 'Parar' : 'Começar'}
          </button>
        </div>

        <div className="operation-container">
          <div 
            className="operation"
            style={{ backgroundColor: cores[numeroAtual % cores.length] }}
          >
            <span>{numeroAtual}</span>
            <span>×</span>
            <span>{multiplicador}</span>
            <span>=</span>
            <span>{mostrarResultado ? numeroAtual * multiplicador : '?'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabuadaInterativa;