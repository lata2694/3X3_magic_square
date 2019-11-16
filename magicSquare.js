const n = 3;
const magic_number = n*((n*n+1)/2);
const center = 5;
let cost = 0;

function formingMagicSquare(s) {
  console.log('init s', s);
  let magicSquare = null;
  let pos = {};
  
  if(s[1][1] !== center) {
  console.log('s[1][1]', s[1][1]);
    
    for(let i = 0; i < s.length; i++) {
      for(let j = 0; j < s[i].length; j++) {
       if(s[i][j] === center) {
         pos = {i: i, j: j};
        }
      }
    }
    s[1][1] = s[1][1]+s[pos.i][pos.j];
    s[pos.i][pos.j] = s[1][1]-s[pos.i][pos.j];
    s[1][1] = s[1][1]-s[pos.i][pos.j];
    
    cost += Math.abs(s[1][1]-s[pos.i][pos.j])+Math.abs(s[pos.i][pos.j]-s[1][1]);
    
    console.log('changed s', s);
  }
  
  for(let i = 0; i < s.length; i++) {
    for(let j = 0; j < s[i].length; j++) {
     magicSquare = checkMagicSquare(s, i, j);
    }
  }
  
  console.log('magic', magicSquare);
  console.log('init cost', cost);
  
}


function checkMagicSquare(s, i, j) {
  let calc_row = null;
  let calc_col = null;
  let tmp = 0;
  calc_row = sumOfRows(i, s[i]);
  if(calc_row.diff === 0) return s;
  
  calc_col = sumOfCols(i, s[i]);

  tmp += s[i][j]+calc_row.diff;
  
  if(tmp < 0) return s;
  
  if(tmp !== center) {
    s[i][j] = tmp;
    cost += Math.abs(calc_row.diff);
    
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

