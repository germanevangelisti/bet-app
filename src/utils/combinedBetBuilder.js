export const combinedBetBuilder = (games) => {
    
};

const monthMapper = {
  0: "JAN",
  1: "FEB",
  2: "MAR",
  3: "APR",
  4: "MAY",
  5: "JUN",
  6: "JUL",
  7: "AGO",
  8: "SEP",
  9: "OCT",
  10: "NOV",
  11: "DEC",
};

export const formatDayjsDate = (date) =>
  `${date.$y}-${monthMapper[date.$M]}-${date.$D}`;
