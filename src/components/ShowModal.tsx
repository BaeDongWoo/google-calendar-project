import { ClockIcon, XMarkIcon, TrashIcon } from '@heroicons/react/20/solid';
import { ShowModalType } from '../interface';
import { setModal } from '../store/showModal';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { remove } from '../store/schedule';
export const ShowModal = (schedule: ShowModalType) => {
  const dispatch = useDispatch();

  const onRemoveHandler = () => {
    const data = {
      date: format(schedule.date, 'yyyy-MM-dd'),
      index: schedule.index,
    };
    dispatch(remove(data));
    dispatch(setModal(false));
  };
  return (
    <div className="fixed inset-0 z-50 flex h-full w-full cursor-default items-center justify-center">
      <div
        className={
          'relative rounded-xl bg-[#F0F4F9] w-1/3 h-1/3 flex flex-col p-2 shadow-lg gap-2'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-2">
          <XMarkIcon
            className="size-6 cursor-pointer"
            onClick={() => dispatch(setModal(false))}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="제목"
            className="w-3/4 bg-[#F0F4F9] border-b border-gray-500 focus:outline-none focus:border-b-blue-500 focus:border-b-2"
            value={schedule.title ? schedule.title : '제목없음'}
            readOnly
          />
        </div>
        <div className="relative flex justify-center">
          <ClockIcon className="size-6 absolute left-1" />
          <div className="flex w-3/4 justify-between">
            <div className="w-1/4">
              <input
                type="text"
                className="w-full bg-[#F0F4F9] focus:outline-none focus:border-b-blue-500 focus:border-b-2"
                value={
                  schedule.date.getMonth() +
                  1 +
                  '월' +
                  schedule.date.getDate() +
                  '일'
                }
                readOnly
              ></input>
            </div>
            <div className="w-1/4">
              <input
                type="text"
                className="w-full bg-[#F0F4F9] focus:outline-none focus:border-b-blue-500 focus:border-b-2"
                value={schedule.startHour + '시' + schedule.startMin + '분'}
                readOnly
              ></input>
            </div>
            {'-'}
            <div className="w-1/4 flex flex-col">
              <input
                type="text"
                className="w-full bg-[#F0F4F9]  focus:outline-none focus:border-b-blue-500 focus:border-b-2"
                value={schedule.endHour + '시' + schedule.endMin + '분'}
                readOnly
              ></input>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end h-full items-end p-3">
          <TrashIcon
            className="rounded-full font-bold w-10 h-8 cursor-pointer"
            onClick={onRemoveHandler}
          ></TrashIcon>
        </div>
      </div>
    </div>
  );
};
