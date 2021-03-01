import _ from "lodash";
import { get_team_key } from "../../../utils/utils";
import LargeLogo from "../../LargeLogo";
import {
  SingleStat,
  structure_raw_row_from_key_mapping,
  TeamBar,
} from "../stats_cards_components";

const key_mapping_streaks = [
  { key_init: "gsx$game", key_final: "game", key_head: "Game" },
  { key_init: "gsx$streaks", key_final: "streaks", key_head: "Streaks" },
];

const category = 'basketball', subcategory='nba';

export const structure_streaks_data = (data_ar) => {
  var raw_streaks = data_ar[0].feed.entry;
  raw_streaks = structure_raw_row_from_key_mapping({
    raw: raw_streaks,
    key_mapping: key_mapping_streaks,
  });
  
  raw_streaks = raw_streaks.map(ea=>{
    var game = ea.game;
    var teams = game.trim().split(' vs ');
    teams = teams.map(team=>get_team_key({team, category, subcategory}) )
    game = `${teams[0]} vs ${teams[1]}`;
    return { ...ea, game };
  });
  // console.log("raw_streaks", raw_streaks);


  const str_streaks = raw_streaks.reduce((acc,{game,streaks})=>({
    ...acc,
    [game]:[
      ...(acc[game] || []),
      streaks
    ]
  }),{})
  delete str_streaks[""];
  // console.log("str_streaks", str_streaks);
  
  return { stat_structure: str_streaks, stat_key: "streaks" };
};

export const StreaksTab = ({ statA, statB, streaks }) => {
  const { teamA, teamA_Img, colorA } = statA;
  const { teamB, teamB_Img, colorB } = statB;
  // console.log('streaks=>',streaks);
  // return <></>
  return (
    <div className="card-content streaks-tab">
      <TeamBar
        midTitle={"Streaks"}
        {...{ teamA, teamA_Img, teamB, teamB_Img }}
      />
      {streaks && streaks?.length > 0 ? (
        streaks?.map((streak) => (
          <>
            <div className="spacing-20px"></div>
            <p>{streak}</p>
            <div className="spacing-5px"></div>
            <hr />
          </>
        ))
      ) : (
        <h5 className="center head">No Streaks</h5>
      )}
    </div>
  );
};