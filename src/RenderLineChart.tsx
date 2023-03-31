import React from "react";

import { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import { IPoint } from "./PointService";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryCursorContainer,
} from "victory";

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

// export const App = () => {
//   return (
//     <div>
//       <Counter />
//       <Counter />
//     </div>
//   );
// };

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
          // x={cx - 10}
          // y={cy - 10}
          width={20}
          height={20}
          fill="red"
          viewBox="0 0 1024 1024"
        >
          <circle
            // cx="50"
            // cy="50"
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

// class Bar extends React.Component {
//   render() {
//     const data = {
//       labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"],
//       series: [[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]]
//     };

//     const options = {
//       high: 10,
//       low: -10,
//       axisX: {
//         labelInterpolationFnc: function (value: any, index: any) {
//           return index % 2 === 0 ? value : null;
//         }
//       }
//     };

//     const type = "Bar";

//     return (
//       <div>
//         <ChartistGraph data={data} options={options} type={type} />
//       </div>
//     );
//   }
// }

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
  // console.log(data);
  // console.log(additionalPoints);

  //data = data.map((d)=>({...d,xA additionalPoints,yA}))
  // const d = (() => {
  //   const newData: Array<any> = [];
  //   let indexNewArray = 0;
  //   let indexAdditional = 0;
  //   if (additionalPoints && additionalPoints.length !== 0)
  //     for (let i = 0; i < data.length - 2; i++) {
  //       //const curX = data[i].x;
  //       if (!additionalPoints[indexAdditional]) {
  //         newData.push(data[i]);
  //         continue;
  //       }
  //       if (
  //         data[i].x <= additionalPoints[indexAdditional].x &&
  //         data[i + 1].x >= additionalPoints[indexAdditional].x
  //       ) {
  //         newData.push(data[i]);
  //         indexNewArray++;
  //         newData.push({
  //           ...additionalPoints[indexAdditional],
  //           yA: additionalPoints[indexAdditional].y
  //         });
  //         indexNewArray++;
  //         indexAdditional++;
  //         console.log("indexAdditional:  " + indexAdditional);
  //         console.log(
  //           "additionalPoints[indexAdditional]:  ",
  //           additionalPoints[indexAdditional]
  //         );
  //       } else {
  //         newData.push(data[i]);
  //         indexNewArray++;
  //       }
  //     }
  //   return newData;
  // })();
  //console.log({ d });
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
        {/* <VictoryLine
          style={{ data: { stroke: "red" } }}
          data={additionalPoints}
        /> */}
      </VictoryChart>
      {/* <LineChart
        width={width}
        height={height}
        // data= {additionalPoints && additionalPoints.length !== 0 ? d : data}
        // data={d}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <XAxis xAxisId={1} dataKey={"x"} id="1" interval={5} />
        <YAxis dataKey="y" />
        <XAxis xAxisId={2} id="1" dataKey="xa" interval={5} /> 
        <Line
          // type="monotone"
          dataKey="y"
          data={data}
          stroke="#8884d8"
          xAxisId={1}
          //data={data}
          dot={
            dot
              ? additionalPoints
                ? ((<CustomDot additionalPoint={additionalPoints} />) as any)
                : true
              : false
          }
        />
        {additionalPoints
          ? additionalPoints.map((p, i) => {
              const getNumber = (arr: any, number: any) =>
                arr
                  .map((it: any) => {
                    const ch = (it >= 0 ? it : -it) + number;
                    return {
                      base: it,
                      result: ch >= 0 ? ch : -ch
                    };
                  })
                  .sort((a: any, b: any) => a.result - b.result)[0].base;
              const getNumber = (arr: any, searchNumer: any) =>
                arr.find(
                  (it: any) =>
                    Math.abs(it - searchNumer) ===
                    Math.min(
                      ...arr.map((it: any) => Math.abs(it - searchNumer))
                    )
                );
              const near = getNumber(
                (() => {
                  const a = [];
                  for (let i = 0; i < 50; i++) a.push(i);
                  return a;
                })(),
                p.x
              ); // <= тот элемент, который нам нужен
              return (
                <>
                  <ReferenceLine key={`x-${i}`} x={near} stroke="red" />{" "}
                  <ReferenceLine key={`y-${i}`} y={p.y} stroke="red" />
                  <Line
                    type="basisOpen"
                    dataKey="y"
                    stroke="red"
                    //style={{ opacity: 0 }}
                    dot={{ radius: 5 }}
                  />
                </>
              );
            })
          : null}
        {additionalPoints
          ? additionalPoints.map((p, i) => (
              <ReferenceLine key={`y-${i}`} y={p.y} stroke="red" />
            ))
          : null}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

        {additionalPoints ? (
          <Line
            type="monotone"
            dataKey="yA"
            stroke="red"
            xAxisId={1}
            data={additionalPoints}
            // data={additionalPoints}
            //style={{ opacity: 0 }}
            dot={{ radius: 5 }}
          />
        ) : null}

        {tooltip ? <Tooltip /> : null}
        {legend ? <Legend /> : null}
      </LineChart> */}
    </>
  );
};
