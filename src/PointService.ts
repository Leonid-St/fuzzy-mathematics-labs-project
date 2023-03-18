import { throws } from 'assert';
import { Fuzzy, FuzzyClass, FuzzyStruct } from './fuzzy/FuzzuClass';



export interface IPoint {
    x: number;
    y: number;
}



export interface IPointService {
    pointsGraphS: Array<IPoint>;
    pointsGraphMountain: Array<IPoint>;
    pointsGraphTriangle: Array<IPoint>;
    pointsGraphBackS: Array<IPoint>;
    pointsGraphTrapeze: Array<IPoint>;
    pointsGraphGaussian: Array<IPoint>;
    pointsGraphSigmoid: Array<IPoint>;
    pointsGraphRoughMountain: Array<IPoint>;



    calculatePointsGraphS: (A: number, B: number) => void;
    calculatePointsMountain: (A: number, B: number, C: number) => void;
    calculatePointsTriangle: (A: number, B: number, C: number) => void;
    calculatePointsBackS: (A: number, B: number, C: number) => void;
    calculatePointsTrapeze: (A: number, B: number, C: number, D: number) => void;
    calculatePointsGaussian: (A: number, B: number) => void;
    calculatePointsSigmoid: (A: number, B: number) => void;
    calculatePointsRoughMountain: (A: number, B: number) => void;


    //
    alphaLevelsStructGraphS: FuzzyStruct[];
    alphaLevelsStructMountin: FuzzyStruct[];
    alphaLevelsStructTriangle: FuzzyStruct[];
    alphaLevelsStructGraphBackS: FuzzyStruct[];
    alphaLevelsStructGraphTrapeze: FuzzyStruct[];
    alphaLevelsStructGraphGaussian: FuzzyStruct[];
    alphaLevelsStructGraphSigmoid: FuzzyStruct[];
    alphaLevelsStructGraphRoughMountain: FuzzyStruct[];

    //
    calculateAlphaLevelsGraphS: (countAlphaLevels: number, A: number, B: number) => void;
    calculateAlphaLevelsMountain: (countAlphaLevels: number, A: number, B: number, C: number) => void;
    calculateAlphaLevelsTriangle: (countAlphaLevels: number, A: number, B: number, C: number) => void;
    calculateAlphaLevelsBackS: (countAlphaLevels: number, A: number, B: number, C: number) => void;
    calculateAlphaLevelsTrapeze: (countAlphaLevels: number, A: number, B: number, C: number, D: number) => void;
    calculateAlphaLevelsGaussian: (countAlphaLevels: number, A: number, B: number) => void;
    calculateAlphaLevelsSigmoid: (countAlphaLevels: number, A: number, B: number) => void;
    calculateAlphaLevelsRoughMountain: (countAlphaLevels: number, A: number, B: number) => void;
    //
    alphaLevelsPointsGraphS: IPoint[];
    alphaLevelsPointsGraphMountain: IPoint[];
    alphaLevelsPointsGraphTriangle: IPoint[];
    alphaLevelsPointsGraphBackS: IPoint[];
    alphaLevelsPointsGraphTrapeze: IPoint[];
    alphaLevelsPointsGraphGaussian: IPoint[];
    alphaLevelsPointsGraphSigmoid: IPoint[];
    alphaLevelsPointsGraphRoughMountain: IPoint[];
    //
    calculateAlphaLevelsPointsGraphS: (A: number, B: number) => void;
    calculateAlphaLevelsPointsMountain: (A: number, B: number, C: number) => void;
    calculateAlphaLevelsPointsTriangle: (A: number, B: number, C: number) => void;
    calculateAlphaLevelsPointsBackS: (A: number, B: number, C: number) => void;
    calculateAlphaLevelsPointsTrapeze: (A: number, B: number, C: number, D: number) => void;
    calculateAlphaLevelsPointsGaussian: (A: number, B: number) => void;
    calculateAlphaLevelsPointsSigmoid: (A: number, B: number) => void;
    calculateAlphaLevelsPointsRoughMountain: (A: number, B: number) => void;

}

export class PointService implements IPointService {

