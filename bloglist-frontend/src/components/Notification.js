import { useSelector } from "react-redux"
import "./notification.css";

const Notification = () => {

  const notification = useSelector(state => { return state.notification })
 
  if (notification.length > 0) {
    return <div className={notification[0].type}>{notification[0].text}</div>;
  }
};

export default Notification;
