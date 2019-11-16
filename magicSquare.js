const n = 3;
const magic_number = n*((n*n+1)/2);
const center = 5; // 5 will always be at center
let cost = 0;

function formingMagicSquare(s) {
  let magicSquare = null;
  let pos = {};
  
  if(s[1][1] !== center) { // s[1][1] is the center of 3x3 matrix, 5 will always be at center
    
    for(let i = 0; i < s.length; i++) {
      for(let j = 0; j < s[i].length; j++) {
       if(s[i][j] === center) 
         pos = {i: i, j: j};
      }
    }

    // swap
    s[1][1] = s[1][1]+s[pos.i][pos.j];
    s[pos.i][pos.j] = s[1][1]-s[pos.i][pos.j];
    s[1][1] = s[1][1]-s[pos.i][pos.j];
    
    // calculate cost of swap
    cost += Math.abs(s[1][1]-s[pos.i][pos.j])+Math.abs(s[pos.i][pos.j]-s[1][1]);
  }
  
  for(let i = 0; i < s.length; i++) {
    for(let j = 0; j < s[i].length; j++) {
     magicSquare = checkMagicSquare(s, i, j);
    }
  }
  return cost;
}

function checkMagicSquare(s, i, j) {
  let calc_row = null;
  let calc_col = null;
  let tmp = 0;

  // calc sum of row
  calc_row = sumOfRows(i, s[i]);

  // diff === 0 if sum is magic number
  if(calc_row.diff === 0) return s;
  
  // check same column
  calc_col = sumOfCols(i, s[i]);

  // add the difference to each element of row
  tmp += s[i][j]+calc_row.diff;
  
  if(tmp < 0) return s;
  
  if(tmp !== center) { // 5 will always be center
    s[i][j] = tmp;
    cost += Math.abs(calc_row.diff);
    
    // check sum of column again
    calc_col = sumOfCols(i, s[i]);
    if(calc_col.diff === 0) {
      return s;
    }
    return checkMagicSquare(s, i, j+1);
  }
  return s;
}


function sumOfRows(row, ele) {
  let sum = ele.reduce((a, b) => a + b, 0);
  return {
    sum: sum,
    diff: magic_number-sum,
  };
}

function sumOfCols(col, s) {
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    sum += s[i][col];
  }
   return {
    sum: sum,
    diff: magic_number-sum,
  };
}

formingMagicSquare([[2, 9, 8],[4,2,7],[5,6,7]]);