    private fuzzyClass = new Fuzzy();
    public countPoints = 50;
    public pointsGraphS: IPoint[] = [];
    public pointsGraphMountain: IPoint[] = [];
    public pointsGraphTriangle: IPoint[] = [];
    public pointsGraphBackS: IPoint[] = [];
    public pointsGraphTrapeze: IPoint[] = [];
    public pointsGraphGaussian: IPoint[] = [];
    public pointsGraphSigmoid: IPoint[] = [];
    public pointsGraphRoughMountain: IPoint[] = [];
    //alphalevels
    public alphaLevelsPointsGraphS: IPoint[] = [];
    public alphaLevelsPointsGraphMountain: IPoint[] = [];
    public alphaLevelsPointsGraphTriangle: IPoint[] = [];
    public alphaLevelsPointsGraphBackS: IPoint[] = [];
    public alphaLevelsPointsGraphTrapeze: IPoint[] = [];
    public alphaLevelsPointsGraphGaussian: IPoint[] = [];
    public alphaLevelsPointsGraphSigmoid: IPoint[] = [];
    public alphaLevelsPointsGraphRoughMountain: IPoint[] = [];
    //
    alphaLevelsStructGraphS: FuzzyStruct[] = [];
    alphaLevelsStructMountin: FuzzyStruct[] = [];
    alphaLevelsStructTriangle: FuzzyStruct[] = [];
    alphaLevelsStructGraphBackS: FuzzyStruct[] = [];
    alphaLevelsStructGraphTrapeze: FuzzyStruct[] = [];
    alphaLevelsStructGraphGaussian: FuzzyStruct[] = [];
    alphaLevelsStructGraphSigmoid: FuzzyStruct[] = [];
    alphaLevelsStructGraphRoughMountain: FuzzyStruct[] = [];
    // private calc(
    //     arrayTo: Array<IPoint>,
    //     callHowCalculate: (X: number, A: number, B: number, C?: number, D?: number) => number,
    //     A: number,
    //     B: number,
    //     C?: number,
    //     D?: number
    // ) {
    //     const array: Array<IPoint> = [];
    //     for (let i = 0; i < this.countPoints; i++) {
    //         array.push({
    //             x: i,
    //             y: callHowCalculate(i, A, B, C, D)
    //         });
    //     }
    //     arrayTo = array;
    // }

    calculatePointsGraphS(A: number, B: number) {
        //this.calc(this.pointsGraphS, this.fuzzyClass.findYGraphS, A, B)
        const pointsGraphS: Array<IPoint> = [];
        for (let i = 0; i < this.countPoints; i++) {
            pointsGraphS.push({
                x: i,
                y: this.fuzzyClass.findYGraphS(i, A, B)
            });
        }
        this.pointsGraphS = pointsGraphS
    }
    calculatePointsMountain(A: number, B: number, C: number) {
        //this.calc(this.pointsGraphMountain, this.fuzzyClass.findYGraphMountain, A, B, C)
        const pointsGraphMountain: Array<IPoint> = [];
        for (let i = 0; i < this.countPoints; i++) {
            pointsGraphMountain.push({
                x: i,
                y: this.fuzzyClass.findYGraphMountain(i, A, B, C)
            });
        }
        this.pointsGraphMountain = pointsGraphMountain
    };
    calculatePointsTriangle(A: number, B: number, C: number) {
        //  this.calc(this.pointsGraphTriangle, this.fuzzyClass.findYGraphS, A, B, C)
        const pointsGraphTriangle: Array<IPoint> = [];
        for (let i = 0; i < this.countPoints; i++) {
            pointsGraphTriangle.push({
                x: i,
                y: this.fuzzyClass.findYGraphTriangle(i, A, B, C)
            });
        }
        this.pointsGraphTriangle = pointsGraphTriangle;
    };
    calculatePointsBackS(A: number, B: number, C: number) {
        const pointsGraphBackS: Array<IPoint> = [];
        for (let i = 0; i < this.countPoints; i++) {
            pointsGraphBackS.push({
                x: i,
                y: this.fuzzyClass.findYGraphBackS(i, A, B, C)
            });
        }
        this.pointsGraphBackS = pointsGraphBackS;
    };
    calculatePointsTrapeze(A: number, B: number, C: number, D: number) {
        const pointsGraphTrapeze: Array<IPoint> = [];
        for (let i = 0; i < this.countPoints; i++) {
            pointsGraphTrapeze.push({
                x: i,
                y: this.fuzzyClass.findYGraphTrapeze(i, A, B, C, D)
            });
        }
        this.pointsGraphTrapeze = pointsGraphTrapeze
    };
    calculatePointsGaussian(A: number, B: number) {
        const pointsGraphGaussian: Array<IPoint> = [];
        for (let i = 0; i < this.countPoints; i++) {
            pointsGraphGaussian.push({
                x: i,
                y: this.fuzzyClass.findYGraphGaussian(i, A, B)
            });
        };
        this.pointsGraphGaussian = pointsGraphGaussian;
    }
    calculatePointsSigmoid(A: number, B: number) {

        const pointsGraphSigmoid: Array<IPoint> = [];
        for (let i = 0; i < this.countPoints; i++) {
            pointsGraphSigmoid.push({
                x: i,
                y: this.fuzzyClass.findYGraphSigmoid(i, A, B)
            });
        }
        this.pointsGraphSigmoid = pointsGraphSigmoid
    };
    calculatePointsRoughMountain(A: number, B: number) {
        const pointsGraphRoughMountain: Array<IPoint> = [];
        for (let i = 0; i < this.countPoints; i++) {
            pointsGraphRoughMountain.push({
                x: i,
                y: this.fuzzyClass.findYGraphRoughMountain(i, A, B)
            });
        }
        this.pointsGraphRoughMountain = pointsGraphRoughMountain;
    }


