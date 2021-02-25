import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

//tipar qual o formato de cada
interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  // como o meu children é um componente, eu preciso usar o ReactNode
  children: ReactNode;
};

export const CountdownContext = createContext({} as CountdownContextData)
// Variavel global NodeJS
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  // Estados
  const [ time, setTime ] = useState(0.05 * 60);
  const [ isActive, setIsActive] = useState(false);
  const [ hasFinished, setHasFinished ] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Inicia o countdown
  function startCountdown() {
    setIsActive(true);
  }

  // Reseta o countdown
  function resetCountdown() {
    // evitando que o setTimeout execute
    clearTimeout(countdownTimeout);
    setIsActive(false);
    //vou retornar o valor inicial
    setTime(0.05 * 60);
    setHasFinished(false);
  }

  // Gerador de efeitos colaterais
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])
  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}