
export interface FuzzyClass {

  findYGraphS: (x: number, a: number, b: number) => number;
  findYGraphMountain: (x: number, a: number, b: number, c: number) => number;
  findYGraphTriangle: (x: number, a: number, b: number, c: number) => number;
  findYGraphBackS: (x: number, a: number, b: number, c: number) => number;
  findYGraphTrapeze: (
    x: number,
    a: number,
    b: number,
    c: number,
    d: number
  ) => number;
  findYGraphGaussian: (x: number, a: number, b: number) => number;
  findYGraphSigmoid: (x: number, a: number, b: number) => number;
  findYGraphRoughMountain: (x: number, a: number, b: number) => number;

  findXByAlphaLevelGraphS: (
    alphaLevel: number,
    a: number,
    b: number
  ) => FuzzyStruct;
  findXByAlphaLevelGraphMountain: (
    alphaLevel: number,
    a: number,
    b: number,
    c: number
  ) => FuzzyStruct;
  findXByAlphaLevelGraphTriangle: (
    alphaLevel: number,
    a: number,
    b: number,
    c: number
  ) => FuzzyStruct;
  findXByAlphaLevelGraphBackS: (
    alphaLevel: number,
    a: number,
    b: number,
    c: number
  ) => FuzzyStruct;
  findXByAlphaLevelGraphTrapeze: (
    alphaLevel: number,
    a: number,
    b: number,
    c: number,
    d: number
  ) => FuzzyStruct;
  findXByAlphaLevelGraphGaussian: (
    alphaLevel: number,
    a: number,
    b: number
  ) => FuzzyStruct;
  findXByAlphaLevelGraphSigmoid: (
    alphaLevel: number,
    a: number,
    b: number
  ) => FuzzyStruct;
  findXByAlphaLevelGraphRoughMountain: (
    alphaLevel: number,
    a: number,
    b: number
  ) => FuzzyStruct;

}

export interface FuzzyStruct {
  alphaLevel: number;
  left: number | undefined;
  right: number | undefined;
}

export class Fuzzy implements FuzzyClass {


  private findYGraphSCashe: any = {};
  findYGraphS(x: number, a: number, b: number) {
    const key = `k${x}k${a}k${b}`;

    if (this.findYGraphSCashe[key]) {
      return this.findYGraphSCashe[key];
    }
    let F = 0;


    if (x < a) F = 0;
    if (x >= a && x < (a + b) / 2)
      F = (2 * Math.pow(x - a, 2)) / Math.pow(b - a, 2);
    if (x >= (a + b) / 2 && x < b)
      F = 1 - (2 * Math.pow(x - b, 2)) / Math.pow(b - a, 2);
    this.findYGraphSCashe[key] = F;
    return F;
  }
  private findYGraphMountainCashe: any = {};
  findYGraphMountain(x: number, a: number, b: number, c: number) {
    const key = `k${x}k${a}k${b}k${c}`;

    if (this.findYGraphMountainCashe[key]) {
      return this.findYGraphMountainCashe[key];
    }

    let F = 0;
    if (x <= a) F = 0;
    if (a <= x && x <= (a + b) / 2)
      F = (2 * Math.pow(x - a, 2)) / Math.pow(b - a, 2);
    if ((a + b) / 2 <= x && x <= b)
      F = 1 - (2 * Math.pow(x - b, 2)) / Math.pow(b - a, 2);
    if (b <= x && x <= c) F = 1;
    if (c <= x && x <= c + (b - a) / 2)
      F = 1 - (2 * Math.pow(x - c, 2)) / Math.pow(b - a, 2);
    if (c + (b - a) / 2 <= x && x <= c + (b - a))
      F = (2 * Math.pow(x - c + a - b, 2)) / Math.pow(b - a, 2);
    if (x >= c + b - a) F = 0;
    this.findYGraphMountainCashe[key] = F;
    return F;
  }
  private findYGraphTriangleCashe: any = {};
  findYGraphTriangle(x: number, a: number, b: number, c: number) {
    const key = `k${x}k${a}k${b}k${c}`;

    if (this.findYGraphTriangleCashe[key]) {
      return this.findYGraphTriangleCashe[key];
    }
    let F = 0;
    if (x <= a) F = 0;
    if (a <= x && x <= c) F = (x - a) / (c - a);
    if (c <= x && x <= b) F = (b - x) / (b - c);
    if (x >= b) F = 0;
    this.findYGraphTriangleCashe[key] = F;
    return F;
  }
  private findYGraphBackSCashe: any = {};
  findYGraphBackS(x: number, a: number, b: number, c: number) {
    const key = `k${x}k${a}k${b}k${c}`;

    if (this.findYGraphBackSCashe[key]) {
      return this.findYGraphBackSCashe[key];
    }
    let F = 0;
    if (x <= c) F = 1;
    if (x > c) F = 1 / (1 + a * Math.pow(x - c, b));
    this.findYGraphBackSCashe[key] = F;
    return F;
  }
  private findYGraphTrapezeCashe: any = {};
  findYGraphTrapeze(x: number, a: number, b: number, c: number, d: number) {
    const key = `k${x}k${a}k${b}k${c}k${d}`;

    if (this.findYGraphTrapezeCashe[key]) {
      return this.findYGraphTrapezeCashe[key];
    }
    let F = 0;
    if (x < a) F = 0;
    if (x >= a && x < c) F = (x - a) / (c - a);
    if (x >= c && x < d) F = 1;
    if (x >= d && x < b) F = (b - x) / (b - d);
    if (b <= x) F = 0;
    this.findYGraphTrapezeCashe[key] = F;
    return F;
  }
  private findYGraphGaussianCashe: any = {};
  findYGraphGaussian(x: number, a: number, b: number) {
    const key = `k${x}k${a}k${b}}`;

    if (this.findYGraphGaussianCashe[key]) {
      return this.findYGraphGaussianCashe[key];
    }
    let F = 0;
    if (x >= a - 3 * b && x <= a + 3 * b)
      F = Math.exp(-(Math.pow(x - a, 2) / (2 * Math.pow(b, 2))));
    this.findYGraphGaussianCashe[key] = F;
    return F;
  }
  private findYGraphSigmoidCashe: any = {};
  findYGraphSigmoid(x: number, a: number, b: number) {
    const key = `k${x}k${a}k${b}}`;

    if (this.findYGraphSigmoidCashe[key]) {
      return this.findYGraphSigmoidCashe[key];
    }
    let F = Math.pow(1 + Math.exp(-a * (x - b)), -1);
    this.findYGraphSigmoidCashe[key] = F;
    return F;
  }
  private findYGraphRoughMountainCashe: any = {};
  findYGraphRoughMountain(x: number, a: number, b: number) {
    const key = `k${x}k${a}k${b}}`;

    if (this.findYGraphRoughMountainCashe[key]) {
      return this.findYGraphRoughMountainCashe[key];
    }
    let F = 0;

    // Делаем график на 35 процентов сначала МЕНЬШЕ, потом БОЛЬШЕ
    b = x < a ? b - (b / 100) * 35 : b + (b / 100) * 35;
    F = this.findYGraphGaussian(x, a, b);
    this.findYGraphRoughMountainCashe[key] = F;
    return F;
  }

