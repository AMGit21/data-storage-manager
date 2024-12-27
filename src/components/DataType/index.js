import React from "react";
import DataDetail from "../DataDetail";
import styles from "./dataType.module.css";
import { BsDatabase } from "react-icons/bs";

const DataType = ({ name, metaData, details, backgroundColor }) => {
  return (
    <div className={styles.dataType}>
      <div className={styles.dataTypeTitle}>
        <BsDatabase
          style={{
            fontSize: "18px",
            margin: "-3px 7px",
            fill: backgroundColor,
          }}
        />
        <span style={{ color: backgroundColor, fontWeight: "bold" }}>
          {name}
        </span>{" "}
        | {metaData}
      </div>
      <div className={styles.detailsWrapper}>
        {/* Map over the details and render each DataDetail component */}
        {details.map((detail) => (
          <DataDetail
            key={detail.id} // Unique key for each detail
            id={detail.id}
            detail={detail}
            backgroundColor={backgroundColor}
          />
        ))}
      </div>
    </div>
  );
};

export default DataType;
