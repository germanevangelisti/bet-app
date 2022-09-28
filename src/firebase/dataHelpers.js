import { collection, getDocs, db } from "./config";

export function teamsDataMapper(team) {
  return {
    code: team.code,
    name: team.name,
    logo: team.logo,
    teamClass: team.class,
    record: team.record,
    winningPer: team.winning_perc,
    winningStreak: team.winning_streak,
    loosingStreak: team.loosing_streak,
  };
}

export const getTeamsData = async () => {
  const teamsCol = collection(db, "teams");
  const teamList = await getDocs(teamsCol).then((snap) =>
    snap.docs.map((doc) => doc.data())
  );
  return teamList;
};
