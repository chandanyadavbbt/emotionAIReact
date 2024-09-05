import React, { createContext, useContext, useState, useEffect } from 'react';

const ScriptContext = createContext();

export const ScriptProvider = ({ children }) => {
  const [scriptsLoaded, setScriptsLoaded] = useState({});

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      if (scriptsLoaded[src]) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        setScriptsLoaded((prev) => ({ ...prev, [src]: true }));
        resolve();
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  return (
    <ScriptContext.Provider value={{ loadScript }}>
      {children}
    </ScriptContext.Provider>
  );
};

export const useScript = () => {
  return useContext(ScriptContext);
};
