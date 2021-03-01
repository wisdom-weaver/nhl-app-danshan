import { combineReducers } from "redux"
import { teamStatsReducer } from "./teamStatsReducer"

const rootReducer = combineReducers({
  teamStats: teamStatsReducer,
})

export default rootReducer