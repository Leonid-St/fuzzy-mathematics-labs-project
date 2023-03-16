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

import { FC, useEffect, useState } from "react";

type Unsubscribe = () => void;

type Observer<T> = (v: T) => void;

type Subject<T> = {
  getValue: () => T;
  setValue: (v: T) => void;
  subscribe: (f: Observer<T>) => Unsubscribe;
};

interface test {
  list: JSX.Element[];
  i: number;
}

const createSubject = function <T>(initialValue: T): Subject<T> {
  let current: T = initialValue;
  const subscribers = new Map<Observer<T>, Observer<T>>();
  return {
    getValue: () => current,
    setValue: (v) => {
      current = v;
      subscribers.forEach((f) => f(current));
    },
    subscribe: (f) => {
      subscribers.set(f, f);
      return () => subscribers.delete(f);
    }
  };
};

const Wrapper: React.FC<any> = ({ children }) => (
  <div style={{ padding: "0.5rem" }}>{children}</div>
);

const useSubject = function (subject: any) {
  const [value, setValue] = useState(subject.getValue);
  useEffect(() => subject.subscribe(setValue), [subject]);
  return (
    <>
      {(value as any).list.map((e: any) => (
        <>{e}</>
      ))}
    </>
  );
};

const RenderSubject = function <T>({ children }: { children: Subject<T> }) {
  return useSubject(children);
};

const Counter = () => {
  const counterSubject = createSubject<test>({
    list: [<div style={{ color: "black" }}>1</div>],
    i: 1
  });
  return (
    <Wrapper>
      <div>{Math.random()}</div>
      <button
        onClick={() => {
          counterSubject.setValue(
            (() => {
              const value = counterSubject.getValue();
              const newValue = {
                list: [
                  ...value.list,
                  <div style={{ color: "black" }}>{value.i + 1}</div>
                ],
                i: value.i + 1
              };
              return newValue;
            })()
            //.add(<div style={{ color: "black" }}></div>)
          );
        }}
      >
        {"<"}
      </button>
      <strong style={{ color: "black", padding: "0 0.25rem" }}>
        <RenderSubject>{counterSubject}</RenderSubject>
      </strong>
      <button
        onClick={() => {
          counterSubject.setValue(
            (() => {
              const value = counterSubject.getValue();
              const newValue = {
                list: [
                  ...value.list,
                  <div style={{ color: "black" }}>{value.i - 1}</div>
                ],
                i: value.i - 1
              };
              return newValue;
            })()
          );
        }}
      >
        {">"}
      </button>
    </Wrapper>
  );
};

// export const App = () => {
//   return (
//     <div>
//       <Counter />
//       <Counter />
//     </div>
//   );
// };

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
    <>
      <Counter />
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
    </>
  );
};
