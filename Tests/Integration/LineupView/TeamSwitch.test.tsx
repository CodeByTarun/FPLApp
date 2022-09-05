import React from "react";
import { render, fireEvent, reduxRender } from "../reduxRender";
import TeamSwitch from "../../../App/Features/LineupView/TeamSwitch";
import { changeGameweek, changeToFixture, DreamTeamInfo, FixtureInfo, TeamTypes } from "../../../App/Store/teamSlice";
import { fixtures, gameweek32, gameweek32Fixture } from "../../SampleData/Gameweek32Data";
import { overview } from "../../SampleData/Overviews";
import store from "../../../App/Store/store";
import { waitFor } from "@testing-library/react-native";
import { Globals } from "@react-spring/native";
import { useAppSelector } from "../../../App/Store/hooks";

let fixtureInfo: FixtureInfo = { gameweek: 32, liveGameweek: 1, isHome: true, fixture:  gameweek32Fixture, teamType: TeamTypes.Fixture }

test('when not a fixture team, switch should not show up', () => {

    const { queryByTestId } = reduxRender(<TeamSwitch overview={overview} fixtures={fixtures} gameweek={gameweek32}/>);

    expect(queryByTestId('teamSwitchButton')).toBeFalsy();
}) 

test('switch from home to away team back to home team when a fixture team', async() => {

    Globals.assign({
        skipAnimation: true,
    });

    const customStore = store;
    store.dispatch(changeGameweek(32));
    store.dispatch(changeToFixture(gameweek32Fixture));

    const { queryByTestId, rerender } = reduxRender(<TeamSwitch overview={overview} fixtures={fixtures} gameweek={gameweek32}/>, customStore);

    expect(queryByTestId('animatedViewTeamSwitch')).toHaveStyle({ left: '0%' });
    
    const teamInfo = store.getState().team;

    expect((teamInfo.teamType === TeamTypes.Fixture) ? teamInfo.isHome : false).toBe(true);
    

    fireEvent.press(queryByTestId('teamSwitchButton'));


    expect(teamInfo.teamType).toBe(TeamTypes.Fixture);

    const teamInfoNew = store.getState().team;

    expect((teamInfoNew.teamType === TeamTypes.Fixture) ? teamInfoNew.isHome : true).toBe(false);

    rerender(<TeamSwitch overview={overview} fixtures={fixtures} gameweek={gameweek32}/>);
    expect(queryByTestId('animatedViewTeamSwitch')).toHaveStyle({ left: '50%' });
});