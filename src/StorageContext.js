import React, { createContext, useState, useContext } from "react";

// Create a context
const StorageContext = createContext();

// Create a provider component
export const StorageProvider = ({ children }) => {
  const [storageItems, setStorageItems] = useState([]);
  const [remainingStorage, setRemainingStorage] = useState(460);
  const [totalStorage, setTotalStorage] = useState(460);
  const [addedStorage, setAddedStorage] = useState(0);

  const handleAddStorage = (amount) => {
    setAddedStorage((prev) => prev + amount);
    setRemainingStorage((prev) => prev + amount);
    setTotalStorage((prev) => prev + amount);
  };

  const handleResetStorage = () => {
    setAddedStorage(0);
    setStorageItems([]);
    setRemainingStorage(totalStorage);
  };

  return (
    <StorageContext.Provider
      value={{
        storageItems,
        remainingStorage,
        totalStorage,
        addedStorage,
        handleAddStorage,
        handleResetStorage,
        setStorageItems,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

// Custom hook for using the StorageContext
export const useStorage = () => {
  return useContext(StorageContext);
};
