import { createContext, useContext, useState } from "react";

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (phone) => {
    setCompareList((prev) => {
      if (prev.some((item) => item.id === phone.id)) return prev;
      return [...prev, phone];
    });
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (id) => {
    return compareList.some((item) => item.id === id);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
