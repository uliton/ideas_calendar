import React, { useState, useEffect } from "react";
import { getMonthName, getMonthArray } from "./utils/functions";
import classNames from "classnames";
import { Header } from "./components/Header";
import { Day } from "./components/Day";
import { Modal } from "./components/Modal";


export const App = () => {
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const monthArray = getMonthArray(month, year);
  const actualDate = new Date();
  const [modal, setModal] = useState(false);
  const [ideaInfo, setIdeaInfo] = useState({});

  useEffect(() => {
    setYear(actualDate.getFullYear());
    setMonth(actualDate.getMonth());
  }, [])

  useEffect(() => {
    if (localStorage.getItem('ideas') === null) {
      localStorage.setItem('ideas', JSON.stringify([]));
    }
  }, []);

  const monthName = getMonthName(month);

  const previousMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(prevYear => prevYear - 1)
    } else {
      setMonth(prevMonth => prevMonth - 1)
    }
  }

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(prevYear => prevYear + 1)
    } else {
      setMonth(prevMonth => prevMonth + 1)
    }
  }

  const getIdeaInfo = (info) => {
    setIdeaInfo(info);
    setModal(true);
  }

  return (
    <div className="app">
      <div className={classNames('container', {
      'app--modal': modal === true
    })}>
        <Header
          monthName={monthName}
          month={month}
          year={year}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
          setModal={setModal}
          setMonth={setMonth}
          setYear={setYear}
          setIdeaInfo={setIdeaInfo}
        />

        <div className="grid">
          {monthArray.map(date => (
            <div
              key={date.day}
              className={
                `grid__column--${
                  date.weekDay
                }-${
                  date.weekDay + 1
                }`
              }
            >
              <Day
                date={date}
                actualDate={actualDate}
                setIdeaInfo={getIdeaInfo}
              />
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <Modal
          setModal={setModal}
          ideaFromServer = {ideaInfo}
          titleFromServer = {ideaInfo.title}
          descriptionFromServer = {ideaInfo.description}
          dateFromServer = {ideaInfo.date}
          timeFromServer = {ideaInfo.time}
        />
      )}
    </div>
  );
};
