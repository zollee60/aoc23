const readFile = async (path: string): Promise<string[]> => {
  const file = Bun.file(path);
  const contentS = await file.text();
  const content = contentS.split("\n");
  return content;
};

const input1 = await readFile("inputs/day1_1.txt");

const sum = input1.reduce((prev, curr) => {
  let firstDigit = "";
  let secondDigit = "";

  for (let i = 0; i < curr.length; i++) {
    if (!isNaN(parseInt(curr[i]))) {
      if (firstDigit === "") {
        firstDigit = curr[i];
      } else {
        secondDigit = curr[i];
      }
    }
  }

  if (secondDigit === "") {
    secondDigit = firstDigit;
  }

  return prev + parseInt(firstDigit + secondDigit);
}, 0);

console.log(`Day 1_1: ${sum}`);

const numberMap: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const sum2 = input1.reduce((prev, curr) => {
  let i = 0;
  let j = curr.length - 1;
  let firstDigit = "";
  let secondDigit = "";
  let forwardBuffer = "";
  let backwardBuffer = "";

  while (i < curr.length && firstDigit === "") {
    if (!isNaN(parseInt(curr[i]))) {
      if (firstDigit === "") {
        firstDigit = curr[i];
      }
    } else {
      forwardBuffer += curr[i];
      //console.log(forwardBuffer);
      for (const key of Object.keys(numberMap)) {
        //console.log(`key: ${key} - ${forwardBuffer}`);
        if (forwardBuffer.includes(key)) {
          firstDigit = numberMap[key];
          //console.log(`firstDigit: ${firstDigit}`);
        }
      }
    }
    i++;
  }

  while (j > -1 && secondDigit === "") {
    if (!isNaN(parseInt(curr[j]))) {
      if (secondDigit === "") {
        secondDigit = curr[j];
      }
    } else {
      backwardBuffer = curr[j] + backwardBuffer;
      for (const key of Object.keys(numberMap)) {
        if (backwardBuffer.includes(key)) {
          secondDigit = numberMap[key];
        }
      }
    }
    j--;
  }
  //console.log(`${firstDigit} + ${secondDigit}`);
  return prev + parseInt(firstDigit + secondDigit);
}, 0);

console.log(`Day 1_2: ${sum2}`);

// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------

const input2 = await readFile("inputs/day2.txt");

const configuration = { blue: 14, red: 12, green: 13 };

type Set = {
  blue: number;
  red: number;
  green: number;
};

type Game = {
  id: number;
  sets: Set[];
};

const buildGameFromLine = (line: string): Game => {
  const game: Game = {
    id: 0,
    sets: [],
  };

  const first2Parts = line.split(": ");

  const id = first2Parts[0].split(" ")[1];

  game.id = parseInt(id);
  //console.log(`Game ${game.id}`);

  const sets = first2Parts[1].trim().split("; ");

  const colors = ["blue", "red", "green"];

  //console.log("Sets:");
  for (const set of sets) {
    const setParts = set.trim().split(", ");
    const setObj: Record<string, number> = {
      blue: 0,
      red: 0,
      green: 0,
    };
    for (let i = 0; i < setParts.length; i++) {
      colors.forEach((color) => {
        if (setParts[i].includes(color)) {
          setObj[color] = parseInt(setParts[i].split(" ")[0]);
        }
      });
    }
    //console.log(setObj);
    game.sets.push(setObj as Set);
  }

  return game;
};

const isPossible = (game: Game, configuration: Set): boolean => {
  let isPossible = true;

  for (const set of game.sets) {
    if (
      set.blue > configuration.blue ||
      set.red > configuration.red ||
      set.green > configuration.green
    ) {
      isPossible = false;
      break;
    }
  }

  return isPossible;
};

const games = input2.map((line) => buildGameFromLine(line));

const possibleGames = games.filter((game) => isPossible(game, configuration));

const sum3 = possibleGames.reduce((prev, curr) => {
  return prev + curr.id;
}, 0);

console.log(`Day 2_1: ${sum3}`);

const getMaxByColor = (sets: Set[], color: keyof Set): number => {
  let max = 0;
  for (const set of sets) {
    if (set[color] > max) {
      max = set[color];
    }
  }
  return max;
};

const sum4 = games.reduce((prev, curr) => {
  const blueMax = getMaxByColor(curr.sets, "blue");
  const redMax = getMaxByColor(curr.sets, "red");
  const greenMax = getMaxByColor(curr.sets, "green");

  return prev + blueMax * redMax * greenMax;
}, 0);

console.log(`Day 2_2: ${sum4}`);

// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------

// const input3 = await readFile("inputs/day3.txt");
