import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  getTeamStatusService,
  selectAllTeams,
  fetchTeams,
} from "../../redux/slices/teamsSlice";
import { fetchSchedule } from "../../redux/slices/seasonSlice";

import "./styles.css";

const Teams = () => {
  const dispatch = useDispatch();
  const allTeams = useSelector(selectAllTeams);
  const teamsServiceStatus = useSelector(getTeamStatusService);

  const onRefresh = () => dispatch(fetchTeams());
  const getSchedule = () => dispatch(fetchSchedule());

  useEffect(() => {
    if (teamsServiceStatus === "idle") {
      dispatch(fetchTeams());
    }
  }, [dispatch, teamsServiceStatus]);

  const renderTeamLogo = (logo, name) => (
    <div className="teamLogoWrapper">
      <img
        src={logo}
        alt={logo}
        width="45px"
        height="45px"
        className="imgClass"
      ></img>
      <p>{name}</p>
    </div>
  );

  return (
    <div name="Teams">
      <header name="Teams-header">
        <Stack spacing={2} direction="row">
          <Button onClick={() => onRefresh()} variant="contained">
            Refresh
          </Button>
          <Button onClick={() => getSchedule()} variant="contained">
            Get Schedule
          </Button>
        </Stack>
        {teamsServiceStatus === "LOADING" ? (
          <p> Loading </p>
        ) : (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="left">TeamClass</TableCell>
                  <TableCell align="left">Record</TableCell>
                  <TableCell align="left">Winning %</TableCell>
                  <TableCell align="left">Winning Streak</TableCell>
                  <TableCell align="left">Loosing Streak</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allTeams.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{renderTeamLogo(row.logo, row.name)}</TableCell>
                    <TableCell align="left">{row.teamClass}</TableCell>
                    <TableCell align="left">{row.record}</TableCell>
                    <TableCell align="left">{row.winningPer}</TableCell>
                    <TableCell align="left">{row.winningStreak}</TableCell>
                    <TableCell align="left">{row.loosingStreak}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </header>
    </div>
  );
};

export default Teams;
