import React from "react";
import "./App.css";
import { GraphMenu, SelectGraph } from "./fuzzy/GraphMenu";
///import { CustomizedMenus, RenderLineChart } from "./SelectGrapth";
import Grid from "@mui/material/Grid";
import { InputParams } from "./InputParams";
import { Fuzzy, FuzzyClass } from "./fuzzy/FuzzuClass";
import {
  GraphByNumber,
  GraphName,
  GraphsParam,
  SelectedGrapth
} from "./fuzzy/ProtocolFuzy";
import Box from "@mui/material/Box";
// interface IApp {
//   fuzzyClass: FuzzyClass;
// }
import Stack from "@mui/material/Stack";
import { RenderLineChart } from "./RenderLineChart";
import { ResponsiveGraph } from "./ResponsiveGraph";

import { Slider } from "@mui/material";

import { off } from "process";
import { ColorToggleButton, ToogleView } from "./toggleTabs";
import { AllCharts } from "./AllCharts";
export interface IPoint {
  x: number;
  y: number;
}

export interface IPointStorage {
  pointsGraphS: Array<IPoint>;
  pointsGraphMountain: Array<IPoint>;
  pointsGraphTriangle: Array<IPoint>;
  pointsGraphBackS: Array<IPoint>;
  pointsGraphTrapeze: Array<IPoint>;
  pointsGraphGaussian: Array<IPoint>;
  pointsGraphSigmoid: Array<IPoint>;
  pointsGraphRoughMountain: Array<IPoint>;
}

