import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";

import BasicCard from "../card/index.js";
import BasicList from "../list/index.js";

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
  const seasonStartDay = new Date(currentSeason?.regularSeasonStartDate || "");
  const countdown = new Date(Math.abs(seasonStartDay - today));

  const [value, setValue] = useState(dayjs());
  const [showInfo, setShowInfo] = useState(false);

  const onCallGamesByDate = () => {
    // dispatch(fetchCurrentTeamsClass());
    setShowInfo(false);
    dispatch(fetchGamesByDate(value));
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
          onClick={() => onCallGamesByDate()}
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
      showInfo && (
        <div className="teamsWrapper">
          <div>
            <BasicList teamClass="Containers" items={currentContenderTeams} />
          </div>
          <div>
            <BasicList teamClass="Medium" items={currentMediumTeams} />
          </div>
          <div>
            <BasicList teamClass="Loosers" items={currentLooserTeams} />
          </div>
        </div>
      )
    );
  };

  const renderGames = (date) => {
    return (
      <div className="cardsWrapper">
        {showInfo &&
          gamesByDate.map((game) => (
            <div key={`${game.GameID}`}>
              <BasicCard
                header={`${
                  game.isPotentialPivotGame ? "PIVOT Game" : "Regular Game"
                }`}
                title={`${game.awayTeam.code} vs ${game.homeTeam.code} `}
                subtitle={`${game.awayTeam.score || 0} - ${
                  game.homeTeam.score || 0
                } ${game.status} ${getDateTime(game.startsAt)}`}
                body={`${getTeamClass(game.awayTeam.teamClass)} (${
                  game.awayTeam.code
                }) vs ${getTeamClass(game.homeTeam.teamClass)} (${
                  game.homeTeam.code
                })`}
                isPivot={game.isPotentialPivotGame}
                buttonText="More Details"
              />
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="homeLayout">
      <div>
        {today.toDateString()} | Season day {countdown.getDate()}
      </div>
      <br />
      {renderGames(value)}
      {renderTeamStanding()}
    </div>
  );
};

export default Home;
