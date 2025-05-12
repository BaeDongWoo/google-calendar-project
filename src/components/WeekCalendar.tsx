import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { setDate } from '../store/calendar';
import {
  setStartTime,
  setEndTime,
  setShowModal,
  setStartMin,
  setEndMin,
} from '../store/inputModal';
import { InputModal } from './InputModal';
export const WeekCalendar = () => {
  const date = useSelector((state: RootState) => state.calendar.date);
  const startT = useSelector((state: RootState) => state.inputModal.startTime);
  const endT = useSelector((state: RootState) => state.inputModal.endTime);
  const allSchedule = useSelector((state: RootState) => state.schedule);
  const showInputModal = useSelector(
    (state: RootState) => state.inputModal.showModal
  );
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const setDaysNumber = () => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = endOfWeek(date, { weekStartsOn: 0 });
    const weekDate = eachDayOfInterval({ start, end });
    return weekDate;
  };
  const daysNumber = setDaysNumber();

  const dispatch = useDispatch();

  const onClickCell = (index: number, time: number) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = daysNumber[index].getDate();
    dispatch(setDate(new Date(year, month, day)));
    dispatch(setStartTime(Math.floor(time)));
    dispatch(setEndTime(Math.floor(time + 1)));
    dispatch(setShowModal(true));
    dispatch(setStartMin('00'));
    dispatch(setEndMin('00'));
  };

  const formatDate = (index: number) => {
    const year = daysNumber[index].getFullYear();
    const month = daysNumber[index].getMonth() + 1;
    const day = daysNumber[index].getDate();
    return (
      year +
      '-' +
      (month < 9 ? '0' : '') +
      month +
      '-' +
      (day < 9 ? '0' : '') +
      day
    );
  };

  const initColGridCell = () => {
    const columns = [];

    // 첫 번째 열 (시간 표시만 있는 열)
    const timeColumn = (
      <div className="flex flex-col text-xs text-gray-500 relative">
        {Array.from({ length: 24 }, (_, hour) => (
          <div
            key={`time-${hour}`}
            className="h-10 w-20 text-xs text-right pr-1 relative"
          >
            <span className="absolute -bottom-2 right-1">{hour + 1}시</span>
          </div>
        ))}
      </div>
    );
    columns.push(timeColumn);

    // 요일별 열 (각 열에 24칸)

    for (let i = 0; i < 7; i++) {
      const weekSchedule = allSchedule[formatDate(i)];
      columns.push(
        <div key={`col-${i}`} className="flex flex-col relative">
          {Array.from({ length: 24 }, (_, hour) => (
            <div
              key={`cell-${i}-${hour}`}
              className="h-10 border-b border-l border-gray-200 hover:bg-blue-50"
              onClick={() => onClickCell(i, hour)}
            ></div>
          ))}
          {weekSchedule &&
            /*한시간 h=10 시작위치(top) = startHour * 10 + startMin*0.25 끝위치(h) = (endHour * 10 + endMin*0.25 )-시작위치*/
            weekSchedule.map((schedule, index) => (
              <div
                className=" inset-0 rounded-lg bg-sky-300 hover:bg-sky-500 absolute"
                style={{
                  top: schedule.startHour * 40 + Number(schedule.startMin) * 10,
                  height:
                    schedule.endHour * 40 +
                    Number(schedule.endMin) * 10 -
                    (schedule.startHour * 40 + Number(schedule.startMin) * 10),
                  marginRight: (index + 1) * 5,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {schedule.title}
              </div>
            ))}
        </div>
      );
    }

    return <div className="grid grid-cols-[80px_repeat(7,1fr)]">{columns}</div>;
  };
  return (
    <div className="w-full h-screen bg-white text-sm text-gray-800">
      <div className="sticky top-0 z-10 grid grid-cols-[80px_repeat(7,1fr)] h-16 border-b border-gray-200 bg-white">
        <div className="flex items-end justify-center text-xs text-gray-500"></div>
        {days.map((day, i) => (
          <div
            key={day}
            className="flex flex-col items-center justify-end border-l border-gray-200"
          >
            <div className="text-xs">{day}</div>
            <div
              className={`w-6 h-6 text-base font-semibold ${
                date.getDate() === daysNumber[i].getDate()
                  ? 'bg-sky-200 border-sky-200 rounded-full'
                  : ''
              }`}
            >
              {daysNumber[i].getDate()}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-rows-[80px_repeat(1fr,7)] h-16">
        {initColGridCell()}
      </div>
      {showInputModal && (
        <InputModal date={date} startTime={startT} endTime={endT} />
      )}
    </div>
  );
};
