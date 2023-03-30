import { FuzzyStruct } from './fuzzy/FuzzuClass';

export interface IFuzzyOperaion {
    sum(firstFuzzyStruct: FuzzyStruct, secondFuzzyStruct: FuzzyStruct): FuzzyStruct | undefined;
}


export class FuzzyOperaion implements IFuzzyOperaion {
    sum(firstFuzzyStruct: FuzzyStruct, secondFuzzyStruct: FuzzyStruct) {
        if (firstFuzzyStruct.left && secondFuzzyStruct.left && firstFuzzyStruct.right && secondFuzzyStruct.right)
            return {
                alphaLevel: firstFuzzyStruct.alphaLevel,
                left: firstFuzzyStruct.left + secondFuzzyStruct.left,
                right: firstFuzzyStruct.right + secondFuzzyStruct.right
            }
    }

    subtracion(firstFuzzyStruct: FuzzyStruct, secondFuzzyStruct: FuzzyStruct) {
        if (firstFuzzyStruct.left && secondFuzzyStruct.left && firstFuzzyStruct.right && secondFuzzyStruct.right)
            return {
                alphaLevel: firstFuzzyStruct.alphaLevel,
                left: firstFuzzyStruct.left - secondFuzzyStruct.right,
                right: firstFuzzyStruct.right - secondFuzzyStruct.left
            }
    }

    multiplication(firstFuzzyStruct: FuzzyStruct, secondFuzzyStruct: FuzzyStruct) {
        if (firstFuzzyStruct.left && secondFuzzyStruct.left && firstFuzzyStruct.right && secondFuzzyStruct.right)
            return {
                alphaLevel: firstFuzzyStruct.alphaLevel,
                left: firstFuzzyStruct.left * secondFuzzyStruct.left,
                right: firstFuzzyStruct.right * secondFuzzyStruct.right
            }
    }

    division(firstFuzzyStruct: FuzzyStruct, secondFuzzyStruct: FuzzyStruct) {
        if (firstFuzzyStruct.left && secondFuzzyStruct.left && firstFuzzyStruct.right && secondFuzzyStruct.right)
            return {
                alphaLevel: firstFuzzyStruct.alphaLevel,
                left: secondFuzzyStruct.right / firstFuzzyStruct.left,
                right: firstFuzzyStruct.right / secondFuzzyStruct.left
            }
    }
}