    //alphalevels
    calculateAlphaLevelsGraphS(countAlphaLevels: number, A: number, B: number) {
        const step = 1 / countAlphaLevels;
        const alphaLevelsStructGraphS: FuzzyStruct[] = [];
        for (let i = 0; i < 1; i += step) {
            alphaLevelsStructGraphS.push(this.fuzzyClass.findXByAlphaLevelGraphS(i, A, B));
        }
        this.alphaLevelsStructGraphS = alphaLevelsStructGraphS;

    };
    calculateAlphaLevelsMountain(countAlphaLevels: number, A: number, B: number, C: number) {
        const step = 1 / countAlphaLevels;
        const alphaLevelsStructMountin: FuzzyStruct[] = [];
        for (let i = 0; i < 1; i += step) {
            alphaLevelsStructMountin.push(this.fuzzyClass.findXByAlphaLevelGraphMountain(i, A, B, C));
        }
        this.alphaLevelsStructMountin = alphaLevelsStructMountin;

    };
    calculateAlphaLevelsTriangle(countAlphaLevels: number, A: number, B: number, C: number) {
        const step = 1 / countAlphaLevels;
        const alphaLevelsStructTriangle: FuzzyStruct[] = [];
        for (let i = 0; i < 1; i += step) {
            alphaLevelsStructTriangle.push(this.fuzzyClass.findXByAlphaLevelGraphTriangle(i, A, B, C));
        }
        this.alphaLevelsStructTriangle = alphaLevelsStructTriangle;


    };
    calculateAlphaLevelsBackS(countAlphaLevels: number, A: number, B: number, C: number) {
        const step = 1 / countAlphaLevels;
        const alphaLevelsStructGraphBackS: FuzzyStruct[] = [];
        for (let i = 0; i < 1; i += step) {
            alphaLevelsStructGraphBackS.push(this.fuzzyClass.findXByAlphaLevelGraphBackS(i, A, B, C));
        }
        this.alphaLevelsStructGraphBackS = alphaLevelsStructGraphBackS;


    };
    calculateAlphaLevelsTrapeze(countAlphaLevels: number, A: number, B: number, C: number, D: number) {
        const step = 1 / countAlphaLevels;
        const alphaLevelsStructGraphTrapeze: FuzzyStruct[] = [];
        for (let i = 0; i < 1; i += step) {
            alphaLevelsStructGraphTrapeze.push(this.fuzzyClass.findXByAlphaLevelGraphTrapeze(i, A, B, C, D));
        }
        this.alphaLevelsStructGraphTrapeze = alphaLevelsStructGraphTrapeze;
    };
    calculateAlphaLevelsGaussian(countAlphaLevels: number, A: number, B: number) {
        const step = 1 / countAlphaLevels;
        const alphaLevelsStructGraphGaussian: FuzzyStruct[] = [];
        for (let i = 0; i < 1; i += step) {
            alphaLevelsStructGraphGaussian.push(this.fuzzyClass.findXByAlphaLevelGraphGaussian(i, A, B));
        }
        this.alphaLevelsStructGraphGaussian = alphaLevelsStructGraphGaussian;
    };
    calculateAlphaLevelsSigmoid(countAlphaLevels: number, A: number, B: number) {
        const step = 1 / countAlphaLevels;
        const alphaLevelsStructGraphSigmoid: FuzzyStruct[] = [];
        for (let i = 0; i < 1; i += step) {
            alphaLevelsStructGraphSigmoid.push(this.fuzzyClass.findXByAlphaLevelGraphSigmoid(i, A, B));
        }
        this.alphaLevelsStructGraphSigmoid = alphaLevelsStructGraphSigmoid;
    };
    calculateAlphaLevelsRoughMountain(countAlphaLevels: number, A: number, B: number) {
        const step = 1 / countAlphaLevels;
        const alphaLevelsStructGraphRoughMountain: FuzzyStruct[] = [];
        for (let i = 0; i < 1; i += step) {
            alphaLevelsStructGraphRoughMountain.push(this.fuzzyClass.findXByAlphaLevelGraphRoughMountain(i, A, B));
        }
        this.alphaLevelsStructGraphRoughMountain = alphaLevelsStructGraphRoughMountain;
    };