  findXByAlphaLevelGraphS(alphaLevel: number, a: number, b: number) {

    if (alphaLevel <= 0.5)
      return {
        alphaLevel,
        left: a + Math.sqrt((alphaLevel * (b - a) * (b - a)) / 2.0),
        right: undefined,
      };
    return {
      alphaLevel,
      left: undefined,
      right:
        b + -1.0 * Math.sqrt(((1.0 - alphaLevel) * (b - a) * (b - a)) / 2.0),
    };
  }
  findXByAlphaLevelGraphMountain(
    alphaLevel: number,
    a: number,
    b: number,
    c: number
  ) {
    if (alphaLevel <= 0.5)
      return {
        alphaLevel,
        left: this.findXByAlphaLevelGraphS(alphaLevel, a, b).left,
        right: this.findXByAlphaLevelGraphS(1.0 - alphaLevel, c, c + b - a)
          .right,
      };
    return {
      alphaLevel,
      left: this.findXByAlphaLevelGraphS(alphaLevel, a, b).right,
      right: this.findXByAlphaLevelGraphS(1.0 - alphaLevel, c, c + b - a).left,
    };
  }
  findXByAlphaLevelGraphTriangle(
    alphaLevel: number,
    a: number,
    b: number,
    c: number
  ) {
    return {
      alphaLevel,
      left: a + alphaLevel * (c - a),
      right: b - alphaLevel * (b - c),
    };
  }
  findXByAlphaLevelGraphBackS(
    alphaLevel: number,
    a: number,
    b: number,
    c: number
  ) {
    if (alphaLevel === 0.0) {
      return {
        alphaLevel,
        left: undefined,
        right: c + 2 * b,
      };
    }

    if (alphaLevel === 1.0) {
      return {
        alphaLevel,
        left: 1,
        right: undefined,
      };
    }

    if (alphaLevel > 0.5)
      return {
        alphaLevel,
        left: c + Math.pow((1 / alphaLevel - 1) / a, 1 / b),
        right: undefined,
      };
    return {
      alphaLevel,
      left: undefined,
      right: c + Math.pow((1 / alphaLevel - 1) / a, 1 / b),
    };
  }
  findXByAlphaLevelGraphTrapeze(
    alphaLevel: number,
    a: number,
    b: number,
    c: number,
    d: number
  ) {
    return {
      alphaLevel,
      left: a + alphaLevel * (c - a),
      right: b - alphaLevel * (b - d),
    };
  }
  findXByAlphaLevelGraphGaussian(alphaLevel: number, a: number, b: number) {
    if (alphaLevel === 0)
      return {
        alphaLevel,
        left: a + 3 * b,
        right: a - 3 * b,
      };
    return {
      alphaLevel,
      left: a + Math.sqrt(-2 * b * b * Math.log(alphaLevel)),
      right: a - Math.sqrt(-2 * b * b * Math.log(alphaLevel)),
    };
  }
  findXByAlphaLevelGraphSigmoid(alphaLevel: number, a: number, b: number) {
    if (alphaLevel === 0.0)
      return {
        alphaLevel,
        left: 0,
        right: undefined,
      };

    if (alphaLevel === 1.0)
      return {
        alphaLevel,
        left: b + 2 * a,
        right: undefined,
      };

    return {
      alphaLevel,
      left: b - Math.log(1 / alphaLevel - 1) / a,
      right: undefined,
    };
  }
  findXByAlphaLevelGraphRoughMountain(
    alphaLevel: number,
    a: number,
    b: number
  ) {
    var leftB = b - (b / 100) * 30; // На 30% МЕНЬШЕ
    var rightB = b + (b / 100) * 30; // На 30% БОЛЬШЕ
    return {
      alphaLevel,
      left: this.findXByAlphaLevelGraphGaussian(alphaLevel, a, leftB).right,
      right: this.findXByAlphaLevelGraphGaussian(alphaLevel, a, rightB).left,
    };
  }


}
