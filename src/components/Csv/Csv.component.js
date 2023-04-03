import React from 'react';
import {parseQuery, queryParameterToObject} from 'utils/functions.util'
import {useLocation} from "react-router-dom";
import {CsvTemplate} from "./Csv.template";




const Csv = (props) => {

    const {search: query, pathname} = useLocation();
    const parsedQuery = parseQuery(decodeURI(query));



    return (
        <div>
      {/*      <CsvOldTemplate  {...props} query={query} />  */}
            <CsvTemplate {...props}  getResult={props.getResult} data={props.data} loading={props.loading}  query={props.query} fetchData={props.fetchData}/>
        </div>
    );
}

export {Csv};
