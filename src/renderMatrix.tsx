import Grid from "@mui/material/Grid";
import { Stack } from "@mui/system";
import React from "react";

interface IRenderMatrix {
  matrix: Array<Array<number>>;
  label: string;
  secondLabel?: string;
}
//что такое отношение сходства три класса  
/*
  TODO отношение подобия и связанные с ним отношения различия, сходства и их свойства

  TODO  Эти отношения интересны для нас тем, что они имеют интересные приложения в задачах обработки информации, демонстрирующие новые     возможности такой обработки, предоставляемые введением и учетом нечеткости.
  TODO Нечетким отношением подобия называется транзитивное рефлексивное симметричное нечеткое бинарное отношение.
*/
export const RenderMatrix: React.FC<IRenderMatrix> = ({
  matrix,
  label,
  secondLabel,
}) => {
  return (
    <Stack direction={"row"}>
      <Grid item xs={1}>
        <Stack direction={"column"}>
          <Grid item xs={1}>
            {label}
          </Grid>
          <Grid item xs={11} />
        </Stack>
      </Grid>
      <Grid item xs={11}>
        <Stack direction={"column"}>
          <Grid item xs={1}>
            {secondLabel ? (
              <div style={{ margin: "3px" }}>{secondLabel}</div>
            ) : (
              <div style={{ opacity: "0" }}>{label}</div>
            )}
          </Grid>
          <Grid item xs={11}>
            <Stack direction={"column"}>
              {matrix.map((i) => {
                const stack = (
                  <Stack direction={"row"} key={`${i}`}>
                    {i.map((j) => {
                      return (
                        <Grid item key={j}>
                          <div
                            style={{
                              width: 30,
                              height: 30,
                              textAlign: "center",
                              alignContent: "center",
                              border: "1px solid gray",
                            }}
                          >{` ${j.toFixed(1)} `}</div>
                        </Grid>
                      );
                    })}
                  </Stack>
                );
                return <Grid item>{stack}</Grid>;
              })}
            </Stack>
          </Grid>
        </Stack>
      </Grid>
    </Stack>
  );
};
