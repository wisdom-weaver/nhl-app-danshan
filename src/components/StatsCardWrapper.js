import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { set_status_at_key_action } from "../store/actions/teamStatsActions";
import {
  dispatch_status_loaded,
  post_fetch_api_at_stat_key,
} from "../views/StatsTabsCard";
import { structure_matchup_data } from "./stats_cards_components/basketball-nba-tabs/MatchTab";
import { store } from "../index";

const get_each_config = async ({ config, category, subcategory, dispatch }) => {
  const [key, ob] = config;
  const { apis, structure_data } = ob;
  var data_ar = [];
  dispatch(
    set_status_at_key_action({
      category,
      subcategory,
      status_key: key,
      status_update: "loading",
    })
  );
  for (var i = 0; i < apis.length; i++) {
    await fetch(apis[i])
      .then((resp) => resp.json())
      .then((data) => data_ar.push(data))
      .catch(() => data_ar.push([]));
  }
  await post_fetch_api_at_stat_key({
    data_ar,
    category,
    subcategory,
    structure_data,
  });
  dispatch(
    set_status_at_key_action({
      category,
      subcategory,
      status_key: key,
      status_update: "loaded",
    })
  );
};

function StatsCardWrapper(props) {
  const dispatch = useDispatch();
  const { category, subcategory, configs } = props;

  const [inti_once, set_inti_once] = useState(false);
  const {status, stats} = useSelector(({teamStats})=>teamStats[category][subcategory])
  const init_fetch = () => {
    var data_ar = [];
    set_inti_once(true);
    Object.entries(configs).forEach((config) => {
      if(status[config[0]]=='loaded') return;
      else get_each_config({ config, category, subcategory, dispatch });
    });
  };
  useEffect(() => {
    if (inti_once) return;
    init_fetch();
  }, [inti_once]);
  const [a, set_a] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      set_a(true);
    }, 3000);
  }, [a]);

  return <>{props.children}</>;
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  StatsCardWrapper
);
