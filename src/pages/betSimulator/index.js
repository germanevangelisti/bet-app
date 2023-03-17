import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchGameOddsByDate,
  selectAllGameOdds,
} from "../../redux/slices/gameOddsSlice";

const BetSimulator = () => {
  const today = new Date()
  const dispatch = useDispatch();
  const gameOddsByDate = useSelector(selectAllGameOdds);

  useEffect(() => {
    dispatch(fetchGameOddsByDate(today));
  }, []);

  console.log(gameOddsByDate);

  return <>BetSimulator</>;
};

export default BetSimulator;
