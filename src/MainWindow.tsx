/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-eval */
import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { App } from "./App";
import {
  FuzzyOperaion,
  FuzzyOperationList,
  FuzzyOperationState
} from "./fuzzy/FuzzyOperaion";
import { SelectedGrapth } from "./fuzzy/ProtocolFuzy";
import { IPoint, PointService } from "./PointService";
import { RenderLineChart } from "./RenderLineChart";

import { TextareaAutosize } from "@mui/base";
import { FuzzyStruct } from "./fuzzy/FuzzuClass";
import { MatrixService } from "./fuzzy/MatrixService";
import { RenderMatrix } from "./renderMatrix";
import { ToggleTabsFuzzyOperation } from "./toggleTabsFuzzyOperation";
import {
  ApplicationModeList,
  ApplicationModeState,
  ToggleTabsGrapthMatrix
} from "./toggleTabsGrapthMatrix";

export const MainWindow: React.FC<any> = () => {
  const pointService1 = React.useMemo(() => new PointService(), []);
  const pointService2 = React.useMemo(() => new PointService(), []);

  const [selectedApplicationMode, setSelectedApplicationMode] =
    React.useState<ApplicationModeState>(ApplicationModeList.Graphs);

  const [selectedGraph1, setSelectedGraph1] = React.useState<
    SelectedGrapth | undefined
  >(undefined);
  const [selectedGraph2, setSelectedGraph2] = React.useState<
    SelectedGrapth | undefined
  >(undefined);

  const [inputText1, setInputText1] = React.useState<string | undefined>(
    undefined
  );
  const [inputText2, setInputText2] = React.useState<string | undefined>(
    undefined
  );
  const [inputTextResult, setInputTextResult] = React.useState<
    string | undefined
  >(undefined);

  const [
    resultMatrix__create_matrix_from_lines,
    setResultMatrix__create_matrix_from_lines,
  ] = React.useState<Array<Array<number>>>([]);
  const [
    resultMatrix__calculate_max_min_composition,
    setResultMatrix__calculate_max_min_composition,
  ] = React.useState<Array<Array<number>>>([]);

  const [arrayMax_min_composition, setArrayMax_min_composition] =
    React.useState<Array<{ label: string; max_min_composition: Array<any> }>>(
      []
    );

  const [transitive_closure, setTransitive_closure] = React.useState<
    Array<Array<any>>
  >([]);

  const [percentage_of_similarity, setPercentage_of_similarity] =
    React.useState<number>();

  const matrixService: MatrixService = React.useMemo(() => {
    return new MatrixService();
  }, []);

  const calculateMatrixc = (str1?: string, str2?: string) => {
    let text = "";
    if (str1 && str1?.length !== 0 && str2 && str2?.length !== 0) {
      const matrix_from_lines = matrixService._create_matrix_from_lines(
        str1,
        str2
      );

      setResultMatrix__create_matrix_from_lines(matrix_from_lines);
      let max_min_composition = matrixService._calculate_max_min_composition(
        matrix_from_lines,
        matrix_from_lines
      );
      setResultMatrix__calculate_max_min_composition(max_min_composition);

      let n = Math.min(str1.length, str2.length);

      let transitive_closure: [][] =
        matrixService._calculate_transitive_closure(
          matrix_from_lines,
          max_min_composition
        );

      for (let i = 2; i < n; i++) {
        max_min_composition = matrixService._calculate_max_min_composition(
          max_min_composition,
          matrix_from_lines
        );
        arrayMax_min_composition.push({
          label: `R^${i + 1}:`,
          max_min_composition: max_min_composition,
        });
        transitive_closure = matrixService._calculate_transitive_closure(
          transitive_closure,
          max_min_composition
        );
      }
      // console.log('Транзитивное замыкание:')
      setTransitive_closure(transitive_closure);
      let percentage_of_similarity = transitive_closure[n - 1][n - 1] * 100;
      // console.log(`Строка ${line1} совпадает со строкой ${line2} на ${percentage_of_similarity}%`)
      setPercentage_of_similarity(percentage_of_similarity);
    }
  };

  const [operation, setOperation] = React.useState<FuzzyOperationState>(
    FuzzyOperationList.sum
  );

  const [resultFuzzyOperation, setResultFuzzyOperation] = React.useState<
    Array<IPoint> | undefined
  >(undefined);

  const fuzzyOperaion = React.useMemo<FuzzyOperaion>(() => {
    return new FuzzyOperaion();
  }, []);

  const calculate = React.useCallback(
    (operation: string) => {
      let array: Array<IPoint> = [];
      console.log(
        `eval(pointService1.alphaLevelsStructGraph${selectedGraph1}.length')`
      );
      ///  console.log(eval(`pointService1.alphaLevelsStructGraph${selectedGraph1}.length`))
      if (selectedGraph1 && selectedGraph2) {
        for (
          let i = 0;
          i <
          eval(`pointService1.alphaLevelsStructGraph${selectedGraph1}.length`);
          i++
        ) {
          const a = eval(
            `pointService1.alphaLevelsStructGraph${selectedGraph1}[i]`
          );
          const b = eval(
            `pointService1.alphaLevelsStructGraph${selectedGraph2}[i]`
          );
          const result: FuzzyStruct = eval(`fuzzyOperaion.${operation}(a,b)`);
          if (result?.left)
            array.push({
              x: result?.left,
              y: result.alphaLevel,
            });
          if (result?.right)
            array.push({
              x: result.right,
              y: result.alphaLevel,
            });
        }
        setResultFuzzyOperation(array);
        console.log("array", array);
      }
    },
    [selectedGraph1, selectedGraph2]
  );

  return (
    <Stack
      spacing={3}
      direction="column"
      textAlign={"center"}
      style={{
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Grid item>
        <ToggleTabsGrapthMatrix
          alignment={selectedApplicationMode}
          setAlignment={setSelectedApplicationMode}
        />
      </Grid>

      {selectedApplicationMode === ApplicationModeList.Graphs ? (
        <Grid item>
          <Stack direction={"column"}>
            <Grid item xs={1}>
              <ToggleTabsFuzzyOperation
                alignment={operation}
                setAlignment={(e) => {
                  setOperation(e);
                  calculate(e);
                }}
              />
            </Grid>
            <Grid item xs={11}>
              <Stack direction="row">
                <Grid item xs={4}>
                  <App
                    showTable={false}
                    pointService={pointService1}
                    selectedGraph={selectedGraph1}
                    setSelectedGraph={setSelectedGraph1}
                  />
                </Grid>
                <Grid item xs={4}>
                  <App
                    showTable={false}
                    pointService={pointService2}
                    selectedGraph={selectedGraph2}
                    setSelectedGraph={setSelectedGraph2}
                  />
                </Grid>
                <Grid item xs={4}>
                  {resultFuzzyOperation ? (
                    <RenderLineChart
                      width={600}
                      height={600}
                      additionalPoints={resultFuzzyOperation}
                    />
                  ) : null}
                </Grid>
              </Stack>
            </Grid>
          </Stack>
        </Grid>
      ) : (
        <Grid item textAlign={"center"}>
          <Stack direction={"row"}>
            <Grid item>
              <Stack direction={"column"} spacing={10}>
                <Grid item>
                  <Stack
                    spacing={10}
                    alignContent={"center"}
                    textAlign={"center"}
                    direction={"row"}
                  >
                    <Grid item xs={6}>
                      <TextareaAutosize
                        id="text1"
                        value={inputText1}
                        onChange={(e) => {
                          calculateMatrixc(e.target.value, inputText2);
                          setInputText1(e.target.value);
                        }}
                        style={{
                          width: "300px",
                          height: "200px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextareaAutosize
                        id="text2"
                        value={inputText2}
                        onChange={(e) => {
                          calculateMatrixc(inputText1, e.target.value);
                          setInputText2(e.target.value);
                        }}
                        style={{
                          width: "300px",
                          height: "200px",
                        }}
                      />
                    </Grid>
                  </Stack>
                </Grid>

                <Grid item>
                  {/* <TextareaAutosize id="textResult"  
                                          value={inputTextResult}
                                          disabled
                          style={{
                              width: '500px',
                              height:'200px'
                    
                          }} /> */}
                  {/* <Stack direction={}>
                                          
                                      </Stack> */}
                  <Grid
                    container
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                    }}
                  >
                    <Grid item>
                      <RenderMatrix
                        label={`R^1:`}
                        secondLabel={"_create_matrix_from_lines"}
                        matrix={resultMatrix__create_matrix_from_lines}
                      />
                    </Grid>
                    <Grid item>
                      <RenderMatrix
                        label={`R^2:`}
                        secondLabel={"_calculate_max_min_composition"}
                        matrix={resultMatrix__calculate_max_min_composition}
                      />
                    </Grid>
                    {arrayMax_min_composition.map((t, index) => {
                      return (
                        <Grid item>
                          <RenderMatrix
                            label={`R^${index + 3}:`}
                            //secondLabel={`${arrayMax_min_composition[index].label}`}
                            matrix={
                              arrayMax_min_composition[index]
                                .max_min_composition
                            }
                          />{" "}
                        </Grid>
                      );
                    })}

                    <Grid item>
                      <RenderMatrix
                        label={`R:`}
                        secondLabel={"transitive_closure"}
                        matrix={transitive_closure}
                      />
                    </Grid>
                    <Grid item>
                      <h3>
                        percentage_of_similarity: {percentage_of_similarity}%
                      </h3>
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            <Grid item></Grid>
          </Stack>
        </Grid>
      )}
    </Stack>
  );
};
