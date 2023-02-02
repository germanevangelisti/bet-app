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

export const getTeamClass = (teamClass) => {
  switch (teamClass) {
    case "C":
      return "Contender";
    case "M":
      return "Medium";
    case "L":
      return "Looser";
    default:
      break;
  }
};

export const getDateTime = (date) => {
  const dateTime = new Date(date);
  return dateTime.getHours();
};
