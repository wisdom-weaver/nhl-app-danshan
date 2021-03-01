import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

function GetFromAPI(props) {
  const { api } = props;

  const [api_data, set_api_data] = useState(null);
  const [done_once, set_done_once] = useState(false);
  const [fetch_complete, set_fetch_complete] = useState(false);

  const init_fetch = () => {
    fetch(api)
      .then(resp => resp.json())
      .then(data => { set_api_data(data); set_fetch_complete(true) })
      .catch((err) => { set_fetch_complete(true) })
  }

  useEffect(() => {
    if (done_once) return;
    init_fetch();
    set_done_once(true);
  }, [done_once])


  return (
    <>
      {fetch_complete && React.cloneElement(props.children, {api_data}) }
      {!fetch_complete && (
        <h5 className="center">Loading..</h5>
      )}
    </>
  );
}

export default GetFromAPI;
