import TaskStyles from '../../styles/TaskPopup.module.scss';

export interface TaskPopupProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  fullScreen?: boolean;
  children?: React.ReactNode;
  id: string;
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  completed?: boolean;
}

export default function TaskPopupWrapper({ visible, children, fullScreen }: TaskPopupProps) {
  return (
    <div
      className={TaskStyles['task-popup_container']}
      style={{
        display: visible ? 'block' : 'none',
      }}
    >
      <div
        className={`${TaskStyles['task-popup']} ${fullScreen ? TaskStyles.fullscreen : ''}`}
      >
        {children}
      </div>
    </div>
  )
}
