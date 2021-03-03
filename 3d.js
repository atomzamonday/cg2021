/* CPE361_CG Activity Learning 
  3D Rotation.
  Santhiti Traiyasakda 61070501053
  Chayoot Sathanbua 61070503404
  Tewish Wongprechachok 61070503414 Thanakrit Pinnikorn 61070503416
  Benjapol Suriyachantananont 61070503421
*/

const point = {
  begin: [3, 3, 3],
  end: [3, 2, 1],
  p: [10, 5, 10],
};
const degree = 360;

const getMatrixLine = (list) => {
  return [
    [list[0], 0, 0, 0],
    [list[1], 0, 0, 0],
    [list[2], 0, 0, 0],
    [1, 0, 0, 0],
  ];
};

const plotMatrix = (mt) => {
  mt.forEach((v) => {
    console.log(
      `\t${parseFloat(v[0]).toFixed(4)}\t${parseFloat(v[1]).toFixed(
        4
      )}\t${parseFloat(v[2]).toFixed(4)}\t${parseFloat(v[3]).toFixed(4)}`
    );
  });
};

const plotLine = (l) => {
  l.forEach((v) => {
    console.log(`\t${parseFloat(v[0]).toFixed(4)}`);
  });
};

const mul = (a, b) => {
  let res = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        res[i][j] = res[i][j] + a[i][k] * b[k][j];
      }
    }
  }
  return res;
};

const t = (x, y, z, invert = false) => {
  if (invert) {
    return [
      [1, 0, 0, x],
      [0, 1, 0, y],
      [0, 0, 1, z],
      [0, 0, 0, 1],
    ];
  } else {
    return [
      [1, 0, 0, -x],
      [0, 1, 0, -y],
      [0, 0, 1, -z],
      [0, 0, 0, 1],
    ];
  }
};

const rx = (b, c, d, invert = false) => {
  if (invert) {
    return [
      [1, 0, 0, 0],
      [0, c / d, b / d, 0],
      [0, -b / d, c / d, 0],
      [0, 0, 0, 1],
    ];
  } else {
    return [
      [1, 0, 0, 0],
      [0, c / d, -b / d, 0],
      [0, b / d, c / d, 0],
      [0, 0, 0, 1],
    ];
  }
};

const ry = (a, d, invert = false) => {
  if (invert) {
    return [
      [d, 0, a, 0],
      [0, 1, 0, 0],
      [-a, 0, d, 0],
      [0, 0, 0, 1],
    ];
  } else {
    return [
      [d, 0, -a, 0],
      [0, 1, 0, 0],
      [a, 0, d, 0],
      [0, 0, 0, 1],
    ];
  }
};

const rz = (degree) => {
  const cos =
    Math.cos((degree * Math.PI) / 180) < 0.00001
      ? 0
      : Math.cos((degree * Math.PI) / 180);
  const sin =
    Math.sin((degree * Math.PI) / 180) < 0.00001
      ? 0
      : Math.sin((degree * Math.PI) / 180);
  return [
    [cos, -sin, 0, 0],
    [sin, cos, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
};

console.log(`\nBegin point: ${point.begin}`);
console.log(`End point: ${point.end}`);
console.log(`Target point: ${point.p}`);

console.log(`T result:`);
const t_val = t(point.begin[0], point.begin[1], point.begin[2]);
plotMatrix(t_val);

const p_t = mul(t_val, getMatrixLine(point.p));
console.log(`P*T result:`);
plotLine(p_t);

const dx = point.end[0] - point.begin[0];
const dy = point.end[1] - point.begin[1];
const dz = point.end[2] - point.begin[2];
const dv = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
const a = dx / dv;
const b = dy / dv;
const c = dz / dv;
const d = Math.sqrt(b ** 2 + c ** 2);

console.log(`\nRx result:`);
const rx_val = rx(b, c, d);
plotMatrix(rx_val);

console.log(`\nP*T*Rx result:`);
const p_tRx = mul(rx_val, p_t);
plotLine(p_tRx);

console.log(`\nRy result:`);
const ry_val = ry(a, d);
plotMatrix(ry_val);

console.log(`\nP*T*Rx*Ry result:`);
const p_tRxRy = mul(ry_val, p_tRx);
plotLine(p_tRxRy);

console.log(`\nRz result:`);
const rz_val = rz(degree);
plotMatrix(rz_val);

console.log(`\nP*T*Rx*Ry*Rz result:`);
const p_tRxRyRz = mul(rz_val, p_tRxRy);
plotLine(p_tRxRyRz);

console.log(`\nRy_Inverse result:`);
const ry2_val = ry(a, d, true);
plotMatrix(ry2_val);

console.log(`\nP*T*Rx*Ry*Rz*RyInv result:`);
const p_tRxRyRzRy2 = mul(ry2_val, p_tRxRyRz);
plotLine(p_tRxRyRzRy2);

console.log(`\nRx_Inverse result:`);
const rx2_val = rx(b, c, d, true);
plotMatrix(rx2_val);

console.log(`\nP*T*Rx*Ry*Rz*RyInv*RxInv result:`);
const p_tRxRyRzRy2Rx2 = mul(rx2_val, p_tRxRyRzRy2);
plotLine(p_tRxRyRzRy2Rx2);

console.log(`\nT_Inverse result:`);
const t2_val = t(point.begin[0], point.begin[1], point.begin[2], true);
plotMatrix(t2_val);

console.log(`\nP*T*Rx*Ry*Rz*RyInv*RxInv*TInv result:`);
const p_tRxRyRzRy2Rx2T2 = mul(t2_val, p_tRxRyRzRy2Rx2);
plotLine(p_tRxRyRzRy2Rx2T2);

console.log("");
