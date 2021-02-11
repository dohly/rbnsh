const Corellation = (values1: number[], values2: number[]) => {
  let total = values1.length;
  const avg = (arr: number[]) => E.sum(arr) / arr.length;
  let values1_average = avg(values1);
  let values2_average = avg(values2);

  let sum_values_average = 0;
  let sx = 0;
  let sy = 0;

  for (var index = 0, l = total; index < l; index++) {
    var value1 = values1[index];
    var value2 = values2[index];

    let x = value1 - values1_average;
    let y = value2 - values2_average;

    sum_values_average += x * y;

    sx += Math.pow(x, 2);
    sy += Math.pow(y, 2);
  }

  let n = total - 1;

  sx = sx / n;
  sy = sy / n;

  sx = Math.sqrt(sx);
  sy = Math.sqrt(sy);

  var correlation = (sum_values_average / (n * sx * sy)).toFixed(9);

  return parseFloat(correlation);
};
