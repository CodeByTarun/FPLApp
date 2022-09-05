import React from "react";
import { reduxRender, render } from "../reduxRender";
import { LineupView } from "../../../App/Features/LineupView";
import { budgetLeaguePicks, budgetManagerInfo, draftLeaguePicks, draftManagerInfo, gameweek32, draftLeagueInfo, gameweek32Fixture } from "../../SampleData/Gameweek32Data";
import { draftOverview, overview } from "../../SampleData/Overviews";
import { allFixtures } from "../../SampleData/Fixtures";
import { TeamInfo, TeamTypes } from "../../../App/Store/teamSlice";
import store from "../../../App/Store/store";

test('team type is empty', () => {
    const emptyTeam: TeamInfo = {gameweek: 32, liveGameweek: 32, teamType: TeamTypes.Empty};

    const { getByText, getAllByTestId } = reduxRender(<LineupView overview={overview} fixtures={allFixtures} gameweek={gameweek32} teamInfo={emptyTeam} draftGameweekPicks={draftLeaguePicks}
                                                             draftOverview={draftOverview} draftUserInfo={draftManagerInfo} draftLeagueInfo={draftLeagueInfo} 
                                                             budgetGameweekPicks={budgetLeaguePicks} budgetUserInfo={budgetManagerInfo}/>); 

    expect(getByText('Add your fantasy team')).toBeTruthy();
});

test('team type is dream', () => {

    const dreamTeam: TeamInfo = {gameweek: 32, liveGameweek: 32, teamType: TeamTypes.Dream};

    const { getByText, getAllByTestId } = reduxRender(<LineupView overview={overview} fixtures={allFixtures} gameweek={gameweek32} teamInfo={dreamTeam} draftGameweekPicks={draftLeaguePicks}
                                                             draftOverview={draftOverview} draftUserInfo={draftManagerInfo} draftLeagueInfo={draftLeagueInfo} 
                                                             budgetGameweekPicks={budgetLeaguePicks} budgetUserInfo={budgetManagerInfo}/>); 

    expect(getAllByTestId('playerStatsDisplayButton')).toHaveLength(11);
    expect(getByText('Dream Team')).toBeTruthy();
});

test('team type is draft team', () => {

    const draftInfo: TeamInfo = { gameweek: 32, liveGameweek: 32, info: { id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Draft }

    const { getByText, getAllByTestId, getByTestId } = reduxRender(<LineupView overview={overview} fixtures={allFixtures} gameweek={gameweek32} teamInfo={draftInfo} draftGameweekPicks={draftLeaguePicks}
                                                             draftOverview={draftOverview} draftUserInfo={draftManagerInfo} draftLeagueInfo={draftLeagueInfo} 
                                                             budgetGameweekPicks={budgetLeaguePicks} budgetUserInfo={budgetManagerInfo}/>);

    expect(getAllByTestId('playerStatsDisplayButton')).toHaveLength(15);
    expect(getByTestId('managerTeamDropDownButton')).toBeTruthy();

});

test('team type is fixture', () => {

    let fixtureInfo: TeamInfo = { gameweek: 32, liveGameweek: 32, isHome: true, fixture:  gameweek32Fixture, teamType: TeamTypes.Fixture }

    const customStore = store;

    const { getAllByTestId, getByTestId } = reduxRender(<LineupView overview={overview} fixtures={allFixtures} gameweek={gameweek32} teamInfo={fixtureInfo} draftGameweekPicks={draftLeaguePicks}
                                                                          draftOverview={draftOverview} draftUserInfo={draftManagerInfo} draftLeagueInfo={draftLeagueInfo} 
                                                                          budgetGameweekPicks={budgetLeaguePicks} budgetUserInfo={budgetManagerInfo}/>, customStore);
    
    expect(getAllByTestId('playerStatsDisplayButton')).toHaveLength(14);
    expect(getByTestId('teamSwitchContainer')).toBeTruthy();
});