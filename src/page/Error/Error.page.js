import {useEffect, useState} from 'react';

import {useLocation, useNavigate} from "react-router-dom";

import {ErrorTemplate} from "./Error.template";
import {queryParameterToObject} from "../../utils/functions.util";


const Error = () => {

  const navigate = useNavigate();
  const {search: query, pathname} = useLocation();


  const modifiedQuery=queryParameterToObject(query)
  return (
      <ErrorTemplate
      type={modifiedQuery}
      />

  );
}

export {Error};


