import React, { useState } from 'react';
import classNames from 'classnames';
import exit from '../../images/exit.png';
import del from '../../images/delete.png'

export const Modal = ({
  setModal,
  ideaFromServer,
  titleFromServer = '',
  descriptionFromServer = '',
  dateFromServer = '',
  timeFromServer = ''
}) => {
  const [title, setTitle] = useState(titleFromServer);
  const [description, setDescription] = useState(descriptionFromServer);
  const [planingDate, setPlaningDate] = useState(dateFromServer);
  const [planingTime, setPlaningTime] = useState(timeFromServer);
  const [titleError, setTitleError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const ideasArray = JSON.parse(localStorage.getItem('ideas'));

  const planDate = (e) => {
    const query = e.target.value;
    const regExp = new RegExp(/[0-9]|\./g);

    if (query.length <= 10 && regExp.test(query[query.length - 1])) {

      // typing
      if (query.length > planingDate.length) {
        if (query.length === 1 && new RegExp(/[0-3]/g).test(query)) {
          setPlaningDate(query);
        }

        if (query.length === 2 && Number(query) <= 31) {
          setPlaningDate(`${query}.`);
        }

        if (query.length === 4 && new RegExp(/[01]/g).test(query[query.length - 1])) {
          setPlaningDate(query);
        }

        if (query.length === 5 && Number(query.slice(3)) <= 12) {
          setPlaningDate(`${query}.`);
        }

        if (query.length === 7 && new RegExp(/[12]/g).test(query[query.length - 1])) {
          setPlaningDate(query);
        }

        if (query.length > 7) {
          setPlaningDate(query);
        }
      }

      // deleting
      else if (query.length < planingDate.length) {
        if (query.length === 2 || query.length === 5) {
          setPlaningDate(query.slice(0, -1));
        } else {
          setPlaningDate(query);
        }
      }
    }

    if (query.length === 0) {
      setPlaningDate(query);
    }

    if (query.length === 10) {
      setDateError(false)
    }
  }

  const planTime = (e) => {
    const query = e.target.value;
    const regExp = new RegExp(/[0-9]|:/g);

    if (query.length <= 5 && regExp.test(query[query.length - 1])) {

      // typing
      if (query.length > planingTime.length) {
        if (query.length === 1 && new RegExp(/[0-2]/g).test(query)) {
          setPlaningTime(query);
        }

        if (query.length === 2 && Number(query) <= 23) {
          setPlaningTime(`${query}:`);
        }

        if (query.length === 4 && new RegExp(/[0-5]/g).test(query[query.length - 1])) {
          setPlaningTime(query);
        }

        if (query.length === 5 && Number(query.slice(3)) <= 59) {
          setPlaningTime(query);
        }
      }

      // deleting
      if (query.length < planingTime.length) {
        if (query.length === 2) {
          setPlaningTime(query.slice(0, -1));
        } else {
          setPlaningTime(query);
        }
      }
    }

    if (query.length === 0) {
      setPlaningTime(query);
    }
  }

  const saveIdea = () => {
    if (!title) {
      setTitleError(true);
    }

    if (planingDate.length < 10) {
      setDateError(true)
    }

    if (title && planingDate.length === 10) {
      const creationStatus = ideasArray.some(idea => idea.creation_time === ideaFromServer.creation_time);

      if (creationStatus) {
        const ideaIndex = ideasArray.findIndex(idea => idea.creation_time === ideaFromServer.creation_time)

        ideasArray[ideaIndex].title = title;
        ideasArray[ideaIndex].description = description;
        ideasArray[ideaIndex].date = planingDate;
        ideasArray[ideaIndex].time = planingTime;
        ideasArray[ideaIndex].updated_time = new Date().toUTCString();

        localStorage.setItem('ideas', JSON.stringify(ideasArray));
      } else {
        const idea = {
          creation_time: new Date().toUTCString(),
          updated_time: '',
          title,
          description,
          date: planingDate,
          time: planingTime
        }

        localStorage.setItem('ideas', JSON.stringify([...ideasArray, idea]));
      }

      setModal(false);
    }
  }

  const deleteIdea = () => {
    const ideaIndex = ideasArray.findIndex(idea => idea.creation_time === ideaFromServer.creation_time);

    ideasArray.splice(ideaIndex, 1);

    localStorage.setItem('ideas', JSON.stringify(ideasArray));

    setModal(false);
  }

  return (
    <form className='modal'>
      <div className="modal__head">
        <div className="modal__head--text">
          Add new idea
        </div>

        <img
          src={exit}
          alt='exit'
          className="modal__head--exitButton"
          onClick={() => {
            setModal(false)
          }}
        />
      </div>

      <div className="modal__title">
        <div className="modal__title__container">
          <p className="modal__title--text">
            Title *
          </p>

          {titleError && (
            <p className="modal__title--errorText">
              is required
            </p>
          )}
        </div>

        <input
          type="text"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setTitleError(false)
          }}
          className="modal__title--input"
        />
      </div>

      <textarea
        name=""
        id=""
        value={description}
        onChange={event => {
          setDescription(event.target.value)
        }}
        rows="10"
        
        placeholder="Description"
        className="modal__textarea"
      ></textarea>

      <div className="modal__timeSet timeSet">
        <div className="timeSet__date">
          <div className="timeSet__date__container">
            <p className="timeSet__date--text">
              Date *
            </p>

            {dateError && (
              <p className="timeSet__date--errorText">
                is required
              </p>
            )}
          </div>

          <input
            type="text"
            value={planingDate}
            onChange={planDate}
            placeholder='dd.mm.yyyy'
            className="timeSet__date--input"
            size={10}
          />
        </div>

        <div className="timeSet__time">
          <p className="timeSet__time--text">
            Begin time
          </p>

          <div>
            <input
              type="text"
              value={planingTime}
              onChange={planTime}
              placeholder='--:--'
              className="timeSet__date--input"
              size={10}
            />
          </div>
        </div>
      </div>

      <div className="modal__service service">
        <div className="service__buttons">
          {(titleFromServer && dateFromServer) && (
            <img
              src={del}
              alt="delete"
              className="service__buttons--deleteButton"
              onClick={deleteIdea}
            />
          )}

          <button
            type='button'
            className={classNames('service__buttons--saveButton', {
              'service__buttons--saveButton--disabled': !title || planingDate.length !== 10
            })}
            onClick={saveIdea}
          >
            save
          </button>
        </div>

        {(titleFromServer && dateFromServer) && (
          <div className="service__status">
            <div>
              {`Created at ${ideaFromServer.creation_time.slice(5, -4)}`}
            </div>

            {ideaFromServer.updated_time && (
              <div>
                {`Updated at ${ideaFromServer.updated_time.slice(5, -4)}`}
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  )
}
