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

export const getNBATeamName = (code) => {
  switch (code) {
    case "ATL":
      return "Atlanta Hawks";
    case "BOS":
      return "Boston Celtics";
    case "BKN":
      return "Brooklyn Nets";
    case "CHA":
      return "Charlotte Hornets";
    case "CHI":
      return "Chicago Bulls";
    case "CLE":
      return "Cleveland Cavaliers";
    case "DAL":
      return "Dallas Mavericks";
    case "DEN":
      return "Denver Nuggets";
    case "DET":
      return "Detroit Pistons";
    case "GSW":
      return "Golden State Warriors";
    case "HOU":
      return "Houston Rockets";
    case "IND":
      return "Indiana Pacers";
    case "LAC":
      return "Los Angeles Clippers";
    case "LAL":
      return "Los Angeles Lakers";
    case "MEM":
      return "Memphis Grizzlies";
    case "MIA":
      return "Miami Heat";
    case "MIL":
      return "Milwaukee Bucks";
    case "MIN":
      return "Minnesota Timberwolves";
    case "NO":
      return "New Orleans Pelicans";
    case "NYK":
      return "New York Knicks";
    case "OKC":
      return "Oklahoma City Thunder";
    case "ORL":
      return "Orlando Magic";
    case "PHI":
      return "Philadelphia 76ers";
    case "PHX":
      return "Phoenix Suns";
    case "POR":
      return "Portland Trail Blazers";
    case "SAC":
      return "Sacramento Kings";
    case "SAS":
      return "San Antonio Spurs";
    case "TOR":
      return "Toronto Raptors";
    case "UTA":
      return "Utah Jazz";
    case "WAS":
      return "Washington Wizards";
    default:
      return "Unknown team code";
  }
};

export const formatDayjsDate = (date) =>
  `${date.$y}-${monthMapper[date.$M]}-${date.$D}`;

export const formatDateToString = (date) =>
  `${date.getFullYear()}-${monthMapper[date.getMonth()]}-${date.getDate()}`;

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

export const getFullDateTime = (date) => {
  const dateTime = new Date(date);
  return `${dateTime.getHours()}:${
    dateTime.getMinutes() === 0 ? "00" : dateTime.getMinutes()
  }`;
};

export const hasDuplicateGameID = (arr) => {
  const gameIDMap = new Map();

  for (const item of arr) {
    if (gameIDMap.has(item.gameID)) {
      return true;
    }
    gameIDMap.set(item.gameID, true);
  }

  return false;
};

export const sumOdds = (arr) => {
  let sum = 0;
  for (const item of arr) {
    sum += parseFloat(item.teamSelected.odds);
  }
  return sum;
}