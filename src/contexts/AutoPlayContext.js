import React, {createContext, useState, useContext} from 'react';

const AutoPlayContext = createContext();

export const useAutoPlay = () => {
  return useContext(AutoPlayContext);
};

export const AutoPlayProvider = ({children}) => {
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

  const toggleAutoPlay = () => {
    setAutoPlayEnabled(prevState => !prevState);
  };

  return (
    <AutoPlayContext.Provider value={{autoPlayEnabled, toggleAutoPlay}}>
      {children}
    </AutoPlayContext.Provider>
  );
};
