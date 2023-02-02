import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";

import BasicCard from "../card/index.js";
import BasicList from "../list/index.js";
import GameDetails from "../gameDetails/index.jsx";
import TeamDetails from "../teamDetails/index.jsx";

import {
  fetchCurrentSeason,
  fetchTeamsStanding,
  getCurrentSeason,
  getCurrentContenderTeams,
  getCurrentMediumTeams,
  getCurrentLooserTeams,
} from "../../redux/slices/seasonSlice";
import {
  fetchGamesByDate,
  getGamesByDate,
  getFetchTeamsClassStatus,
} from "../../redux/slices/gamesSlice";

import { getTeamClass, getDateTime } from "../../utils/formatters";

import "./styles.css";

const Home = () => {
  const dispatch = useDispatch();
  const currentSeason = useSelector(getCurrentSeason);
  const gamesByDate = useSelector(getGamesByDate);
  const currentContenderTeams = useSelector(getCurrentContenderTeams);
  const currentMediumTeams = useSelector(getCurrentMediumTeams);
  const currentLooserTeams = useSelector(getCurrentLooserTeams);
  const fetchTeamsClassStatus = useSelector(getFetchTeamsClassStatus);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const seasonStartDay = new Date(currentSeason?.regularSeasonStartDate || "");
  const countdown = new Date(Math.abs(seasonStartDay - today));

  const [value, setValue] = useState(dayjs());
  const [showInfo, setShowInfo] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [gameSelected, setGameSelected] = useState(null);
  const [teamSelected, setTeamSelected] = useState(null);

  const handleYesterdayGames = () => onCallGamesByDate(dayjs(yesterday));
  const handleTodayGames = () => onCallGamesByDate(dayjs(today));
  const handleTomorrowGames = () => onCallGamesByDate(dayjs(tomorrow));
  const handleToggleDrawer = () => setShowDrawer(!showDrawer);
  const handleCloseDrawer = () => {
    setGameSelected(null);
    setTeamSelected(null);
    setShowDrawer(false);
  };

  const handleSelectTeamOnClick = (team) => {
    setTeamSelected(team);
    handleToggleDrawer();
  };

  const onCallGamesByDate = (date) => {
    setShowInfo(false);
    dispatch(fetchGamesByDate(date));
  };

  useEffect(() => {
    dispatch(fetchCurrentSeason());
    dispatch(fetchTeamsStanding());
    dispatch(fetchGamesByDate(dayjs(today)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchTeamsClassStatus === "SUCCEEDED") {
      setShowInfo(true);
    }
  }, [fetchTeamsClassStatus]);

  const renderDatePicker = () => {
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Basic example"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          disabled={!value}
          onClick={() => onCallGamesByDate(value)}
          variant="contained"
          color="primary"
        >
          Check games for selected date
        </Button>
      </>
    );
  };

  const renderTeamStanding = () => {
    return (
      <div className="teamsWrapper">
        <div>
          <BasicList
            teamClass="Contender"
            items={currentContenderTeams}
            onClick={handleSelectTeamOnClick}
          />
        </div>
        <div>
          <BasicList
            teamClass="Medium"
            items={currentMediumTeams}
            onClick={handleSelectTeamOnClick}
          />
        </div>
        <div>
          <BasicList
            teamClass="Loosers"
            items={currentLooserTeams}
            onClick={handleSelectTeamOnClick}
          />
        </div>
      </div>
    );
  };

  const renderGames = () => {
    return (
      <div className="cardsWrapper">
        {showInfo ? (
          gamesByDate.map((game) => (
            <div key={`${game.GameID}`}>
              <BasicCard
                header={`${game.isPivot ? "PIVOT Game" : "Regular Game"}`}
                score={`${game.awayTeam.score || 0} - ${
                  game.homeTeam.score || 0
                }`}
                body={`${getTeamClass(game.awayTeam.teamClass)} (${
                  game.awayTeam.code
                }) vs ${getTeamClass(game.homeTeam.teamClass)} (${
                  game.homeTeam.code
                })`}
                onClick={() => {
                  setGameSelected(game);
                  handleToggleDrawer();
                }}
                game={game}
              />
            </div>
          ))
        ) : (
          <div className="gamesSkeleton" />
        )}
      </div>
    );
  };

  const renderInfoGames = () => {
    const pivotGames = showInfo
      ? gamesByDate?.filter((game) => game.isPivot)
      : [];
    const regularGames = showInfo
      ? gamesByDate?.filter((game) => !game.isPivot)
      : [];
    const pivotGamesSucceeded = showInfo
      ? gamesByDate?.filter(
          (game) =>
            game.isPivot &&
            game.isGameClosed &&
            game.teamWinner?.code === game.teamShouldWin
        )
      : [];
    const pivotGamesFailed = showInfo
      ? gamesByDate?.filter(
          (game) =>
            game.isPivot &&
            game.isGameClosed &&
            game.teamWinner?.code !== game.teamShouldWin
        )
      : [];
    return (
      showInfo && (
        <div className="infoGames">
          <div className="infoGameContent">
            <span>pivot games: {pivotGames?.length}</span>
            {gamesByDate[0]?.isGameClosed && (
              <>
                <span style={{ color: "green" }}>
                  {pivotGamesSucceeded?.length} succeeded
                </span>
                <span style={{ color: "red" }}>
                  {pivotGamesFailed?.length} falied
                </span>
              </>
            )}
          </div>
          <div className="infoGameContent">
            <span>regular games: {regularGames?.length}</span>
          </div>
          <div className="infoGameContent">
            <span>total games: {gamesByDate?.length}</span>
          </div>
        </div>
      )
    );
  };

  const renderDrawer = () => (
    <Drawer anchor="right" open={showDrawer} onClose={handleCloseDrawer}>
      {gameSelected && <GameDetails game={gameSelected} />}
      {teamSelected && <TeamDetails team={teamSelected} />}
    </Drawer>
  );

  return (
    <div className="homeLayout">
      <div>
        {today.toDateString()} | Season day {countdown.getDate()}
      </div>
      <br />
      <div className="dateControls">
        <Button
          onClick={handleYesterdayGames}
          variant="contained"
          color="primary"
        >
          Yesterday
        </Button>
        <Button
          onClick={handleTodayGames}
          variant="contained"
          color="secondary"
        >
          Today
        </Button>
        <Button
          onClick={handleTomorrowGames}
          variant="contained"
          color="primary"
        >
          Tomorrow
        </Button>
        {renderDatePicker()}
      </div>
      {renderInfoGames()}
      {renderGames()}
      {renderTeamStanding()}
      {renderDrawer()}
    </div>
  );
};

export default Home;
