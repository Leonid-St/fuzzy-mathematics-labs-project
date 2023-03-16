export enum GraphByNumber {
    S = 1,
    Mountain = 2,
    Triangle = 3,
    BackS = 4,
    Trapeze = 5,
    Gaussian = 6,
    Sigmoid = 7,
    RoughMountain = 8,
}

export enum GraphName {
    S = "S",
    Mountain = "Mountain",
    Triangle = "Triangle",
    BackS = "BackS",
    Trapeze = "Trapeze",
    Gaussian = "Gaussian",
    Sigmoid = "Sigmoid",
    RoughMountain = "RoughMountain"
}

export type SelectedGrapth =
    | GraphName.S
    | GraphName.Mountain
    | GraphName.Triangle
    | GraphName.BackS
    | GraphName.Trapeze
    | GraphName.Gaussian
    | GraphName.Sigmoid
    | GraphName.RoughMountain;

export enum GraphsParam {
    A = "A",
    B = "B",
    C = "C",
    D = "D"
}
export type GraphAB = GraphsParam.A;

export type GraphABC = GraphsParam.A & GraphsParam.B & GraphsParam;

export type GraphABCD = GraphsParam.A & GraphsParam.B & GraphsParam.C & GraphsParam.D;

export type GraphS = GraphByNumber.S & GraphAB;

export type GraphMountain = GraphByNumber.Mountain & GraphABC;

export type GraphTriangle = GraphByNumber.Triangle & GraphABC;

export type GraphBackS = GraphByNumber.BackS & GraphABC;

export type GraphTrapeze = GraphByNumber.Trapeze & GraphABCD;

export type GraphGaussian = GraphByNumber.Gaussian & GraphAB;

export type GraphSigmoid = GraphByNumber.Sigmoid & GraphAB;

export type GraphRoughMountain = GraphByNumber.RoughMountain & GraphAB;