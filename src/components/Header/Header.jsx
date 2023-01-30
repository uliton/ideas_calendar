import React, { useState } from 'react';
import { MonthAndYear } from '../MonthAndYear';
import plus from '../../images/plus.svg';
import calendar from '../../images/calendar.png';

export const Header = ({
  monthName,
  month,
  year ,
  previousMonth,
  nextMonth,
  setModal,
  setMonth,
  setYear,
  setIdeaInfo
}) => {
  const [smalCalendar, setSmalCalendar] = useState(false);

  return (
    <div className="header">
      <img
        src={plus}
        alt="plus"
        className="header__plus"
        onClick={() => {
          setModal(true)
          setIdeaInfo({})
        }}
      />

      <div className="header__date date">
        <div
          className="date__button button button__left"
          onClick={previousMonth}
        ></div>

        <div className="date__monthName">
          {monthName}
        </div>
        
        <div className="date__year">
          {year}
        </div>

        <div
          className="date__button button button__right"
          onClick={nextMonth}
        ></div>

        <div className="date__calendar">
          <img
            src={calendar}
            alt="calendar"
            className='date__calendar--img'
            onClick={() => {
              setSmalCalendar(!smalCalendar)
            }}
          />

          {smalCalendar && (
            <MonthAndYear
              month={month}
              year={year}
              setMonth={setMonth}
              setYear={setYear}
              setSmalCalendar={setSmalCalendar}
            />
          )}
        </div>
      </div>
    </div>
  );
};
