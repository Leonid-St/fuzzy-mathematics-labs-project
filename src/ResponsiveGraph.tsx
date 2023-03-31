import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { IPoint } from "./PointService";

export interface IResponsiveGraph {
  data: any;
  width?: number;
  height?: number;
  tooltip?: boolean;
  dot?: boolean;
  legend?: boolean;
}

export const ResponsiveGraph: React.FC<IResponsiveGraph> = ({
  data,
  width,
  height,
  tooltip,
  dot,
  legend,
}) => {
  const minX = React.useMemo(() => {
    return Math.min(...data.map((d: IPoint) => d.x));
  }, [data]);
  const minY = React.useMemo(() => {
    return Math.min(...data.map((d: IPoint) => d.y));
  }, [data]);
  return (
    <ResponsiveContainer minWidth="400" height={444}>
      <LineChart
        margin={{
          top: 10,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <YAxis
          dataKey="y"
          domain={["auto", "auto"]}
          type="number"
          interval={0}
          label={{
            value: `y`,
            style: { textAnchor: "middle" },
            angle: -90,
            position: "left",
            offset: 0,
          }}
          allowDataOverflow={true}
          strokeWidth={minX < 0 ? 0 : 1}
        />

        <XAxis
          dataKey="x"
          domain={["auto", "auto"]}
          interval={0}
          type="number"
          label={{
            key: "xAxisLabel",
            value: "x",
            position: "bottom",
          }}
          allowDataOverflow={true}
          strokeWidth={minY < 0 ? 0 : 1}
        />

        {minY < 0 && (
          <ReferenceLine
            y={0}
            stroke="gray"
            strokeWidth={1.5}
            strokeOpacity={0.65}
          />
        )}
        {minX < 0 && (
          <ReferenceLine
            x={0}
            stroke="gray"
            strokeWidth={1.5}
            strokeOpacity={0.65}
          />
        )}

        <Line
          strokeWidth={2}
          data={data}
          dot={false}
          type="monotone"
          dataKey="y"
          stroke="black"
          tooltipType="none"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
