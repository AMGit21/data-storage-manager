import React from "react";
import { useDrag } from "react-dnd";
import styles from "./dataDetail.module.css";

const DataDetail = ({ id, detail, backgroundColor }) => {
  // Use the useDrag hook to handle drag functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "dataDetail", // Type of item being dragged
    item: { id, detail }, // Data associated with the item
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Check if the item is being dragged
    }),
  }));

  // Adjust the width of the item based on its finalSize
  let widthPx = detail.finalSize;
  if (detail.finalSize < 150) {
    widthPx = 150; // Set a minimum width for smaller sizes
  } else if (detail.finalSize > 1000) {
    widthPx = 1000; // Scale down large sizes more appropriately
  }
  // console.log(`Detail ID: ${id}, Width: ${widthPx}px`);

  return (
    <div
      ref={drag} // Assign drag ref to the item
      className={styles.dataDetail}
      style={{
        backgroundColor: "white", // Apply background color
        width: `${widthPx}px`, // Set the width of the item
        minWidth: `${widthPx}px`, // Enforce minimum width
        opacity: isDragging ? 0.4 : 1, // Change opacity when dragging
      }}
    >
      <span className={styles.dataDetailTag} style={{ backgroundColor }}></span>
      <div className={styles.details}>
        <span>{detail.retentionPeriod}</span>
        <span>{detail.finalSize} TB</span>
      </div>
    </div>
  );
};

export default DataDetail;
