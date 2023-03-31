import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import React from "react";
import "./App.css";
import { IPointService } from "./PointService";
import { RenderLineChart } from "./RenderLineChart";
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
