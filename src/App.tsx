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
import { PointService } from "./PointService";
import { throttle, debounce } from "lodash";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: any = [
  {
    field: "id",
    headerName: "alpha level",
    width: 100,
    hideable: true,
    hide: true,
    editable: true
  },
  {
    field: "left",
    headerName: "left-x",
    width: 100,
    editable: true
  },
  {
    field: "right",
    headerName: "right-x",
    width: 100
  }
];

export const App: React.FC = () => {
  const [alpha, setAlpha] = React.useState<number | undefined>();
  const [A, setA] = React.useState<number | undefined>();
  const [B, setB] = React.useState<number | undefined>();
  const [C, setC] = React.useState<number | undefined>();
  const [D, setD] = React.useState<number | undefined>();

  const [alignment, setAlignment] = React.useState<ToogleView>(ToogleView.All);

  const [selectedGraph, setSelectedGraph] = React.useState<
    SelectedGrapth | undefined
  >(undefined);
  //const [sliderA, setsliderA] = React.useState<number | undefined>();
  const fuzzyClass = React.useMemo(() => {
    return new Fuzzy();
  }, []);

  const pointService = React.useMemo(() => new PointService(), []);

  const updatePointsAB = React.useCallback(
    //debounce(
    //throttle(
    () => {
      //const fuzzyClass = React.useMemo(() => getFuzzyClass(), []);

      if (A && B) {
        pointService.calculatePointsGraphS(A, B);

        pointService.calculatePointsGaussian(A, B);

        pointService.calculatePointsSigmoid(A, B);

        pointService.calculatePointsRoughMountain(A, B);
      }
      if (A && B && C) {
        pointService.calculatePointsMountain(A, B, C);

        pointService.calculatePointsTriangle(A, B, C);

        pointService.calculatePointsBackS(A, B, C);
      }
      if (A && B && C && D) {
        pointService.calculatePointsTrapeze(A, B, C, D);
      }
      // }, 1500),
    },
    [A, B, C, D, pointService]
  );
  // const updatePointsABC = React.useCallback(
  //   //debounce(
  //   () => {
  //     if (A && B && C) {
  //       pointService.calculatePointsMountain(A, B, C);
  //       pointService.calculatePointsTriangle(A, B, C);
  //       pointService.calculatePointsBackS(A, B, C);
  //       if (A && B && C && D) {
  //         pointService.calculatePointsTrapeze(A, B, C, D);
  //       }
  //     }
  //   },
  //   [A, B, C, D, pointService]
  // );

  // const updatePointsABCD = React.useCallback(
  //   //debounce(
  //   () => {
  //     if (A && B && C && D) {
  //       pointService.calculatePointsTrapeze(A, B, C, D);
  //     }
  //   },
  //   [A, B, C, D, pointService]
  // );

  const updatePointsGraphS = React.useCallback(() => {
    if (A && B) pointService.calculatePointsGraphS(A, B);
    if (A && B && alpha) pointService.calculateAlphaLevelsGraphS(alpha, A, B);
  }, [A, B, alpha, pointService]);

  const updatePointsMountain = React.useCallback(() => {
    if (A && B && C) pointService.calculatePointsMountain(A, B, C);
  }, [A, B, C, pointService]);

  const updatePointsTriangle = React.useCallback(() => {
    if (A && B && C) pointService.calculatePointsTriangle(A, B, C);
  }, [A, B, C, pointService]);

  const updatePointsBackS = React.useCallback(() => {
    if (A && B && C) pointService.calculatePointsBackS(A, B, C);
  }, [A, B, C, pointService]);

  const updatePointsTrapeze = React.useCallback(() => {
    if (A && B && C && D) pointService.calculatePointsTrapeze(A, B, C, D);
  }, [A, B, C, D, pointService]);

  const updatePointsGaussian = React.useCallback(() => {
    if (A && B) pointService.calculatePointsGaussian(A, B);
  }, [A, B, pointService]);

  const updatePointsSigmoid = React.useCallback(() => {
    if (A && B) pointService.calculatePointsSigmoid(A, B);
  }, [A, B, pointService]);

  const updatePointsRoughMountain = React.useCallback(() => {
    if (A && B) pointService.calculatePointsRoughMountain(A, B);
  }, [A, B, pointService]);

  const updatePoints = React.useCallback(
    //throttle(
    () => {
      if (alignment === ToogleView.OneChart) {
        switch (selectedGraph) {
          case GraphName.S:
            updatePointsGraphS();
            break;
          case GraphName.Mountain:
            updatePointsMountain();
            break;
          case GraphName.Triangle:
            updatePointsTriangle();
            break;
          case GraphName.BackS:
            updatePointsBackS();
            break;
          case GraphName.Trapeze:
            updatePointsTrapeze();
            break;
          case GraphName.Gaussian:
            updatePointsGaussian();
            break;
          case GraphName.Sigmoid:
            updatePointsSigmoid();
            break;
          case GraphName.RoughMountain:
            updatePointsRoughMountain();
            break;
        }
      }
      if (alignment === ToogleView.All) {
        updatePointsAB();
      }
      //}, 16),
    },
    [
      alignment,
      selectedGraph,
      updatePointsAB,
      updatePointsBackS,
      updatePointsGaussian,
      updatePointsGraphS,
      updatePointsMountain,
      updatePointsRoughMountain,
      updatePointsSigmoid,
      updatePointsTrapeze,
      updatePointsTriangle
    ]
  );

  const calculateAlphaLevels = React.useCallback(
    (alphaLevel: number | undefined) => {
      if (A && B && alphaLevel) {
        pointService.calculateAlphaLevelsGraphS(alphaLevel, A, B);
        pointService.calculateAlphaLevelsPointsGraphS(A, B);
      }
    },
    [A, B, pointService]
  );

  // const updateRowGraphS = React.useCallback(() => {
  //   pointService.alphaLevelsStructGraphS.map((s) => {})[
  //     { alphaLevel: 1, left: 1, right: 1 }
  //   ];
  // }, []);

  // React.useEffect(() => {
  //   updatePointsAB();
  // }, [A, B, C, D]);
  // const stor: IPointStorage | undefined = createPointStorage();
  // let PointStorage: IPointStorage | any = {};

  //if (stor) PointStorage = stor;

  //React.useEffect(() => {}, [A, B, C, D, alpha, PointStorage, stor]);

  const FOR = () => {
    const a = [];
    for (let i = 0; i < 100; i++) {
      a.push(Math.random().toString(36));
    }
    return a;
  };
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
            <Grid item xs={1} minWidth={300}>
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
                      PointStorage={pointService}
                    />
                  </Grid>
                ) : (
                  <></>
                )}

                <Grid item>
                  <InputParams
                    alpha={alpha}
                    setAlpha={(e) => {
                      setAlpha(e);
                      calculateAlphaLevels(e);
                    }}
                    A={A}
                    setA={
                      // throttle(
                      (e) => {
                        if (e) {
                          setA(e);
                          updatePoints();
                        }
                        //}, 1500)
                      }
                    }
                    B={B}
                    setB={
                      //throttle(
                      (e) => {
                        if (e) {
                          setB(e);
                          updatePoints();
                        }
                        // }, 16)
                      }
                    }
                    C={C}
                    setC={
                      //throttle(
                      (e) => {
                        if (e) {
                          setC(e);
                          updatePoints();
                        }
                        //    }, 16)
                      }
                    }
                    D={D}
                    setD={
                      //throttle(
                      (e) => {
                        if (e) {
                          setD(e);
                          updatePoints();
                        }
                        //}, 16)
                      }
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11}>
              {alignment === ToogleView.All ? (
                <AllCharts PointStorage={pointService} />
              ) : (
                <Stack
                  spacing={2}
                  direction={"row"}
                  textAlign={"center"}
                  // height={"100%"}
                >
                  <Grid item xs={10}>
                    {selectedGraph === GraphName.S ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphS}
                        additionalPoints={pointService.alphaLevelsPointsGraphS}
                      />
                    ) : selectedGraph === GraphName.Mountain ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphMountain}
                      />
                    ) : selectedGraph === GraphName.Triangle ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphTriangle}
                      />
                    ) : selectedGraph === GraphName.BackS ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphBackS}
                      />
                    ) : selectedGraph === GraphName.Trapeze ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphTrapeze}
                      />
                    ) : selectedGraph === GraphName.Gaussian ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphGaussian}
                      />
                    ) : selectedGraph === GraphName.Sigmoid ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphSigmoid}
                      />
                    ) : selectedGraph === GraphName.RoughMountain ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphRoughMountain}
                      />
                    ) : (
                      <></>
                    )}
                  </Grid>
                  {selectedGraph ? (
                    <Grid item xs={2} minWidth={"30%"}>
                      <Box sx={{ height: "100%", width: "100%" }}>
                        <DataGrid
                          rows={pointService.alphaLevelsStructGraphS.map(
                            (s, i) => ({ id: s.alphaLevel, ...s })
                          )}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 10
                              }
                            }
                          }}
                          pageSizeOptions={[10]}
                          //checkboxSelection
                          disableRowSelectionOnClick
                        />
                        {/* <div>
                        {FOR().map((e, index) => (
                          <div style={{ color: "black" }} key={index}>
                            {e}
                          </div>
                        ))}
                      </div> */}
                      </Box>
                    </Grid>
                  ) : null}
                </Stack>
              )}
            </Grid>
          </Stack>
        </Grid>
      </Stack>
    </div>
  );
};
