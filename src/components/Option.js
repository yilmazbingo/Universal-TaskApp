import React from "react";

const Option = props => {
  return (
    <div className="option">
      <p className="option__text">
        {props.count}. {props.optionText}
      </p>
      <span>
        <button
          className="button button--link"
          onClick={() => props.handleDeleteOption(props.optionText)}
        >
          remove
        </button>
      </span>
    </div>
  );
};
export default Option;
