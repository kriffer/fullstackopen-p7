import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className=" btn-small waves-effect waves-light primary">  {props.buttonLabel} </button>
      </div>
    
      <div style={showWhenVisible}>
        {props.children}
        <br/> 
        <button onClick={toggleVisibility} className=" btn-small waves-effect waves-light grey">cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