    //AlphaLevelsPoints
    calculateAlphaLevelsPointsGraphS(A: number, B: number) {
        const alphaLevelsPointsGraphS: Array<IPoint> = [];

        for (let i = 0; i < this.alphaLevelsStructGraphS.length; i += 1) {
            const point = this.alphaLevelsStructGraphS[i].left;
            if (point)
                alphaLevelsPointsGraphS.push({
                    x: point,
                    y: this.alphaLevelsStructGraphS[i].alphaLevel,
                });
        }

        for (let i = 0; i < this.alphaLevelsStructGraphS.length; i += 1) {
            const point = this.alphaLevelsStructGraphS[i].right;
            if (point)
                alphaLevelsPointsGraphS.push({
                    x: point,
                    y: this.alphaLevelsStructGraphS[i].alphaLevel,
                });
        }

        this.alphaLevelsPointsGraphS = alphaLevelsPointsGraphS;
    }


    calculateAlphaLevelsPointsMountain(A: number, B: number, C: number) {
        const alphaLevelsPointsGraphMountain: Array<IPoint> = [];



        for (let i = 0; i < this.alphaLevelsStructMountin.length; i += 1) {
            const point = this.alphaLevelsStructMountin[i].left;
            if (point)
                alphaLevelsPointsGraphMountain.push({
                    x: point,
                    y: this.alphaLevelsStructMountin[i].alphaLevel,
                });
        }

        for (let i = 0; i < this.alphaLevelsStructMountin.length; i += 1) {
            const point = this.alphaLevelsStructMountin[i].right;
            if (point)
                alphaLevelsPointsGraphMountain.push({
                    x: point,
                    y: this.alphaLevelsStructMountin[i].alphaLevel,
                });
        }

        this.alphaLevelsPointsGraphMountain = alphaLevelsPointsGraphMountain;
    }
    calculateAlphaLevelsPointsTriangle(A: number, B: number, C: number) {
        const alphaLevelsPointsGraphTriangle: Array<IPoint> = [];



        for (let i = 0; i < this.alphaLevelsStructTriangle.length; i += 1) {
            const point = this.alphaLevelsStructTriangle[i].left;
            if (point)
                alphaLevelsPointsGraphTriangle.push({
                    x: point,
                    y: this.alphaLevelsStructTriangle[i].alphaLevel,
                });
        }

        for (let i = 0; i < this.alphaLevelsStructTriangle.length; i += 1) {
            const point = this.alphaLevelsStructTriangle[i].right;
            if (point)
                alphaLevelsPointsGraphTriangle.push({
                    x: point,
                    y: this.alphaLevelsStructTriangle[i].alphaLevel,
                });
        }

        this.alphaLevelsPointsGraphTriangle = alphaLevelsPointsGraphTriangle;
    }
    calculateAlphaLevelsPointsBackS(A: number, B: number, C: number) {
        const alphaLevelsPointsGraphBackS: Array<IPoint> = [];



        for (let i = 0; i < this.alphaLevelsStructGraphBackS.length; i += 1) {
            const point = this.alphaLevelsStructGraphBackS[i].left;
            if (point)
                alphaLevelsPointsGraphBackS.push({
                    x: point,
                    y: this.alphaLevelsStructGraphBackS[i].alphaLevel,
                });
        }

        for (let i = 0; i < this.alphaLevelsStructGraphBackS.length; i += 1) {
            const point = this.alphaLevelsStructGraphBackS[i].right;
            if (point)
                alphaLevelsPointsGraphBackS.push({
                    x: point,
                    y: this.alphaLevelsStructGraphBackS[i].alphaLevel,
                });
        }

        this.alphaLevelsPointsGraphBackS = alphaLevelsPointsGraphBackS;
    }
    calculateAlphaLevelsPointsTrapeze(A: number, B: number, C: number, D: number) {
        const alphaLevelsPointsGraphTrapeze: Array<IPoint> = [];


        for (let i = 0; i < this.alphaLevelsStructGraphTrapeze.length; i += 1) {
            const point = this.alphaLevelsStructGraphTrapeze[i].left;
            if (point)
                alphaLevelsPointsGraphTrapeze.push({
                    x: point,
                    y: this.alphaLevelsStructGraphTrapeze[i].alphaLevel,
                });
        }

        for (let i = 0; i < this.alphaLevelsStructGraphTrapeze.length; i += 1) {
            const point = this.alphaLevelsStructGraphTrapeze[i].right;
            if (point)
                alphaLevelsPointsGraphTrapeze.push({
                    x: point,
                    y: this.alphaLevelsStructGraphTrapeze[i].alphaLevel,
                });
        }

        this.alphaLevelsPointsGraphTrapeze = alphaLevelsPointsGraphTrapeze;
    }
    calculateAlphaLevelsPointsGaussian(A: number, B: number) {
        const alphaLevelsPointsGraphGaussian: Array<IPoint> = [];



        for (let i = 0; i < this.alphaLevelsStructGraphGaussian.length; i += 1) {
            const point = this.alphaLevelsStructGraphGaussian[i].left;
            if (point)
                alphaLevelsPointsGraphGaussian.push({
                    x: point,
                    y: this.alphaLevelsStructGraphGaussian[i].alphaLevel,
                });
        }

        for (let i = 0; i < this.alphaLevelsStructGraphGaussian.length; i += 1) {
            const point = this.alphaLevelsStructGraphGaussian[i].right;
            if (point)
                alphaLevelsPointsGraphGaussian.push({
                    x: point,
                    y: this.alphaLevelsStructGraphGaussian[i].alphaLevel,
                });
        }

        this.alphaLevelsPointsGraphGaussian = alphaLevelsPointsGraphGaussian;
    }
    calculateAlphaLevelsPointsSigmoid(A: number, B: number) {

        const alphaLevelsPointsGraphSigmoid: Array<IPoint> = [];



        for (let i = 0; i < this.alphaLevelsStructGraphSigmoid.length; i += 1) {
            const point = this.alphaLevelsStructGraphSigmoid[i].left;
            if (point)
                alphaLevelsPointsGraphSigmoid.push({
                    x: point,
                    y: this.alphaLevelsStructGraphSigmoid[i].alphaLevel,
                });
        }

        for (let i = 0; i < this.alphaLevelsStructGraphSigmoid.length; i += 1) {
            const point = this.alphaLevelsStructGraphSigmoid[i].right;
            if (point)
                alphaLevelsPointsGraphSigmoid.push({
                    x: point,
                    y: this.alphaLevelsStructGraphSigmoid[i].alphaLevel,
                });
        }

        this.alphaLevelsPointsGraphSigmoid = alphaLevelsPointsGraphSigmoid;
    }
    calculateAlphaLevelsPointsRoughMountain(A: number, B: number) {
        const alphaLevelsPointsGraphRoughMountain: Array<IPoint> = [];



        for (let i = 0; i < this.alphaLevelsStructGraphRoughMountain.length; i += 1) {
            const point = this.alphaLevelsStructGraphRoughMountain[i].left;
            if (point)
                alphaLevelsPointsGraphRoughMountain.push({
                    x: point,
                    y: this.alphaLevelsStructGraphRoughMountain[i].alphaLevel,
                });
        }

        for (let i = 0; i < this.alphaLevelsStructGraphRoughMountain.length; i += 1) {
            const point = this.alphaLevelsStructGraphRoughMountain[i].right;
            if (point)
                alphaLevelsPointsGraphRoughMountain.push({
                    x: point,
                    y: this.alphaLevelsStructGraphRoughMountain[i].alphaLevel,
                });
        }

        this.alphaLevelsPointsGraphRoughMountain = alphaLevelsPointsGraphRoughMountain;
    }
}