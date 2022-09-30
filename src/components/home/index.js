import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";

import BasicCard from "../card/index.js";

import {
  fetchCurrentSeason,
  getCurrentSeason,
} from "../../redux/slices/seasonSlice";
import {
  fetchGamesByDate,
  getPotencialCombinedBets,
} from "../../redux/slices/potencialCombinedBetsSlice";

import "./styles.css";

const Home = () => {
  const dispatch = useDispatch();
  const currentSeason = useSelector(getCurrentSeason);
  const potencialCombinedBets = useSelector(getPotencialCombinedBets);
  const [value, setValue] = useState(dayjs());
  const today = new Date();
  const seasonStartDay = new Date(currentSeason?.RegularSeasonStartDate || "");
  const countdown = new Date(Math.abs(seasonStartDay - today));

  const bets = potencialCombinedBets || [];
  const pivot = "";

  const onCallGamesByDate = () => dispatch(fetchGamesByDate(value));

  useEffect(() => {
    dispatch(fetchCurrentSeason());
  }, []);

  return (
    <div className="homeLayout">
      <div>Today: {today.toDateString()}</div>
      <br />
      <div>Season starts on: {seasonStartDay.toDateString()}</div>
      <br />
      <div>Days remaining: {countdown.getDate()} days</div>
      <br />
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
      >
        Check potencial combined bets for selected date
      </Button>
      {/* <div>Next scheduled Games: {today.toDateString()}</div> */}
      <p className="title">Potential upcoming bets</p>
      <br />
      {bets.length ? (
        <div className="potentialBetCards">
          <BasicCard
            header="Potencial combine bet"
            title={`P: ${pivot}`}
            subtitle="here put some subtitle"
            body="body for everithing you want"
            buttonText="click me plissssss mmmm"
            onClick={() => console.log("hola")}
          />
        </div>
      ) : (
        <div>No potencial combined bets for the date selected</div>
      )}
    </div>
  );
};

export default Home;
