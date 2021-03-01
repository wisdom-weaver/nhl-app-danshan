import React from 'react'
import _ from "lodash";
import LargeLogo from "../../LargeLogo";
import {
  SingleStat,
  structure_raw_row_from_key_mapping,
  TeamBar,
} from "../stats_cards_components";
import { get_team_key } from '../../../utils/utils';

const category = 'hockey'; 
const subcategory = 'nhl' ;

const key_mapping_streaks = [
  { key_init: "gsx$game", key_final: "game", key_head: "Game" },
  { key_init: "gsx$streaks", key_final: "streaks", key_head: "Streaks" },
];

export const structure_streaks_data = (data_ar) => {
  var raw_streaks = data_ar[0].feed.entry;
  // console.log({raw_streaks})
  raw_streaks = structure_raw_row_from_key_mapping({
    raw: raw_streaks,
    key_mapping: key_mapping_streaks,
  });
  // console.log({raw_streaks})
  
  const str_streaks = raw_streaks.reduce((acc,{game,streaks})=>{
    if(!game) return acc;
    var [a,b] = game.trim().split(' vs ');
    var game_id= `${get_team_key({team:a, category, subcategory})}@${get_team_key({team:b, category, subcategory})}`;
    
    // console.log(game, game_id);
    game = game_id;

    return {
      ...acc,
      [game]:[
        ...(acc[game] || []),
        streaks
      ]
    }
  },{})
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