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
import { IPointService } from "./PointService";
interface IAllCharts {
  PointStorage: IPointService;
}
export const AllCharts: React.FC<IAllCharts> = ({ PointStorage }) => {
  return (
    <>
      <Stack
        spacing={2}
        direction={"column"}
        textAlign={"center"}
        // height={"100%"}
      >
        <Grid item>
          <Stack spacing={2} direction={"row"}>
            <Grid item>
              <RenderLineChart
                width={300}
                height={250}
                data={PointStorage.pointsGraphS}
                legend
              />
            </Grid>
            <Grid item>
              <RenderLineChart
                width={300}
                height={250}
                data={PointStorage.pointsGraphMountain}
              />
            </Grid>
            <Grid item>
              <RenderLineChart
                width={300}
                height={250}
                data={PointStorage.pointsGraphTriangle}
              />
            </Grid>
            <Grid item>
              <RenderLineChart
                width={300}
                height={250}
                data={PointStorage.pointsGraphBackS}
              />
            </Grid>
          </Stack>
        </Grid>
        <Grid item>
          <Stack spacing={1} direction={"row"}>
            <Grid item>
              <RenderLineChart
                width={300}
                height={250}
                data={PointStorage.pointsGraphTrapeze}
              />
            </Grid>
            <Grid item>
              <RenderLineChart
                width={300}
                height={250}
                data={PointStorage.pointsGraphGaussian}
              />
            </Grid>
            <Grid item>
              <RenderLineChart
                width={300}
                height={250}
                data={PointStorage.pointsGraphSigmoid}
              />
            </Grid>
            <Grid item>
              <RenderLineChart
                width={300}
                height={250}
                data={PointStorage.pointsGraphRoughMountain}
              />
            </Grid>
          </Stack>
        </Grid>
        <Grid item>
          {/* <Slider
                aria-label="Volume"
                value={A ?? 0}
                onChange={(e, v) => {
                  if (v !== A) setA(v as number);
                }}
              /> */}
        </Grid>
      </Stack>
    </>
  );
};
