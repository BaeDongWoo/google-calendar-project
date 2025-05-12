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

export interface ShowModalType {
  title: string;
  date: Date;
  startHour: number;
  startMin: string;
  endHour: number;
  endMin: string;
  index: number;
}

export interface ScheduleType {
  title: string;
  startHour: number;
  startMin: string;
  endHour: number;
  endMin: string;
}
