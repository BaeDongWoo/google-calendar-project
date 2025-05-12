export interface calendarType {
  date: Date;
}

export interface InputModalProps {
  date: Date;
  startTime: number;
  endTime: number;
}

export interface InputModalType {
  showModal: boolean;
  startTime: number;
  startMin: string;
  endTime: number;
  endMin: string;
}

export interface ScheduleType {
  title: string;
  startHour: number;
  startMin: string;
  endHour: number;
  endMin: string;
}