export const App: React.FC = () => {
  const [alpha, setAlpha] = React.useState<number | undefined>(1);
  const [A, setA] = React.useState<number | undefined>();
  const [B, setB] = React.useState<number | undefined>();
  const [C, setC] = React.useState<number | undefined>();
  const [D, setD] = React.useState<number | undefined>();

  //const [sliderA, setsliderA] = React.useState<number | undefined>();
  const fuzzyClass = React.useMemo(() => {
    return new Fuzzy();
  }, []);
  const createPointStorage = React.useCallback(
    //debounce(
    () => {
      //const fuzzyClass = React.useMemo(() => getFuzzyClass(), []);
      const pointsGraphS: Array<IPoint> = [];
      const pointsGraphMountain: Array<IPoint> = [];
      const pointsGraphTriangle: Array<IPoint> = [];
      const pointsGraphBackS: Array<IPoint> = [];
      const pointsGraphTrapeze: Array<IPoint> = [];
      const pointsGraphGaussian: Array<IPoint> = [];
      const pointsGraphSigmoid: Array<IPoint> = [];
      const pointsGraphRoughMountain: Array<IPoint> = [];

      for (let i = 0; i < 50; i++) {
        if (A && B)
          pointsGraphS.push({
            x: i,
            y: fuzzyClass.findYGraphS(i, A, B)
          });
        if (A && B && C)
          pointsGraphMountain.push({
            x: i,
            y: fuzzyClass.findYGraphMountain(i, A, B, C)
          });
        if (A && B && C)
          pointsGraphTriangle.push({
            x: i,
            y: fuzzyClass.findYGraphTriangle(i, A, B, C)
          });
        if (A && B && C)
          pointsGraphBackS.push({
            x: i,
            y: fuzzyClass.findYGraphBackS(i, A, B, C)
          });
        if (A && B && C && D)
          pointsGraphTrapeze.push({
            x: i,
            y: fuzzyClass.findYGraphTrapeze(i, A, B, C, D)
          });
        if (A && B)
          pointsGraphGaussian.push({
            x: i,
            y: fuzzyClass.findYGraphGaussian(i, A, B)
          });
        if (A && B)
          pointsGraphSigmoid.push({
            x: i,
            y: fuzzyClass.findYGraphSigmoid(i, A, B)
          });
        if (A && B)
          pointsGraphRoughMountain.push({
            x: i,
            y: fuzzyClass.findYGraphRoughMountain(i, A, B)
          });
      }
      return {
        pointsGraphS,
        pointsGraphMountain,
        pointsGraphTriangle,
        pointsGraphBackS,
        pointsGraphTrapeze,
        pointsGraphGaussian,
        pointsGraphSigmoid,
        pointsGraphRoughMountain
      };
    },
    // }, 150),
    [A, B, C, D, fuzzyClass]
  );

  const stor: IPointStorage | undefined = createPointStorage();
  let PointStorage: IPointStorage | any = {};
  const [alignment, setAlignment] = React.useState<ToogleView>(ToogleView.All);
  if (stor) PointStorage = stor;

  const [selectedGraph, setSelectedGraph] = React.useState<
    SelectedGrapth | undefined
  >(undefined);
  //React.useEffect(() => {}, [A, B, C, D, alpha, PointStorage, stor]);
  return (
    <div className="App">
      <Stack spacing={3}>
        <Grid item xs={1}>
          <ColorToggleButton
            alignment={alignment}
            setAlignment={setAlignment}
          />
        </Grid>
        <Grid item xs={11}>
          <Stack spacing={1} direction={"row"}>
            <Grid item xs={2} minWidth={300}>
              <Grid
                container
                rowSpacing={5}
                columnSpacing={5}
                direction={"column"}
                minWidth={300}
              >
                {alignment === ToogleView.OneChart ? (
                  <Grid item>
                    <GraphMenu
                      selectedGraph={selectedGraph}
                      setSelectedGraph={setSelectedGraph}
                      fuzzyClass={fuzzyClass}
                      PointStorage={PointStorage}
                    />
                  </Grid>
                ) : (
                  <></>
                )}

                <Grid item>
                  <InputParams
                    alpha={alpha}
                    setAlpha={setAlpha}
                    A={A}
                    setA={setA}
                    B={B}
                    setB={setB}
                    C={C}
                    setC={setC}
                    D={D}
                    setD={setD}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              {alignment === ToogleView.All ? (
                <AllCharts PointStorage={PointStorage} />
              ) : (
                <>
                  <Stack
                    spacing={2}
                    direction={"row"}
                    textAlign={"center"}
                    // height={"100%"}
                  >
                    <Grid item>
                      {selectedGraph === GraphName.S ? (
                        <RenderLineChart
                          width={600}
                          height={500}
                          data={PointStorage.pointsGraphS}
                        />
                      ) : selectedGraph === GraphName.Mountain ? (
                        <RenderLineChart
                          width={600}
                          height={500}
                          data={PointStorage.pointsGraphMountain}
                        />
                      ) : selectedGraph === GraphName.Triangle ? (
                        <RenderLineChart
                          width={600}
                          height={500}
                          data={PointStorage.pointsGraphTriangle}
                        />
                      ) : selectedGraph === GraphName.BackS ? (
                        <RenderLineChart
                          width={600}
                          height={500}
                          data={PointStorage.pointsGraphBackS}
                        />
                      ) : selectedGraph === GraphName.Trapeze ? (
                        <RenderLineChart
                          width={600}
                          height={500}
                          data={PointStorage.pointsGraphTrapeze}
                        />
                      ) : selectedGraph === GraphName.Gaussian ? (
                        <RenderLineChart
                          width={600}
                          height={500}
                          data={PointStorage.pointsGraphGaussian}
                        />
                      ) : selectedGraph === GraphName.Sigmoid ? (
                        <RenderLineChart
                          width={600}
                          height={500}
                          data={PointStorage.pointsGraphSigmoid}
                        />
                      ) : selectedGraph === GraphName.RoughMountain ? (
                        <RenderLineChart
                          width={600}
                          height={500}
                          data={PointStorage.pointsGraphRoughMountain}
                        />
                      ) : (
                        <></>
                      )}
                    </Grid>

                    <Grid item></Grid>
                  </Stack>
                </>
              )}
            </Grid>
          </Stack>
        </Grid>
      </Stack>
    </div>
  );
};
