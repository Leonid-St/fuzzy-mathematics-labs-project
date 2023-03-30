/* eslint-disable no-eval */
import React from "react";
import {Stack } from "@mui/system";
import { RenderLineChart} from "./RenderLineChart"
import { App } from "./App";
import { Grid } from "@mui/material";
import { PointService,IPoint } from "./PointService";
import { FuzzyOperaion } from "./FuzzyOperaion";
import {
  SelectedGrapth
} from "./fuzzy/ProtocolFuzy";



import { FuzzyStruct } from "./fuzzy/FuzzuClass";
import { FuzzyOperationList, ToggleTabsFuzzyOperation } from "./toggleTabsFuzzyOperation";


export type  FuzzyOperationState = FuzzyOperationList.sum | FuzzyOperationList.subtracion | FuzzyOperationList.multiplication | FuzzyOperationList.division ;


export const MainWindow: React.FC<any> = () => { 

    const pointService1 = React.useMemo(() => new PointService(), []);
     const pointService2 = React.useMemo(() => new PointService(), []);
 const [selectedGraph1, setSelectedGraph1] = React.useState<
    SelectedGrapth | undefined
        >(undefined);
     const [selectedGraph2, setSelectedGraph2] = React.useState<
    SelectedGrapth | undefined
        >(undefined);
    
    const [operation, setOperation ] = React.useState<FuzzyOperationState>(FuzzyOperationList.sum)

    const [resultFuzzyOperation, setResultFuzzyOperation] = React.useState<Array<IPoint>|undefined>(undefined);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fuzzyOperaion = React.useMemo<FuzzyOperaion>(() => {
            return new FuzzyOperaion();
        }, [])

    const calculate = React.useCallback(() => {
        let array: Array<IPoint> = [];
        console.log(`eval(pointService1.alphaLevelsStructGraph${selectedGraph1}.length')`)
         ///  console.log(eval(`pointService1.alphaLevelsStructGraph${selectedGraph1}.length`))
        if (selectedGraph1 && selectedGraph2) {
            for (let i = 0; i < eval(`pointService1.alphaLevelsStructGraph${selectedGraph1}.length`); i++){
                const result: FuzzyStruct = eval(`fuzzyOperaion.${operation}(${eval(`pointService1.alphaLevelsStructGraph${selectedGraph1}[i]`)},${eval(`pointService1.alphaLevelsStructGraph${selectedGraph2}[i]`)})`);
                console.log('result');
                console.log(result);
                if(result?.left)
                array.push({
                    x: result.left, 
                    y:result.alphaLevel
                })
                 if(result?.right)
                array.push({
                    x: result.right ,
                    y:result.alphaLevel
                })
            }
            setResultFuzzyOperation(array)
            console.log('array',array)
        }
    }, [operation, selectedGraph1, selectedGraph2])
    



    return (
        <Stack direction='column'>
            <Grid item>
   <ToggleTabsFuzzyOperation
                    alignment={operation
                    }
                    setAlignment={(e) => { setOperation(e); calculate() }}
          />
            </Grid>
            <Grid item>
                    <Stack direction="row">
        
        <Grid item xs ={4}>
            <App showTable={false}
                pointService={pointService1}
                selectedGraph={selectedGraph1}
                 setSelectedGraph={setSelectedGraph1}
            /> 
        </Grid>
        <Grid item xs ={4} >
            <App showTable={false} pointService={pointService2}
                selectedGraph={selectedGraph2}
                setSelectedGraph={setSelectedGraph2}
            /> 
        </Grid>
                    <Grid item xs={4}>
                        {resultFuzzyOperation? (   <RenderLineChart
            width={600}
            height={600}
           additionalPoints={resultFuzzyOperation}
          />) : null}
       
        </Grid>
    </Stack>
            </Grid>
        </Stack>
    
    )
}