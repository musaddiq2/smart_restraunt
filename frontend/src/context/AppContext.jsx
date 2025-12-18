import { createContext, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const restaurantId = "RESTO_001";

  return (
    <AppContext.Provider value={{ restaurantId }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
