import React, { useState } from "react";
import "./App.css";
import data from "./data.js";
import DataType from "./components/DataType";
import MainDataStorage from "./components/MainDataSorage"; // Ensure correct spelling
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { BsDatabaseGear } from "react-icons/bs";

const App = () => {
  const [dataItems, setDataItems] = useState(data);
  const [storageItems, setStorageItems] = useState([]);
  const [remainingStorage, setRemainingStorage] = useState(460);
  const [totalStorage, setTotalStorage] = useState(460);

  const handleDrop = (item) => {
    const backgroundColor = dataItems.find((d) =>
      d.details.some((detail) => detail.id === item.detail.id)
    ).backgroundColor;
    const newItem = { ...item.detail, backgroundColor, uniqueId: uuidv4() };
    setStorageItems((prevItems) => [...prevItems, newItem]);
    setRemainingStorage((prevStorage) => prevStorage - item.detail.finalSize);
  };

  const handleRemove = (uniqueId) => {
    const itemToRemove = storageItems.find(
      (item) => item.uniqueId === uniqueId
    );

    setStorageItems((prevItems) =>
      prevItems.filter((item) => item.uniqueId !== uniqueId)
    );
    setRemainingStorage((prevStorage) => prevStorage + itemToRemove.finalSize);
  };

  const handleAddStorage = (amount) => {
    setTotalStorage((prevTotal) => prevTotal + amount);
    setRemainingStorage((prevStorage) => prevStorage + amount);
  };

  const handleResetStorage = (adjustment) => {
    setTotalStorage((prev) => prev + adjustment); // Adjust total storage by the adjustment amount
    setRemainingStorage((prev) => prev + adjustment); // Adjust remaining storage by the adjustment amount
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="headerSection">
        <BsDatabaseGear className="databaseIcon" />
        <h1>Data Storage Manager</h1>
      </div>
      <div className="dataTypeWrapper">
        {dataItems.map((d) => (
          <DataType
            key={d.id}
            name={d.dataType}
            metaData={d.metaData}
            details={d.details}
            backgroundColor={d.backgroundColor}
            totalStorage={totalStorage}
          />
        ))}
      </div>
      <MainDataStorage
        storageItems={storageItems}
        onDrop={handleDrop}
        onRemove={handleRemove}
        remainingStorage={remainingStorage}
        totalStorage={totalStorage}
        onAddStorage={handleAddStorage}
        onResetStorage={handleResetStorage} // Pass reset handler here
      />
    </DndProvider>
  );
};

export default App;
