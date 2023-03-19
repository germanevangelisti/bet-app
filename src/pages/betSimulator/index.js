import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchGameOddsByDate,
  selectAllGameOdds,
} from "../../redux/slices/gameOddsSlice";
import MatchingBetGame from "../../components/matchingBetGame";
import SingleBet from "../../components/singleBet";
import MultipleBet from "../../components/multipleBet";
import { getFullDateTime, hasDuplicateGameID, sumOdds } from "../../utils/formatters";

import "./styles.css";

const BetSimulator = () => {
  const today = new Date();
  const dispatch = useDispatch();
  const gameOddsByDate = useSelector(selectAllGameOdds);
  const [potentialReturns, setPotentialReturns] = useState(0);
  const [singleGameBets, setSingleGameBets] = useState([]);
  const [multipleOdd, setMultipleOdd] = useState(0)
  const [isMultipleBetAllowed, setIsMultipleBetAllowed] = useState(true)

  useEffect(() => {
    dispatch(fetchGameOddsByDate(today));
  }, []);

  const handleOddSelection = (isSelected, odd, game, teamSelected) => {
    const dataSelection = {
      teamSelected: teamSelected,
      ...game,
    };
    if (isSelected) {
      const newSingleGameBets = singleGameBets.concat(dataSelection);
      setSingleGameBets(newSingleGameBets);
      if (hasDuplicateGameID(newSingleGameBets)) {
        setIsMultipleBetAllowed(false)
      } else {
        setIsMultipleBetAllowed(true)
        setMultipleOdd(sumOdds(newSingleGameBets))
      }
      return setPotentialReturns(potentialReturns + odd);
    }
    const newSingleGameBets = singleGameBets.filter(
      (teamGame) =>
        teamGame.teamSelected.teamID !== dataSelection.teamSelected.teamID
    );
    setIsMultipleBetAllowed(true)
    setSingleGameBets(newSingleGameBets);
    setPotentialReturns(potentialReturns - odd);
  };

  console.log("gameOddsByDate: ", gameOddsByDate);
  console.log("singleGameBets: ", singleGameBets);
  console.log("potentialReturns: ", potentialReturns.toFixed(2));
  return (
    <div className="betSimulatorLayout">
      <div className="listWrapper">
        {gameOddsByDate.length > 0 ? (
          <>
            <div className="matchBettingHead">
              {
                <span className="matchBettingTitles">
                  <p>Match Betting</p>
                  <p>Away</p>
                  <p>Home</p>
                </span>
              }
            </div>
            {gameOddsByDate.map((game) => {
              return (
                <MatchingBetGame
                  game={game}
                  dateTime={getFullDateTime(game.startsAt)}
                  handleOddSelection={handleOddSelection}
                />
              );
            })}
          </>
        ) : (
          <div className="emptyList"></div>
        )}
      </div>
      <div className="listWrapper">
        {singleGameBets.length > 0 ? (
          <>
            <h2>Single - {singleGameBets.length}</h2>
            {singleGameBets.map((bet) => {
              return <SingleBet bet={bet} />;
            })}
          </>
        ) : (
          <div className="emptyList">Your bet slip is empty</div>
        )}
      </div>
      <div className="listWrapper">
        {singleGameBets.length > 0 ? (
          <>
            <h2>Multiple - {singleGameBets.length}</h2>
            <MultipleBet multipleOdd={multipleOdd} isMultipleBetAllowed={isMultipleBetAllowed}/>
          </>
        ) : <></>}
      </div>
    </div>
  );
};

export default BetSimulator;
