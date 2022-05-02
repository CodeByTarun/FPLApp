import React from "react";
import { render, fireEvent } from "../reduxRender";
import TeamSwitch from "../../../App/Features/LineupView/TeamSwitch";
import { changeGameweek, changeToFixture, DreamTeamInfo, FixtureInfo, TeamTypes } from "../../../App/Store/teamSlice";
import { fixtures, gameweek32, gameweek32Fixture } from "../../SampleData/Gameweek32Data";
import { overview } from "../../SampleData/Overviews";
import store from "../../../App/Store/store";

let fixtureInfo: FixtureInfo = { gameweek: 32, isHome: true, fixture:  gameweek32Fixture, teamType: TeamTypes.Fixture }

test('when not a fixture team, switch should not show up', () => {

    const { queryByTestId } = render(<TeamSwitch overview={overview} fixtures={fixtures} gameweek={gameweek32}/>);

    expect(queryByTestId('teamSwitchButton')).toBeFalsy();
}) 

test('switch from home to away team back to home team when a fixture team', () => {

    const customStore = store;
    store.dispatch(changeGameweek(32));
    store.dispatch(changeToFixture(gameweek32Fixture));

    const { queryByTestId } = render(<TeamSwitch overview={overview} fixtures={fixtures} gameweek={gameweek32}/>, customStore);

    expect(queryByTestId('animatedViewTeamSwitch')).toHaveStyle({ left: '0%' });
    
    fireEvent.press(queryByTestId('teamSwitchButton'));
    expect(queryByTestId('animatedViewTeamSwitch')).toHaveStyle({ left: '50%' });
});