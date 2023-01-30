import React from 'react';
import classNames from 'classnames';
import { getWeekDay } from '../../utils/functions';
import { Idea } from '../Idea';

export const Day = ({ date, actualDate, setIdeaInfo }) => {
  const weekDay = getWeekDay(date.weekDay);
  const day = actualDate.getDate();
  const month = actualDate.getMonth();
  const year = actualDate.getFullYear();

  const correctDay = String(date.day).padStart(2, '0');
  const correctMonth = String(date.month + 1).padStart(2, '0');
  const fullDate = `${correctDay}.${correctMonth}.${date.year}`;
  const ideasArray = JSON.parse(localStorage.getItem('ideas')) || [];
  const filteredIdeasArray = ideasArray.filter(idea => fullDate === idea.date);

  return (
    <div className='day'>
      <div className={classNames('day__wrapper', {
        'day__wrapper--active': day === date.day && month === date.month && year === date.year
      })}>
        <div className='day__info' style={{opacity: 0.8}}>
          <p className='day__info--name'>
            {weekDay}
          </p>

          <p className='day__info--number'>
            {date.day}
          </p>
        </div>

        <div className={classNames('day__ideas', {
          'day__ideas--grid-2': filteredIdeasArray.length > 5,
          'day__ideas--grid-3': filteredIdeasArray.length > 10,
          'day__ideas--grid-4': filteredIdeasArray.length > 15,
        })}>
          {filteredIdeasArray.map(idea => (
            <div
              key={idea.creation_time}
              onClick={() => {
                setIdeaInfo(idea);
              }}
            >
              <Idea title={idea.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
