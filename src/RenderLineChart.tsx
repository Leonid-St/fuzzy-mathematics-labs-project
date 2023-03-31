/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { FunctionComponent, useEffect, useState } from "react";
import {
  VictoryChart, VictoryCursorContainer, VictoryLine,
  VictoryScatter
} from "victory";
import { IPoint } from "./PointService";

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
    },
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
    i: 1,
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
                  <div style={{ color: "black" }}>{value.i + 1}</div>,
                ],
                i: value.i + 1,
              };
              return newValue;
            })()
            
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
                  <div style={{ color: "black" }}>{value.i - 1}</div>,
                ],
                i: value.i - 1,
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



export interface IRenderLineChart {
  data?: Array<IPoint>;
  width: number;
  height: number;
  additionalPoints?: Array<IPoint>;
  tooltip?: boolean;
  dot?: boolean;
  legend?: boolean;
}

const CustomDot: FunctionComponent<any> = (props: any) => {
  const { cx, cy, value, additionalPoints } = props;
  if (additionalPoints && additionalPoints.length) {
    const point = (additionalPoints as Array<IPoint>).find(
      (p) => p.y === value
    );
    if (point) {
      return (
        <svg
        
          width={20}
          height={20}
          fill="red"
          viewBox="0 0 1024 1024"
        >
          <circle
          
            r="40"
            stroke="black"
            stroke-width="3"
            fill="red"
          />
        </svg>
      );
    }
  }

  return <></>;
};



export const RenderLineChart: React.FC<IRenderLineChart> = ({
  data,
  width,
  height,
  additionalPoints,
  tooltip,
  dot,
  legend,
}) => {
  if (additionalPoints && additionalPoints.length)
    additionalPoints = additionalPoints.map((a) => ({
      ...a,
      x: parseFloat(a.x.toFixed(1)),
    }));
  if (data)
    data = data.map((d) => ({
      ...d,
      x: parseFloat(d.x.toFixed(1)),
    }));
  
  return (
    <>
      {/* <Counter /> */}
      <VictoryChart
        width={width}
        height={height}
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={({ datum }) =>
              `${datum.x.toPrecision(2)}, ${datum.y.toPrecision(2)}`
            }
          />
        }
      >
        {additionalPoints && additionalPoints.length ? (
          <VictoryScatter
            style={{
              parent: {
                border: "1px solid #ccc",
              },
              data: {
                fill: "#c43a31",
                fillOpacity: 0.6,
                stroke: "#c43a31",
                strokeWidth: 2,
              },
              labels: {
                fontSize: 10,
                fill: "#c43a31",
                padding: 15,
              },
            }}
            size={9}
            data={additionalPoints}
            labels={({ datum }) => datum.x}
          />
        ) : null}
        {data ? <VictoryLine data={data} /> : null}
       
      </VictoryChart>
     
    </>
  );
};
