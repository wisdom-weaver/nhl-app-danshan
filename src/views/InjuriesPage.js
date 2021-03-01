// import { functionsIn } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// import GetFromAPI from "../components/GetFromAPI";
import LargeLogo from "../components/LargeLogo";
import { ButtonLinks } from "../components/Layout";
import SmallLogo from "../components/SmallLogo";
import StatsCardWrapper from "../components/StatsCardWrapper";
import { TeamInjuries } from "../components/stats_cards_components/hockey-nhl-tabs/InjuriesTab";
import { get_all_teams_names } from "../utils/utils";
import StatsTabsCard, { post_fetch_api_at_stat_key } from "./StatsTabsCard";

const category = 'hockey';
const subcategory='nhl';

const filter  = ({search, injuries_all})=>{
  // search = search.trim()
  if(!search) return false;
  search = search.split(' ');;
  
  injuries_all = Object.entries(injuries_all);
  injuries_all = injuries_all.map(([team, teaminjs])=>{
    var count = 0;
    for(var inj of teaminjs){
      var {team, player, position, positionno, updated, injury, injurystatus} = inj;
      search.map(word=>{
        if(!word) return;
        word = word.toLowerCase()
        if(team && team.toLowerCase().includes(word)) count+=100;
        if(player && player.toLowerCase().includes(word)) count+=25;
        if(injury && injury.toLowerCase().includes(word)) count+=10;
        if(updated && updated.toLowerCase().includes(word)) count+=5;
        if(position && position.toLowerCase().includes(word)) count+=5;
        if(injurystatus && injurystatus.toLowerCase().includes(word)) count+=5;
      },0)
    }
    return {team, count}
  })
  var sorted = injuries_all.filter(ea=>ea.count!=0).sort((a,b)=>b.count>a.count).map(({team})=>team);
  console.log(sorted, injuries_all);
  return sorted;
}

const InjuriesJSX = ({ teams, rankings_all }) => {
  return (
    <>
      {(teams && teams.length>0) &&
        teams.map(team=> <TeamInjuries {...{team, category, subcategory}}/>)
      }
      {(!teams || !(teams?.length>0)) && 
      <div className="card">
      <div className="card-content">
        <h5 className="center">Nothing Found</h5>
      </div>
      </div>
      }
    </>
  );
};

function InjuriesPage() {
  const { configs } = useSelector(
    ({ teamStats }) => teamStats[category][subcategory]
  );
  var injuries_all = useSelector(state=>{try{return state.teamStats[category][subcategory].stats.injuries}catch(err){return {}}});
  
  var loaded = useSelector(state=>{try{return state.teamStats[category][subcategory].status.injuries}catch(err){return false}});
  
  const [search, set_search ]= useState('');
  useSelector(()=>{
  // console.log({loaded});
  })
  return (
    <div>
      <h5 className="center head">NHL Injuries</h5>
      <div className="row">
        <ButtonLinks />
      </div>
      <input type="text" value={search} onChange={(e)=>{set_search(e.target.value)}}/>
      <StatsCardWrapper
        {...{ category, subcategory, post_fetch_api_at_stat_key, configs }}
      >
        {loaded == 'loaded' && <>
            {(()=>{
              var teams;
              if(!search || search?.trim().length==0) teams = get_all_teams_names({category, subcategory})
              else{
                teams = filter({search, injuries_all})
              }
              return <InjuriesJSX {...{teams}} />
            })()}
          </>
        }
        {
          loaded == 'loading' && <>
            <div className="card round-card">
              <div className="card-content">
                <h5 className="center"> Loading.... </h5>
              </div>
            </div>
          </>
        }
      </StatsCardWrapper>
    </div>
  );
}

export default InjuriesPage;
