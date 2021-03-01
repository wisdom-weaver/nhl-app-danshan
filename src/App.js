import React from "react";
import { connect, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { compose } from "redux";
import Layout from "./components/Layout";
import { get_team_key } from "./utils/utils";
import HomePage from "./views/HomePage";
import InjuriesPage from "./views/InjuriesPage";
import PowerRankingsPage from "./views/PowerRankingsPage";
import TeamPage from "./views/TeamPage";

function App() {
  // console.log(get_team_key({ team:'', category:'basketball', subcategory:'nba' }));
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Layout>
              <HomePage />
            </Layout>
          </Route>
          <Route exact path="/injuries">
            <Layout>
              <InjuriesPage />
            </Layout>
          </Route>
          <Route exact path="/powerrankings">
            <Layout>
              <PowerRankingsPage />
            </Layout>
          </Route>
          <Route exact path="/team/:teamid">
            <Layout>
              <TeamPage />
            </Layout>
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log("state=>", state);
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
