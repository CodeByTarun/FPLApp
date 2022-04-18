import React from "react";
import { render } from "../reduxRender";
import Lineup from "../../../App/Features/LineupView/Lineup";
import store from "../../../App/Store/store";
import { BudgetInfo, DraftInfo, DreamTeamInfo, FixtureInfo, TeamTypes } from "../../../App/Store/teamSlice";
import { budgetLeaguePicks, budgetManagerInfo, draftLeaguePicks, draftManagerInfo, fixtures, gameweek32, gameweek32Fixture } from "../../SampleData/Gameweek32Data";
import { draftOverview, overview } from "../../SampleData/Overviews";

let draftInfo: DraftInfo = { gameweek: 32, info: { id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Draft };
let budgetInfo: BudgetInfo = { gameweek: 32, info: { id: 89544331, isDraftTeam: false, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Budget };
let dreamTeamInfo: DreamTeamInfo = { gameweek: 32, teamType: TeamTypes.Dream};
let fixtureInfo: FixtureInfo = { gameweek: 32, isHome: true, fixture:  gameweek32Fixture, teamType: TeamTypes.Fixture }

let draftInfoCurrentGameweek: DraftInfo = { gameweek: 33, info: { id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Draft };


let gameweekGreaterThanCurrentGameweekTeamInfo: DreamTeamInfo = {gameweek: 32, teamType: TeamTypes.Dream};

test('team type is draft', () => {

    const {queryByTestId, queryAllByTestId, rerender} = render(<Lineup overview={overview} teamInfo={draftInfo} fixtures={fixtures} gameweek={gameweek32}
                                                                       draftGameweekPicks={draftLeaguePicks} draftOverview={draftOverview} budgetGameweekPicks={budgetLeaguePicks}
                                                                       budgetUserInfo={budgetManagerInfo} draftUserInfo={draftManagerInfo}/>);

    expect(queryAllByTestId('playerStatsDisplayButton')).toHaveLength(15);
    expect(queryByTestId('managerCardButton')).toBeTruthy();
    expect(queryByTestId('additionalInfoCardButton')).toBeFalsy();

    rerender(<Lineup overview={overview} teamInfo={draftInfoCurrentGameweek} fixtures={fixtures} gameweek={gameweek32}
                     draftGameweekPicks={draftLeaguePicks} draftOverview={draftOverview} budgetGameweekPicks={budgetLeaguePicks}
                     budgetUserInfo={budgetManagerInfo} draftUserInfo={draftManagerInfo}/>);

    expect(queryByTestId('additionalInfoCardButton')).toBeTruthy();

});

test('team type is budget', () => {

    const {queryByTestId, queryAllByTestId} = render(<Lineup overview={overview} teamInfo={budgetInfo} fixtures={fixtures} gameweek={gameweek32}
                                                                       draftGameweekPicks={draftLeaguePicks} draftOverview={draftOverview} budgetGameweekPicks={budgetLeaguePicks}
                                                                       budgetUserInfo={budgetManagerInfo} draftUserInfo={draftManagerInfo}/>);

    expect(queryAllByTestId('playerStatsDisplayButton')).toHaveLength(15);
    expect(queryByTestId('managerCardButton')).toBeTruthy();
    expect(queryByTestId('additionalInfoCardButton')).toBeFalsy();

});

test('team type is dream team', () => {

    const {queryByTestId, queryAllByTestId} = render(<Lineup overview={overview} teamInfo={dreamTeamInfo} fixtures={fixtures} gameweek={gameweek32}
                                                             draftGameweekPicks={draftLeaguePicks} draftOverview={draftOverview} budgetGameweekPicks={budgetLeaguePicks}
                                                             budgetUserInfo={budgetManagerInfo} draftUserInfo={draftManagerInfo}/>);

    expect(queryAllByTestId('playerStatsDisplayButton')).toHaveLength(11);
    expect(queryByTestId('kingScrollView')).toBeTruthy();
});

test('team type is fixture', () => {

    const {queryByTestId, queryAllByTestId} = render(<Lineup overview={overview} teamInfo={fixtureInfo} fixtures={fixtures} gameweek={gameweek32}
                                                             draftGameweekPicks={draftLeaguePicks} draftOverview={draftOverview} budgetGameweekPicks={budgetLeaguePicks}
                                                             budgetUserInfo={budgetManagerInfo} draftUserInfo={draftManagerInfo}/>);

    expect(queryAllByTestId('playerStatsDisplayButton')).toHaveLength(14);

});