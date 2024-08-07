import { PieChart } from "@mui/x-charts";
import React from "react";

function Piechart() {
  const data = [
    { id: 0, value: 10, label: "In progress" },
    { id: 1, value: 15, label: "To do" },
    { id: 2, value: 20, label: "Completed" },
  ];
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={200}
    />
  );
}

export default Piechart;
