/* eslint-disable react-hooks/exhaustive-deps */
import { Slider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { throttle } from "lodash";
import { setCommentRange } from "typescript";
interface IInputParams {
  alpha?: number;
  setAlpha: (alpha: number | undefined) => void;
  A?: number | typeof NaN;
  setA: (A: number | undefined) => void;
  B?: number;
  setB: (B: number | undefined) => void;
  C?: number;
  setC: (C: number | undefined) => void;
  D?: number;
  setD: (D: number | undefined) => void;
}

export const InputParams: React.FC<IInputParams> = ({
  alpha,
  setAlpha,
  A,
  setA,
  B,
  setB,
  C,
  setC,
  D,
  setD,
}) => {
  const [alphaShow, setAlphaShow] = React.useState<string>("");
  const [AShow, setAShow] = React.useState<string>("");
  const [BShow, setBShow] = React.useState<string>("");
  const [CShow, setCShow] = React.useState<string>("");
  const [DShow, setDShow] = React.useState<string>("");

  // useEffect(() => {
  //   if (A) {
  //     if (`${A}` !== AShow) setAShow(`${A ?? ""}`);
  //   }
  // }, [A]);

  // const trottleAlpha = throttle(() => {
  //   const parseAlpha = validParse(alphaShow);
  //   if (parseAlpha) setAlpha(parseAlpha);
  //   // send the server request here
  // }, 100);

  const trottleA = throttle(() => {
    const parseA = validParse(AShow);
    if (parseA) setA(parseA);
  }, 16);

  const trottleB = throttle(() => {
    const parseB = validParse(BShow);
    if (parseB) setB(parseB);
  }, 16);

  const trottleC = throttle(() => {
    const parseC = validParse(CShow);
    if (parseC) setC(parseC);
  }, 16);

  const trottleD = throttle(() => {
    const parseD = validParse(DShow);
    if (parseD) setD(parseD);
  }, 16);

  // useEffect(() => {
  //   if (alphaShow) {
  //     const parseAlpha = parseInt(alphaShow);
  //     if (typeof parseAlpha === "number" && Number.isNaN(parseAlpha) === false)
  //       debounceSetAlphaShow();
  //       //debounce(setAlpha, 500)(parseAlpha);
  //   }
  // }, [alphaShow, setAlpha]);
  // useEffect(() => {
  //   if (AShow) {
  //     const parseA = parseInt(AShow);
  //     if (
  //       typeof parseA === "number" &&
  //       Number.isNaN(parseA) === false &&
  //       parseA !== A
  //     )
  //       setA(parseA);
  //   }
  // }, [AShow, setA]);
  // useEffect(() => {
  //   if (BShow) {
  //     const parseB = parseInt(BShow);
  //     if (typeof parseB === "number" && Number.isNaN(parseB) === false)
  //       setB(parseB);
  //   }
  // }, [BShow, setB]);
  // useEffect(() => {
  //   if (CShow) {
  //     const parseC = parseInt(CShow);
  //     if (typeof parseC === "number" && Number.isNaN(parseC) === false)
  //       setC(parseC);
  //   }
  // }, [CShow, setC]);

  // useEffect(() => {
  //   if (DShow) {
  //     const parseD = parseInt(DShow);
  //     if (typeof parseD === "number" && Number.isNaN(parseD) === false)
  //       setD(parseD);
  //   }
  // }, [DShow, setD]);

  const inputRefAlpha = React.useRef<any>();
  const inputRefA = React.useRef<any>();
  const inputRefB = React.useRef<any>();
  const inputRefC = React.useRef<any>();
  const inputRefD = React.useRef<any>();
  // React.useEffect(() => {
  //   const eventListener = document.addEventListener("keypress", (e) => {
  //     if (e.key === "Enter") {
  //     }
  //   });

  //   // return () => {
  //   //   document.removeEventListener(eventListener);
  //   // };
  // }, []);
  const validParse = (value: any): number | undefined => {
    const parseValue = parseFloat(value);
    if (typeof parseValue === "number" && Number.isNaN(parseValue) === false)
      return parseValue;
  };
  return (
    <Stack direction={"column"} spacing={2}>
      <Grid item>
        <TextField
          autoComplete="off"
          autoFocus
          inputRef={inputRefAlpha}
          id="inputAlpha"
          label="Enter the number of alpha levels "
          variant="standard"
          style={{ minWidth: "150px" }}
          value={alphaShow}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAlphaShow(event.target.value);
            const parseAlpha = validParse(event.target.value);
            if (parseAlpha) setAlpha(parseAlpha);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              inputRefA?.current?.focus();
            }
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          autoComplete="off"
          inputRef={inputRefA}
          id="inputA"
          label="Input A"
          variant="standard"
          value={AShow}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            // if (AShow !== event.target.value && `${A}` !== event.target.value)
            setAShow(event.target.value);

            const parseA = validParse(event.target.value);
            if (parseA) setA(parseA);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              inputRefAlpha?.current?.focus();
            }
            if (e.key === "ArrowDown") {
              inputRefB?.current?.focus();
            }
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          autoComplete="off"
          inputRef={inputRefB}
          id="inputB"
          label="Input B"
          variant="standard"
          value={BShow}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (!event.target.value) {
              setCShow("");
              setC(undefined);
            }
            setBShow(event.target.value);
            const parseB = validParse(event.target.value);
            if (parseB) setB(parseB);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") {
              inputRefA?.current?.focus();
            }
            if (e.key === "ArrowDown" && B) {
              inputRefC?.current?.focus();
            }
          }}
        />
      </Grid>
      {BShow ? (
        <Grid item>
          <TextField
            autoComplete="off"
            inputRef={inputRefC}
            id="inputC"
            label="Input C"
            variant="standard"
            value={CShow}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCShow(event.target.value);
              const parseC = validParse(event.target.value);
              if (parseC) setC(parseC);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                inputRefB?.current?.focus();
              }
              if (e.key === "ArrowDown" && C) {
                inputRefD?.current?.focus();
              }
            }}
          />
        </Grid>
      ) : null}
      {CShow ? (
        <Grid item>
          <TextField
            autoComplete="off"
            inputRef={inputRefD}
            id="inputD"
            label="Input D"
            variant="standard"
            value={DShow}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDShow(event.target.value);
              const parseD = validParse(event.target.value);
              if (parseD) setD(parseD);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                inputRefC?.current?.focus();
              }
            }}
          />
        </Grid>
      ) : null}
      <Grid item>
        <Stack direction={"row"} height={200}>
          {AShow ? (
            <Grid item>
              <Slider
                //getAriaLabel={() => "Temperature"}
                orientation="vertical"
                //defaultValue={AShow}
                valueLabelDisplay="auto"
                value={parseInt(AShow) ?? 0}
                onChange={(e, v) => {
                  setAShow(`${v}`);
                  trottleA();
                }}
              />
            </Grid>
          ) : null}
          {BShow ? (
            <Grid item>
              <Slider
                //getAriaLabel={() => "Temperature"}
                orientation="vertical"
                //defaultValue={AShow}
                valueLabelDisplay="auto"
                value={Number.parseInt(BShow)}
                onChange={(e, v) => {
                  setBShow(`${v}`);
                  trottleB();
                }}
              />
            </Grid>
          ) : null}
          {BShow && CShow ? (
            <Grid item>
              <Slider
                //getAriaLabel={() => "Temperature"}
                orientation="vertical"
                //defaultValue={AShow}
                valueLabelDisplay="auto"
                value={Number.parseInt(CShow)}
                onChange={(e, v) => {
                  setCShow(`${v}`);
                  trottleC();
                }}
              />
            </Grid>
          ) : null}
          {CShow && DShow ? (
            <Grid item>
              <Slider
                //getAriaLabel={() => "Temperature"}
                orientation="vertical"
                //defaultValue={AShow}
                valueLabelDisplay="auto"
                value={Number.parseInt(DShow)}
                onChange={(e, v) => {
                  setDShow(`${v}`);
                  trottleD();
                }}
              />
            </Grid>
          ) : null}
        </Stack>
      </Grid>
    </Stack>
  );
};
