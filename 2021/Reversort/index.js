const reversort = (list) => {
  let cost = 0;

  for (let i = 0; i < list.length - 1; i += 1) {
    const restOfList = list.slice(i);
    const j = list.indexOf(Math.min(...restOfList));
    const sublist = list.slice(i, j);
    cost += sublist.length + 1;
    if (sublist.length) {
      list = reverseSublistInList(list, i, j + 1);
    }
  }
  return cost;
};

const reverseSublistInList = (list, sublistStartIndex, sublistEndIndex) => {
  const listBeforeSublistStart = list.slice(0, sublistStartIndex);
  const listAfterSublistEnd = list.slice(sublistEndIndex);
  const sublist = list.slice(sublistStartIndex, sublistEndIndex);
  sublist.reverse();
  return [...listBeforeSublistStart, ...sublist, ...listAfterSublistEnd];
};

const solveProblem = ({ testCases }) => {
  testCases.forEach((list, i) => {
    const cost = reversort(list);
    console.log(`Case #${i + 1}: ${cost}`);
  });
};

// Local test cases
// console.log('reversort([])', reversort([]));
// console.log('reversort([1, 2, 4, 3])', reversort([1, 2, 4, 3]), '\n');
// console.log('reversort([4, 2, 1, 3])', reversort([4, 2, 1, 3]), '\n');
// console.log('reversort([1, 2])', reversort([1, 2]), '\n');
// console.log(
//   'reversort([7, 6, 5, 4, 3, 2, 1])',
//   reversort([7, 6, 5, 4, 3, 2, 1]),
//   '\n',
// );

// Based on https://www.dandkim.com/google-code-jam-node-js-template/
const readInput = () => {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  let problem = {
    T: 0,
    testCases: [],
  };

  let testCaseIndex = -1;
  let inputElementsRemaining = 0;

  rl.on('line', (line) => {
    // Process input
    if (problem.T === 0) {
      // Get number of test cases from first line
      problem.T = Number(line);
      return;
    }
    // process the rest of the data
    if (inputElementsRemaining === 0) {
      testCaseIndex += 1;
      problem.testCases[testCaseIndex] = [];
      inputElementsRemaining = Number(line);
      return;
    }

    const inputElements = line.split(' ');
    inputElementsRemaining -= inputElements.length;
    problem.testCases[testCaseIndex] = problem.testCases[testCaseIndex].concat(
      inputElements.map((string) => Number(string)),
    );
  }).on('close', () => {
    // Finished processing input, now solve question
    solveProblem(problem);
    process.exit();
  });
};

readInput();
