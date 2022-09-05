import React from "react";
import { render, fireEvent, reduxRender } from "../reduxRender";
import ManagerInfoCard from "../../../App/Features/LineupView/Lineup/ManagerInfoCard";
import { BudgetInfo, changeGameweek, changeToBudgetTeam, changeToDraftTeam, DraftInfo, setLiveGameweek, TeamTypes } from "../../../App/Store/teamSlice";
import { GetPlayerGameweekDataSortedByPosition } from "../../../App/Helpers/FplAPIHelpers";
import { budgetLeaguePicks, budgetManagerInfo, draftLeaguePicks, draftManagerInfo, gameweek32 } from "../../SampleData/Gameweek32Data";
import { draftOverview, overview } from "../../SampleData/Overviews";
import store from "../../../App/Store/store";
import { PlayerData } from "../../../App/Models/CombinedData";
import { StyleSheet } from "react-native";
import { textPrimaryColor, lightColor } from "../../../App/Global/GlobalConstants";

let draftInfo: DraftInfo = { gameweek: 32, liveGameweek: 32, info: { id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Draft }

test('draft league manager card shows the right info', () => {

    const players = GetPlayerGameweekDataSortedByPosition(gameweek32, overview, draftInfo, draftOverview, draftLeaguePicks, budgetLeaguePicks);

    const customStore = store;
    customStore.dispatch(changeToDraftTeam({ id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }));
    customStore.dispatch(changeGameweek(32));
    customStore.dispatch(setLiveGameweek(32));

    const { getByText, getByTestId, getAllByTestId } = reduxRender(<ManagerInfoCard teamInfo={draftInfo} players={players as PlayerData[]} draftManagerInfo={draftManagerInfo}/>, customStore);

    expect(getByTestId('managerCardButton')).toBeEnabled();

    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByText('32')).toBeTruthy();
    expect(getByText('Points')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[0]).toHaveStyle({backgroundColor: textPrimaryColor});

    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByText('xPoints')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[1]).toHaveStyle({backgroundColor: textPrimaryColor}); 
    
    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByText('0')).toBeTruthy();
    expect(getByText('Transactions')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[2]).toHaveStyle({backgroundColor: textPrimaryColor});  

    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Overall')).toBeTruthy();
    expect(getByText('1491')).toBeTruthy();
    expect(getByText('Points')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[3]).toHaveStyle({backgroundColor: textPrimaryColor});  

    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Overall')).toBeTruthy();
    expect(getByText('70')).toBeTruthy();
    expect(getByText('Transactions')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[4]).toHaveStyle({backgroundColor: textPrimaryColor});  

    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByText('32')).toBeTruthy();
    expect(getByText('Points')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[0]).toHaveStyle({backgroundColor: textPrimaryColor});  
})

let budgetInfo: BudgetInfo = { gameweek: 32, liveGameweek: 32, info: { id: 89544331, isDraftTeam: false, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Budget }

test('budget league manager card shows the right info', () => {

    const players = GetPlayerGameweekDataSortedByPosition(gameweek32, overview, budgetInfo, draftOverview, draftLeaguePicks, budgetLeaguePicks);

    const customStore = store;
    customStore.dispatch(changeToBudgetTeam({ id: 89544331, isDraftTeam: false, isFavourite: true, name: 'Tarun' }));
    customStore.dispatch(changeGameweek(32));
    customStore.dispatch(setLiveGameweek(32));

    const { getByText, getByTestId, getAllByTestId } = reduxRender(<ManagerInfoCard teamInfo={budgetInfo} players={players as PlayerData[]} budgetGameweekPicks={budgetLeaguePicks} budgetManagerInfo={budgetManagerInfo}/>, customStore);

    expect(getByTestId('managerCardButton')).toBeEnabled();

    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByText('31')).toBeTruthy();
    expect(getByText('Points')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[0]).toHaveStyle({backgroundColor: textPrimaryColor});

    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByText('xPoints')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[1]).toHaveStyle({backgroundColor: textPrimaryColor}); 
    
    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByText('4747839')).toBeTruthy();
    expect(getByText('Rank')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[2]).toHaveStyle({backgroundColor: textPrimaryColor});

    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByText('0')).toBeTruthy();
    expect(getByText('Transactions')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[3]).toHaveStyle({backgroundColor: textPrimaryColor});  

    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Overall')).toBeTruthy();
    expect(getByText('284')).toBeTruthy();
    expect(getByText('Points')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[4]).toHaveStyle({backgroundColor: textPrimaryColor});  

    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Overall')).toBeTruthy();
    expect(getByText('4243897')).toBeTruthy();
    expect(getByText('Rank')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[5]).toHaveStyle({backgroundColor: textPrimaryColor});

    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Overall')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('Transactions')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[6]).toHaveStyle({backgroundColor: textPrimaryColor});  

    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Squad Value')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[7]).toHaveStyle({backgroundColor: textPrimaryColor});  

    fireEvent.press(getByTestId('managerCardButton'));

    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByText('31')).toBeTruthy();
    expect(getByText('Points')).toBeTruthy();
    expect(getAllByTestId('managerCardDots')[0]).toHaveStyle({backgroundColor: textPrimaryColor});  

});

test('only show gameweek points when on a past gameweek', () => {

    let draftInfo: DraftInfo = { gameweek: 32, liveGameweek: 31, info: { id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Draft }

    const players = GetPlayerGameweekDataSortedByPosition(gameweek32, overview, draftInfo, draftOverview, draftLeaguePicks, budgetLeaguePicks);

    const customStore = store;
    store.dispatch(changeToDraftTeam({ id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }));
    store.dispatch(changeGameweek(32));

    const { getByText, getByTestId, queryAllByTestId } = reduxRender(<ManagerInfoCard teamInfo={draftInfo} players={players as PlayerData[]} draftManagerInfo={draftManagerInfo}/>, customStore);

    expect(getByTestId('managerCardButton')).toBeDisabled();

    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByText('32')).toBeTruthy();
    expect(getByText('Points')).toBeTruthy();
    expect(queryAllByTestId('managerCardDots')).toStrictEqual([]);
});

const styles = StyleSheet.create({
    activeIndex: {
        backgroundColor: textPrimaryColor,
    },

    inactiveIndex: {
        backgroundColor: lightColor,
    },
});