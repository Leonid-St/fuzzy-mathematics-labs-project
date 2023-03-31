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
  SelectedGrapth,
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
import { ColorToggleButton, ToogleView } from "./toggleTabsOneOrAll";
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
    editable: true,
  },
  {
    field: "left",
    headerName: "left-x",
    width: 100,
    editable: true,
  },
  {
    field: "right",
    headerName: "right-x",
    width: 100,
  },
];
interface IApp {
  pointService: PointService;
  showTable?: boolean;
  selectedGraph?: SelectedGrapth;
  setSelectedGraph: (selectedGraph: SelectedGrapth) => void;
}
export const App: React.FC<IApp> = ({
  pointService,
  showTable = false,
  selectedGraph,
  setSelectedGraph,
}) => {
  const [alpha, setAlpha] = React.useState<number | undefined>();
  const [A, setA] = React.useState<number | undefined>();
  const [B, setB] = React.useState<number | undefined>();
  const [C, setC] = React.useState<number | undefined>();
  const [D, setD] = React.useState<number | undefined>();

  const [alignment, setAlignment] = React.useState<ToogleView>(
    ToogleView.OneChart
  );

  //const [sliderA, setsliderA] = React.useState<number | undefined>();
  const fuzzyClass = React.useMemo(() => {
    return new Fuzzy();
  }, []);

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

  const recalculateAlphaLevelsGraphS = React.useCallback(
    (alphaLevel: number, a: number, b: number) => {
      pointService.calculateAlphaLevelsGraphS(alphaLevel, a, b);
    },
    [pointService]
  );

  const recalculatePointsAlphaLevelsGraphS = React.useCallback(
    (a: number, b: number) => {
      pointService.calculateAlphaLevelsPointsGraphS(a, b);
    },
    [pointService]
  );

  const updateAlphaLevelsGraphS = React.useCallback(
    (alphaLevel: number, a: number, b: number) => {
      recalculateAlphaLevelsGraphS(alphaLevel, a, b);
      recalculatePointsAlphaLevelsGraphS(a, b);
    },
    [recalculateAlphaLevelsGraphS, recalculatePointsAlphaLevelsGraphS]
  );
  //--//
  const recalculateAlphaLevelsMountain = React.useCallback(
    (alphaLevel: number, a: number, b: number, c: number) => {
      pointService.calculateAlphaLevelsMountain(alphaLevel, a, b, c);
    },
    [pointService]
  );

  const recalculatePointsAlphaLevelsMountain = React.useCallback(
    (a: number, b: number, c: number) => {
      pointService.calculateAlphaLevelsPointsMountain(a, b, c);
    },
    [pointService]
  );

  const updateAlphaLevelsMountain = React.useCallback(
    (alphaLevel: number, a: number, b: number, c: number) => {
      recalculateAlphaLevelsMountain(alphaLevel, a, b, c);
      recalculatePointsAlphaLevelsMountain(a, b, c);
    },
    [recalculateAlphaLevelsMountain, recalculatePointsAlphaLevelsMountain]
  );
  //--//
  const recalculateAlphaLevelsTriangle = React.useCallback(
    (alphaLevel: number, a: number, b: number, c: number) => {
      pointService.calculateAlphaLevelsTriangle(alphaLevel, a, b, c);
    },
    [pointService]
  );

  const recalculatePointsAlphaLevelsTriangle = React.useCallback(
    (a: number, b: number, c: number) => {
      pointService.calculateAlphaLevelsPointsTriangle(a, b, c);
    },
    [pointService]
  );

  const updateAlphaLevelsTriangle = React.useCallback(
    (alphaLevel: number, a: number, b: number, c: number) => {
      recalculateAlphaLevelsTriangle(alphaLevel, a, b, c);
      recalculatePointsAlphaLevelsTriangle(a, b, c);
    },
    [recalculateAlphaLevelsTriangle, recalculatePointsAlphaLevelsTriangle]
  );
  //--//

  const recalculateAlphaLevelsBackS = React.useCallback(
    (alphaLevel: number, a: number, b: number, c: number) => {
      pointService.calculateAlphaLevelsBackS(alphaLevel, a, b, c);
    },
    [pointService]
  );

  const recalculatePointsAlphaLevelsBackS = React.useCallback(
    (a: number, b: number, c: number) => {
      pointService.calculateAlphaLevelsPointsBackS(a, b, c);
    },
    [pointService]
  );

  const updateAlphaLevelsBackS = React.useCallback(
    (alphaLevel: number, a: number, b: number, c: number) => {
      recalculateAlphaLevelsBackS(alphaLevel, a, b, c);
      recalculatePointsAlphaLevelsBackS(a, b, c);
    },
    [recalculateAlphaLevelsBackS, recalculatePointsAlphaLevelsBackS]
  );
  //--//
  const recalculateAlphaLevelsTrapeze = React.useCallback(
    (alphaLevel: number, a: number, b: number, c: number, d: number) => {
      pointService.calculateAlphaLevelsTrapeze(alphaLevel, a, b, c, d);
    },
    [pointService]
  );

  const recalculatePointsAlphaLevelsTrapeze = React.useCallback(
    (a: number, b: number, c: number, d: number) => {
      pointService.calculateAlphaLevelsPointsTrapeze(a, b, c, d);
    },
    [pointService]
  );

  const updateAlphaLevelsTrapeze = React.useCallback(
    (alphaLevel: number, a: number, b: number, c: number, d: number) => {
      recalculateAlphaLevelsTrapeze(alphaLevel, a, b, c, d);
      recalculatePointsAlphaLevelsTrapeze(a, b, c, d);
    },
    [recalculateAlphaLevelsTrapeze, recalculatePointsAlphaLevelsTrapeze]
  );
  //--//
  const recalculateAlphaLevelsGaussian = React.useCallback(
    (alphaLevel: number, a: number, b: number) => {
      pointService.calculateAlphaLevelsGaussian(alphaLevel, a, b);
    },
    [pointService]
  );

  const recalculatePointsAlphaLevelsGaussian = React.useCallback(
    (a: number, b: number) => {
      pointService.calculateAlphaLevelsPointsGaussian(a, b);
    },
    [pointService]
  );

  const updateAlphaLevelsGaussian = React.useCallback(
    (alphaLevel: number, a: number, b: number) => {
      recalculateAlphaLevelsGaussian(alphaLevel, a, b);
      recalculatePointsAlphaLevelsGaussian(a, b);
    },
    [recalculateAlphaLevelsGaussian, recalculatePointsAlphaLevelsGaussian]
  );
  //--//

  const recalculateAlphaLevelsSigmoid = React.useCallback(
    (alphaLevel: number, a: number, b: number) => {
      pointService.calculateAlphaLevelsSigmoid(alphaLevel, a, b);
    },
    [pointService]
  );

  const recalculatePointsAlphaLevelsSigmoid = React.useCallback(
    (a: number, b: number) => {
      pointService.calculateAlphaLevelsPointsSigmoid(a, b);
    },
    [pointService]
  );

  const updateAlphaLevelsSigmoid = React.useCallback(
    (alphaLevel: number, a: number, b: number) => {
      recalculateAlphaLevelsSigmoid(alphaLevel, a, b);
      recalculatePointsAlphaLevelsSigmoid(a, b);
    },
    [recalculateAlphaLevelsSigmoid, recalculatePointsAlphaLevelsSigmoid]
  );
  //--//
  const recalculateAlphaLevelsRoughMountain = React.useCallback(
    (alphaLevel: number, a: number, b: number) => {
      pointService.calculateAlphaLevelsRoughMountain(alphaLevel, a, b);
    },
    [pointService]
  );

  const recalculatePointsAlphaLevelsRoughMountain = React.useCallback(
    (a: number, b: number) => {
      pointService.calculateAlphaLevelsPointsRoughMountain(a, b);
    },
    [pointService]
  );

  const updateAlphaLevelsRoughMountain = React.useCallback(
    (alphaLevel: number, a: number, b: number) => {
      recalculateAlphaLevelsRoughMountain(alphaLevel, a, b);
      recalculatePointsAlphaLevelsRoughMountain(a, b);
    },
    [
      recalculateAlphaLevelsRoughMountain,
      recalculatePointsAlphaLevelsRoughMountain,
    ]
  );
  //--/
  const updateAlphaLevels = React.useCallback(
    //throttle(
    (alphaLevels: number, a: number, b: number, c?: number, d?: number) => {
      if (alignment === ToogleView.OneChart) {
        switch (selectedGraph) {
          case GraphName.S:
            updateAlphaLevelsGraphS(alphaLevels, a, b);
            break;
          case GraphName.Mountain:
            if (c) updateAlphaLevelsMountain(alphaLevels, a, b, c);
            break;
          case GraphName.Triangle:
            if (c) updateAlphaLevelsTriangle(alphaLevels, a, b, c);
            break;
          case GraphName.BackS:
            if (c) updateAlphaLevelsBackS(alphaLevels, a, b, c);
            break;
          case GraphName.Trapeze:
            if (c && d) updateAlphaLevelsTrapeze(alphaLevels, a, b, c, d);
            break;
          case GraphName.Gaussian:
            updateAlphaLevelsGaussian(alphaLevels, a, b);
            break;
          case GraphName.Sigmoid:
            updateAlphaLevelsSigmoid(alphaLevels, a, b);
            break;
          case GraphName.RoughMountain:
            updateAlphaLevelsRoughMountain(alphaLevels, a, b);
            break;
        }
      }
      if (alignment === ToogleView.All) {
        //updatePointsAB();
      }
      //}, 16),
    },
    [
      alignment,
      selectedGraph,
      updateAlphaLevelsBackS,
      updateAlphaLevelsGaussian,
      updateAlphaLevelsGraphS,
      updateAlphaLevelsMountain,
      updateAlphaLevelsRoughMountain,
      updateAlphaLevelsSigmoid,
      updateAlphaLevelsTrapeze,
      updateAlphaLevelsTriangle,
    ]
  );

  const updatePointsGraphS = React.useCallback(
    (a: number, b: number) => {
      pointService.calculatePointsGraphS(a, b);
      if (alpha) updateAlphaLevelsGraphS(alpha, a, b);
    },
    [pointService, alpha, updateAlphaLevelsGraphS]
  );

  const updatePointsMountain = React.useCallback(
    (a: number, b: number, c: number) => {
      pointService.calculatePointsMountain(a, b, c);
      if (alpha) updateAlphaLevelsMountain(alpha, a, b, c);
    },
    [alpha, pointService, updateAlphaLevelsMountain]
  );

  const updatePointsTriangle = React.useCallback(
    (a: number, b: number, c: number) => {
      pointService.calculatePointsTriangle(a, b, c);
    },
    [pointService]
  );

  const updatePointsBackS = React.useCallback(
    (a: number, b: number, c: number) => {
      pointService.calculatePointsBackS(a, b, c);
    },
    [pointService]
  );

  const updatePointsTrapeze = React.useCallback(
    (a: number, b: number, c: number, d: number) => {
      pointService.calculatePointsTrapeze(a, b, c, d);
    },
    [pointService]
  );

  const updatePointsGaussian = React.useCallback(
    (a: number, b: number) => {
      pointService.calculatePointsGaussian(a, b);
    },
    [pointService]
  );

  const updatePointsSigmoid = React.useCallback(
    (a: number, b: number) => {
      pointService.calculatePointsSigmoid(a, b);
    },
    [pointService]
  );

  const updatePointsRoughMountain = React.useCallback(
    (a: number, b: number) => {
      pointService.calculatePointsRoughMountain(a, b);
    },
    [pointService]
  );

  const updatePoints = React.useCallback(
    //throttle(
    (a: number, b: number, c?: number, d?: number) => {
      if (alignment === ToogleView.OneChart) {
        switch (selectedGraph) {
          case GraphName.S:
            updatePointsGraphS(a, b);
            break;
          case GraphName.Mountain:
            if (c) updatePointsMountain(a, b, c);
            break;
          case GraphName.Triangle:
            if (c) updatePointsTriangle(a, b, c);
            break;
          case GraphName.BackS:
            if (c) updatePointsBackS(a, b, c);
            break;
          case GraphName.Trapeze:
            if (c && d) updatePointsTrapeze(a, b, c, d);
            break;
          case GraphName.Gaussian:
            updatePointsGaussian(a, b);
            break;
          case GraphName.Sigmoid:
            updatePointsSigmoid(a, b);
            break;
          case GraphName.RoughMountain:
            updatePointsRoughMountain(a, b);
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
      updatePointsTriangle,
    ]
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

  // console.log({ pointService });

  const prepareDataForDataGrid = (arr: Array<any>) => {
    return arr.map((s: any, i: number) => ({ id: s.alphaLevel, ...s }));
  };

  const getDataForDataGrid = () => {
    if (alignment === ToogleView.OneChart) {
      switch (selectedGraph) {
        case GraphName.S:
          return prepareDataForDataGrid(pointService.alphaLevelsStructGraphS);
        case GraphName.Mountain:
          return prepareDataForDataGrid(
            pointService.alphaLevelsStructGraphMountain
          );
        case GraphName.Triangle:
          return prepareDataForDataGrid(
            pointService.alphaLevelsStructGraphTriangle
          );
        case GraphName.BackS:
          return prepareDataForDataGrid(
            pointService.alphaLevelsStructGraphBackS
          );
        case GraphName.Trapeze:
          return prepareDataForDataGrid(
            pointService.alphaLevelsStructGraphTrapeze
          );
        case GraphName.Gaussian:
          return prepareDataForDataGrid(
            pointService.alphaLevelsStructGraphGaussian
          );
        case GraphName.Sigmoid:
          return prepareDataForDataGrid(
            pointService.alphaLevelsStructGraphSigmoid
          );
        case GraphName.RoughMountain:
          console.log(
            "console.log(pointService.alphaLevelsStructGraphRoughMountain);"
          );
          console.log(pointService.alphaLevelsStructGraphRoughMountain);
          return prepareDataForDataGrid(
            pointService.alphaLevelsStructGraphRoughMountain
          );
      }
    }
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
                    setAlpha={(alphaLevels) => {
                      setAlpha(alphaLevels);
                      if (alphaLevels && A && B) {
                        updateAlphaLevels(alphaLevels, A, B, C, D);
                      }
                    }}
                    A={A}
                    setA={
                      // throttle(
                      (a) => {
                        if (a) {
                          setA(a);
                          if (a && B) {
                            updatePoints(a, B, C, D);
                            if (alpha) updateAlphaLevels(alpha, a, B, C, D);
                          }
                        }
                        //}, 1500)
                      }
                    }
                    B={B}
                    setB={
                      //throttle(
                      (b) => {
                        setB(b);
                        if (A && b) {
                          updatePoints(A, b, C, D);
                          if (alpha) updateAlphaLevels(alpha, A, b, C, D);
                        }
                        // }, 16)
                      }
                    }
                    C={C}
                    setC={
                      //throttle(
                      (c) => {
                        setC(c);
                        if (A && B && c) {
                          updatePoints(A, B, c, D);
                          if (alpha) updateAlphaLevels(alpha, A, B, c, D);
                        }
                        //    }, 16)
                      }
                    }
                    D={D}
                    setD={
                      //throttle(
                      (d) => {
                        setD(d);
                        if (A && B && C && d) {
                          updatePoints(A, B, C, d);
                          if (alpha) updateAlphaLevels(alpha, A, B, C, d);
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
                        dot
                      />
                    ) : selectedGraph === GraphName.Mountain ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphMountain}
                        additionalPoints={
                          pointService.alphaLevelsPointsGraphMountain
                        }
                        dot
                      />
                    ) : selectedGraph === GraphName.Triangle ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphTriangle}
                        additionalPoints={
                          pointService.alphaLevelsPointsGraphTriangle
                        }
                        dot
                      />
                    ) : selectedGraph === GraphName.BackS ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphBackS}
                        additionalPoints={
                          pointService.alphaLevelsPointsGraphBackS
                        }
                        dot
                      />
                    ) : selectedGraph === GraphName.Trapeze ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphTrapeze}
                        additionalPoints={
                          pointService.alphaLevelsPointsGraphTrapeze
                        }
                        dot
                      />
                    ) : selectedGraph === GraphName.Gaussian ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphGaussian}
                        additionalPoints={
                          pointService.alphaLevelsPointsGraphGaussian
                        }
                        dot
                      />
                    ) : selectedGraph === GraphName.Sigmoid ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphSigmoid}
                        additionalPoints={
                          pointService.alphaLevelsPointsGraphSigmoid
                        }
                        dot
                      />
                    ) : selectedGraph === GraphName.RoughMountain ? (
                      <RenderLineChart
                        width={600}
                        height={500}
                        data={pointService.pointsGraphRoughMountain}
                        additionalPoints={(() => {
                          return pointService.alphaLevelsPointsGraphRoughMountain;
                        })()}
                        dot
                      />
                    ) : (
                      <></>
                    )}
                  </Grid>
                  {selectedGraph && showTable ? (
                    <Grid item xs={2} minWidth={"30%"}>
                      <Box sx={{ height: "100%", width: "100%" }}>
                        <DataGrid
                          rows={getDataForDataGrid() ?? []}
                          columns={columns}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 10,
                              },
                            },
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
