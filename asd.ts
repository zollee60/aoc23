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
console.log(Object.keys(numberMap));

for (const key of Object.keys(numberMap)) {
  console.log(key);
}
