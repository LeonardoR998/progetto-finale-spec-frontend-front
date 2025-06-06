import { createContext, useState } from "react";

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (item) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === item.id) || prev.length >= 2) return prev;
      return [...prev, item];
    });
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  };

  const isInCompare = (id) => {
    return compareList.some((item) => item.id === id);
  };

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
