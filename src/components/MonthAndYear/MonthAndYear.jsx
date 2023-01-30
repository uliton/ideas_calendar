import React, { useState } from 'react';
import classNames from 'classnames';
import { getMonthName } from '../../utils/functions';

export const MonthAndYear = ({
  month,
  year,
  setMonth,
  setYear,
  setSmalCalendar
}) => {
  const monthArray = getMonthName();
  const [monthChoose, setMonthChoose] = useState(month);
  const [yearChoose, setYearChoose] = useState(year);

  return (
    <div className='may'>
      <div className="may__month">
        {monthArray.map((month, i) => (
          <p
            key={month}
            className={classNames('may__month--hover', {
              'may__month--active': i === monthChoose
            })}
            onClick={() => {
              setMonthChoose(i);
            }}
          >
            {month}
          </p>
        ))}
      </div>

      <div className="may__footer">
        <div className="may__year">
          <div
            className='button button__left'
            onClick={() => {
              setYearChoose(prevYear => prevYear - 1)
            }}
          ></div>

          <span>
            {yearChoose}
          </span>
        
          <div
            className='button button__right'
            onClick={() => {
              setYearChoose(prevYear => prevYear + 1)
            }}
          ></div>
        </div>

        <button
          type='button'
          className='may__button'
          onClick={() => {
            setMonth(monthChoose)
            setYear(yearChoose)
            setSmalCalendar(false)
          }}
        >
          go
        </button>
      </div>
    </div>
  )
}
