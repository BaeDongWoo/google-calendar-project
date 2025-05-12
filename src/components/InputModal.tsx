import { XMarkIcon, ClockIcon } from '@heroicons/react/20/solid';
import { InputModalProps } from '../interface';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShowModal,
  setEndMin,
  setStartMin,
  setStartTime,
  setEndTime,
} from '../store/inputModal';
import { setSchedule } from '../store/schedule';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { RootState } from '../store';
export const InputModal = ({ date, startTime, endTime }: InputModalProps) => {
  const [title, setTitle] = useState('');
  const [showStartOption, setShowStartOption] = useState(false);
  const [showEndOption, setShowEndOption] = useState(false);
  const diapatch = useDispatch();

  const startMin = useSelector((state: RootState) => state.inputModal.startMin);
  const endMin = useSelector((state: RootState) => state.inputModal.endMin);

  const onSubmitHandler = () => {
    const data = {
      date: format(date, 'yyyy-MM-dd'),
      data: {
        title: title,
        startHour: startTime,
        startMin: startMin,
        endHour: endTime,
        endMin: endMin,
      },
    };
    diapatch(setSchedule(data));
    diapatch(setShowModal(false));
  };

  const minList = ['00', '15', '30', '45'];
  const setStartOption = () => {
    const list: any = [];
    for (let i = 0; i < 24; i++) {
      minList.map((min) => {
        list.push({ hour: i, min: min });
      });
    }
    return list;
  };
  const startOption = setStartOption();

  const setEndOption = (startTime: number) => {
    const list: any = [];
    for (let i = startTime; i < 24; i++) {
      minList.map((min) => {
        if (startTime === i) {
          if (Number(startMin) < Number(min)) {
            list.push({ hour: i, min: min });
          }
        } else if (startTime < i) {
          list.push({ hour: i, min: min });
        }
      });
    }
    list.push({ hour: 0, min: '00' });
    return list;
  };
  const endOption = setEndOption(startTime);
  useEffect(() => {
    if (startTime === endTime) {
      if (Number(startMin) >= Number(endMin)) {
        diapatch(setEndMin(endOption[0].min));
      }
    } else if (startTime > endTime) {
      diapatch(setEndTime(endOption[0].hour));
      diapatch(setEndMin(endOption[0].min));
    }
  }, [startTime, startMin]);
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
            onClick={() => diapatch(setShowModal(false))}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="제목"
            className="w-3/4 bg-[#F0F4F9] border-b border-gray-500 focus:outline-none focus:border-b-blue-500 focus:border-b-2"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="relative flex justify-center">
          <ClockIcon className="size-6 absolute left-1" />
          <div className="flex w-3/4 justify-between">
            <div className="w-1/4">
              <input
                type="text"
                className="w-full bg-[#F0F4F9] focus:outline-none focus:border-b-blue-500 focus:border-b-2"
                value={date.getMonth() + 1 + '월' + date.getDate() + '일'}
                readOnly
              ></input>
            </div>
            <div className="w-1/4">
              <input
                type="text"
                className="w-full bg-[#F0F4F9] focus:outline-none focus:border-b-blue-500 focus:border-b-2"
                value={startTime + '시' + startMin + '분'}
                onClick={() => setShowStartOption(true)}
                readOnly
              ></input>
              {showStartOption && (
                <div className="w-full mt-1 bg-white flex flex-col text-left shadow-lg overflow-y-auto h-24">
                  {startOption.map((option: any) => (
                    <span
                      className="p-1 flex hover:bg-gray-100"
                      onClick={() => {
                        diapatch(setStartTime(option.hour));
                        diapatch(setStartMin(option.min));
                        setShowStartOption(false);
                      }}
                    >
                      {option.hour + '시' + option.min + '분'}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {'-'}
            <div className="w-1/4 flex flex-col">
              <input
                type="text"
                className="w-full bg-[#F0F4F9]  focus:outline-none focus:border-b-blue-500 focus:border-b-2"
                value={endTime + '시' + endMin + '분'}
                onClick={() => setShowEndOption(true)}
                readOnly
              ></input>
              {showEndOption && (
                <div className="w-full mt-1 bg-white flex flex-col text-left shadow-lg overflow-y-auto h-24">
                  {endOption.map((option: any) => (
                    <span
                      className="p-1 flex hover:bg-gray-100"
                      onClick={() => {
                        diapatch(setEndTime(option.hour));
                        diapatch(setEndMin(option.min));
                        setShowEndOption(false);
                      }}
                    >
                      {option.hour + '시' + option.min + '분'}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end h-full items-end px-3">
          <button
            className="bg-sky-500 rounded-full text-white font-bold w-20 h-10 hover:bg-sky-700"
            onClick={onSubmitHandler}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};
