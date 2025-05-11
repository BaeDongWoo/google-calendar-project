import { DayPicker } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../interface';
import { setDate } from '../store/calendar';
export const MiniCalendar = () => {
  const date = useSelector((state: RootState) => state.calendar.date);
  const dispatch = useDispatch();

  const handleSelect = (date: Date | undefined) => {
    // 같은 날짜를 다시 눌러서 undefined가 되면 무시
    if (date === undefined) return;
    dispatch(setDate(date));
  };
  return (
    <div className="p-4">
      <DayPicker
        animate
        locale={ko}
        mode="single"
        selected={date}
        onSelect={handleSelect}
        month={date}
        onMonthChange={handleSelect}
        showOutsideDays
        onDayClick={handleSelect}
        classNames={{
          today: 'bg-blue-500 borer-blue-300 rounded-full ',
          selected: `bg-sky-200 border-sky-200 rounded-full`,
          chevron: 'coler-black',
        }}
      />
    </div>
  );
};
