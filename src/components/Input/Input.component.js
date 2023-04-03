import React from 'react';
import {InputTemplate} from "./Input.template";

const Input = (props) => {
  return (
    <div>
      <InputTemplate  {...props} />
    </div>
  );
}

export {Input};
