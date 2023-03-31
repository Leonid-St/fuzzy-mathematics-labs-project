export class MatrixService {
  _create_matrix_from_lines(line1: String, line2: String) {
    let n = Math.min(line1.length, line2.length);
    let result_matrix = new Array(n);
    for (let i = 0; i < n; i++) {
      result_matrix[i] = new Array(n);
    }
    for (let first_size = 0; first_size < n; first_size++) {
      for (let second_size = 0; second_size < n; second_size++) {
        let matches = 0;
        for (let i = 0; i < n - first_size; i++) {
          let substring1 = line1.slice(i, i + first_size + 1);
          for (let j = 0; j < n - second_size; j++) {
            let substring2 = line2.slice(j, j + second_size + 1);
            try {
              if (first_size >= second_size) {
                const a = substring1.indexOf(substring2);
                if (a !== -1) {
                  matches += 1;
                }
              } else {
                const a = substring2.indexOf(substring1);
                if (a !== -1) {
                  matches += 1;
                }
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
        let all_combinations = (n - first_size) * (n - second_size);
        result_matrix[first_size][second_size] = matches / all_combinations;
      }
    }
    return result_matrix;
  }

  _calculate_transitive_closure(matrix1: [][], matrix2: [][]) {
    let n = matrix1[0].length;
    let result_matrix = new Array(n);
    for (let i = 0; i < n; i++) {
      result_matrix[i] = new Array(n);
    }
    if (matrix1.length === matrix2.length) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (matrix1[i][j] > matrix2[i][j]) {
            result_matrix[i][j] = matrix1[i][j];
          } else {
            result_matrix[i][j] = matrix2[i][j];
          }
        }
      }
    }

    return result_matrix;
  }

  _calculate_max_min_composition(
    matrix1: Array<Array<number>>,
    matrix2: Array<Array<number>>
  ) {
    let n = matrix1[0].length;
    let result_matrix = new Array(n);
    for (let i = 0; i < n; i++) {
      result_matrix[i] = new Array(n);
    }
    if (matrix1.length === matrix2.length) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          result_matrix[i][j] = matrix2[0][j];
          if (matrix1[i][0] < matrix2[0][j]) {
            result_matrix[i][j] = matrix1[i][0];
          }
          for (let k = 1; k < n; k++) {
            let min_ = matrix2[i][k];
            if (matrix1[i][k] < matrix2[k][j]) {
              min_ = matrix1[i][k];
            }
            if (result_matrix[i][j] < min_) {
              result_matrix[i][j] = min_;
            }
          }
        }
      }
    }

    return result_matrix;
  }
}
