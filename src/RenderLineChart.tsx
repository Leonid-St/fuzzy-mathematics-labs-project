import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export interface IRenderLineChart {
  data: any;
  width: number;
  height: number;
  tooltip?: boolean;
  dot?: boolean;
  legend?: boolean;
}

export const RenderLineChart: React.FC<IRenderLineChart> = ({
  data,
  width,
  height,
  tooltip,
  dot,
  legend
}) => {
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="y" stroke="#8884d8" dot={dot ?? false} />
      {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
      <XAxis dataKey="x" interval={5} />
      <YAxis dataKey="y" />
      {tooltip ? <Tooltip /> : null}
      {legend ? <Legend /> : null}
    </LineChart>
  );
};
