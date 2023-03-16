import { throws } from 'assert';
import { Fuzzy, FuzzyClass } from './fuzzy/FuzzuClass';

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
}