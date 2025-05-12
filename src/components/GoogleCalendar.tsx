import { Header } from './Header';
import { InputModal } from './InputModal';
import { MiniCalendar } from './MiniCalendar';
import { WeekCalendar } from './WeekCalendar';

export const GoogleCalendar = () => {
  return (
    <div className="p-4">
      <Header />
      <div className="flex">
        <MiniCalendar />
        <WeekCalendar />
      </div>
    </div>
  );
};
