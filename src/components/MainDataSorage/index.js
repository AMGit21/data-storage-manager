import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./mainDataStorage.module.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import {
  BsDatabaseAdd,
  BsDatabaseDash,
  BsArrowCounterclockwise,
  BsExclamationDiamond,
} from "react-icons/bs";

const MainDataStorage = ({
  storageItems,
  onDrop,
  onRemove,
  remainingStorage,
  totalStorage,
  onAddStorage,
  onResetStorage,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: "dataDetail",
    drop: (item) => {
      const totalSize =
        storageItems.reduce((acc, cur) => acc + cur.finalSize, 0) +
        item.detail.finalSize;
      if (totalSize > totalStorage) {
        showErrorToast(); // Show error toast if the total size exceeds the available storage
      }
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showDecreaseDropdown, setShowDecreaseDropdown] = useState(false);
  const [addedStorage, setAddedStorage] = useState(0); // State to track added storage

  // Function to handle adding storage
  const handleAddStorageClick = (amount) => {
    setAddedStorage((prev) => prev + amount); // Update added storage
    onAddStorage(amount);

    const newRemainingStorage = remainingStorage + amount;
    if (newRemainingStorage < 0) {
      showErrorToast(); // Show error toast if the remaining storage is negative
    } else if (newRemainingStorage <= 30) {
      showWarningToast(); // Show warning toast if the remaining storage is positive but under 30
    }

    setShowAddDropdown(false);
  };

  // Function to handle decreasing storage
  const handleDecreaseStorageClick = (amount) => {
    setAddedStorage((prev) => prev - amount); // Update added storage
    onAddStorage(-amount);

    const newRemainingStorage = remainingStorage - amount;
    if (newRemainingStorage < 0) {
      showErrorToast(); // Show error toast if the remaining storage is negative
    } else if (newRemainingStorage <= 30) {
      showWarningToast(); // Show warning toast if the remaining storage is positive but under 30
    }

    setShowDecreaseDropdown(false);
  };

  // Function to handle resetting storage
  const handleResetStorage = () => {
    const adjustment = addedStorage;

    setAddedStorage(0); // Reset added storage
    onResetStorage(-adjustment); // Call the reset function passed as a prop with the adjustment
  };

  // Function to show error toast
  const showErrorToast = () => {
    if (!toast.isActive("error-toast")) {
      toast.error("Storage exceeds the remaining capacity!", {
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: "error-toast", // Unique ID for the error toast
      });
    }
  };

  // Function to show warning toast
  const showWarningToast = () => {
    if (!toast.isActive("warning-toast")) {
      toast.warning("Low available storage!", {
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: "warning-toast", // Unique ID for the warning toast
      });
    }
  };

  useEffect(() => {
    if (remainingStorage < 0) {
      showErrorToast(); // Show error toast if remaining storage is negative when the component mounts
    } else if (remainingStorage <= 30) {
      showWarningToast(); // Show warning toast if remaining storage is positive but under 30 when the component mounts
    }
  }, [remainingStorage]);

  return (
    <div
      className={styles.mainDataStorage}
      ref={drop} // Assign drop ref to the main storage div
      style={{
        backgroundColor: isOver
          ? "rgb(0, 44, 102)" // Background if an item is being dragged over
          : "white", // Default background color
      }}
    >
      <div className={styles.dataStorageHeader}>
        <span>Data Storage / {totalStorage.toFixed(2)} TB</span>
        <span
          className={remainingStorage < 0 ? styles.remainingStorageAlert : ""}
          style={{
            backgroundColor:
              remainingStorage < 0
                ? "#FF5460" // Red background if remaining storage is negative
                : remainingStorage <= 30
                ? "#F4A23C"
                : "rgb(235, 235, 235)", // Default background color
          }}
        >
          Remaining: {remainingStorage.toFixed(2)} TB
        </span>
        <span>Added Storage: {addedStorage.toFixed(2)} TB</span>
        <div className={styles.buttonsWrapper}>
          {/* Display added storage */}
          <div className={styles.addStorageContainer}>
            {/* <button
            className={styles.addStorageButton}
            onClick={() => setShowAddDropdown((prev) => !prev)} // Toggle dropdown visibility
          >
            +
          </button> */}
            <BsDatabaseAdd
              data-tooltip-id="addStorageTooltip"
              style={{ fill: "rgb(0, 44, 102)" }}
              className={styles.addStorageIcon}
              onClick={() => setShowAddDropdown((prev) => !prev)} // Toggle dropdown visibility
            />
            <Tooltip
              id="addStorageTooltip"
              place="top"
              effect="solid"
              className={styles.customTooltip}
              classNameArrow={styles.tooltipArrow}
            >
              <span>
                <strong>Add Storage</strong>
              </span>
              <span>Add additional storage to your system.</span>
            </Tooltip>
            <div
              className={`${styles.addStorageDropdown} ${
                showAddDropdown ? styles.show : ""
              }`}
            >
              <button
                className={styles.addStorageDropdownButton}
                onClick={() => handleAddStorageClick(50)} // Add 50 TB of storage
              >
                50 TB
              </button>
              <button
                className={styles.addStorageDropdownButton}
                onClick={() => handleAddStorageClick(100)} // Add 100 TB of storage
              >
                100 TB
              </button>
            </div>
          </div>
          <div className={styles.decreaseStorageContainer}>
            {/* <button
            className={styles.addStorageButton}
            onClick={() => setShowDecreaseDropdown((prev) => !prev)} // Toggle dropdown visibility
          >
            -
          </button> */}

            <BsDatabaseDash
              data-tooltip-id="decreaseStorageTooltip"
              style={{ fill: "rgb(0, 44, 102)" }}
              className={styles.addStorageIcon}
              onClick={() => setShowDecreaseDropdown((prev) => !prev)} // Toggle dropdown visibility
            />
            <Tooltip
              id="decreaseStorageTooltip"
              place="top"
              effect="solid"
              className={styles.customTooltip}
              classNameArrow={styles.tooltipArrow}
            >
              <span>
                <strong>Decrease Storage</strong>
              </span>
              <span>Reduce the current storage in your system.</span>
            </Tooltip>
            <div
              className={`${styles.addStorageDropdown} ${
                showDecreaseDropdown ? styles.show : ""
              }`}
            >
              <button
                className={styles.addStorageDropdownButton}
                onClick={() => handleDecreaseStorageClick(50)} // Decrease 50 TB of storage
              >
                50 TB
              </button>
              <button
                className={styles.addStorageDropdownButton}
                onClick={() => handleDecreaseStorageClick(100)} // Decrease 100 TB of storage
              >
                100 TB
              </button>
            </div>
          </div>
          {/* <button
          className={styles.resetStorageButton}
          onClick={handleResetStorage} // Reset storage
        >
          Reset
        </button> */}
          <div
            className={styles.resetStorageIcon}
            data-tooltip-id="resetStorageTooltip"
            onClick={handleResetStorage} // Reset storage
          >
            <BsArrowCounterclockwise />
            Reset
          </div>
          <Tooltip
            id="resetStorageTooltip"
            place="top"
            effect="solid"
            className={styles.customTooltip}
            classNameArrow={styles.tooltipArrow}
          >
            <span>
              <strong>Reset Storage</strong>
            </span>
            <span>Reset the storage settings to default.</span>
          </Tooltip>
        </div>
      </div>
      <div className={styles.horizontalScrollContainer}>
        <div className={styles.dataStorage}>
          {storageItems.map((item) => {
            let widthPx = item.finalSize;
            if (item.finalSize < 150) {
              widthPx = 150; // Set a minimum width for smaller sizes
            }
            if (item.finalSize > 1000) {
              widthPx = 1000; // Scale down large sizes more appropriately
            }
            return (
              <div
                key={item.uniqueId}
                className={`${styles.dataDetail} ${
                  item.uniqueId === selectedItemId ? styles.selectedItem : ""
                }`}
                onMouseOver={() => setSelectedItemId(item.uniqueId)} // Handle item
                onMouseOut={() => setSelectedItemId(null)}
                // className={styles.dataDetail}
                // onClick={() => onRemove(item.uniqueId)} // Handle item removal
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    item.uniqueId === selectedItemId ? "" : "white", //item.backgroundColor,
                  width: `${widthPx}px`,
                  minWidth: `${widthPx}px`,
                }}
              >
                <span
                  className={styles.dataDetailTag}
                  style={{ backgroundColor: item.backgroundColor }}
                ></span>
                <div className={styles.details}>
                  <span>{item.retentionPeriod}</span>
                  <span>{item.finalSize} TB</span>
                  <div
                    data-tooltip-id="tapToRemoveTooltip"
                    className={`${styles.tapToDelete} ${
                      item.uniqueId === selectedItemId
                        ? styles.show
                        : styles.hide
                    }`}
                    onClick={() => onRemove(item.uniqueId)}
                  >
                    x
                  </div>
                  <Tooltip
                    id="tapToRemoveTooltip"
                    place="top"
                    effect="solid"
                    className={styles.customTooltip}
                    classNameArrow={styles.tooltipArrow}
                  >
                    <div className={styles.tapToRemoveInfoSection}>
                      <BsExclamationDiamond
                        style={{
                          fill: "#f4a23c",
                          fontSize: "18px",
                        }}
                      />
                      <div className={styles.tapToRemoveInfoSectionText}>
                        <span>
                          <strong>Remove Storage</strong>
                        </span>
                        <span>Tap to remove.</span>
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainDataStorage;
