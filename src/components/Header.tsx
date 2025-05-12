import {
  Bars4Icon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setDate } from '../store/calendar';
import { useState } from 'react';
export const Header = () => {
  const [calendarType, setCalendarType] = useState('weeks');
  const date = useSelector((state: RootState) => state.calendar.date);
  const dispatch = useDispatch();
  const monthHandler = (type: string) => {
    if (type === 'prev') {
      dispatch(setDate(new Date(date.getFullYear(), date.getMonth() - 1)));
    } else if (type === 'next') {
      dispatch(setDate(new Date(date.getFullYear(), date.getMonth() + 1)));
    }
  };
  return (
    <header className="flex items-center p-4 justify-between">
      <div className="flex items-center">
        <Bars4Icon className="size-6 my-6 mr-6" />
        <CalendarDaysIcon className="size-6 m-6" />
        <p className="font-bold pr-6">Calendar</p>
        {/*오늘 날짜 버튼*/}
        <button
          className="w-24 px-3 py-2 rounded-full border-2 border-solid m-3 font-bold"
          onClick={() => dispatch(setDate(new Date()))}
        >
          오늘
        </button>
        <button onClick={() => monthHandler('prev')}>
          <ChevronLeftIcon className="size-6 m-2" />
        </button>
        <p className="font-bold mx-3">
          {date.getFullYear() + '년' + (date.getMonth() + 1) + '월'}
        </p>
        <button onClick={() => monthHandler('next')}>
          <ChevronRightIcon className="size-6 m-2" />
        </button>
      </div>

      <div className="flex border-2 border-solid w-36 font-bold rounded-lg justify-center m-3">
        <button
          className={`w-full px-3 py-2 ${
            calendarType === 'weeks' ? `bg-blue-300` : ``
          } rounded-lg`}
          onClick={() => setCalendarType('weeks')}
        >
          주간
        </button>
        {/* <button
          className={`w-1/2 px-3 py-2 ${
            calendarType === 'month' ? `bg-blue-300` : ``
          } rounded-r-lg`}
          onClick={() => setCalendarType('month')}
        >
          월간
        </button> */}
      </div>
    </header>
  );
};
