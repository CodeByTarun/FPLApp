import React from "react";
import { render } from "../reduxRender";
import PlayerListInfo from "../../../App/Features/PlayerStats/PlayerList/PlayerListInfo";
import { overview } from "../../SampleData/Overviews";
import { PlayerOverview } from "../../../App/Models/FplOverview";

const availablePlayer = {
    "chance_of_playing_next_round": 100,
    "chance_of_playing_this_round": 100,
    "code": 223340,
    "cost_change_event": 0,
    "cost_change_event_fall": 0,
    "cost_change_start": 3,
    "cost_change_start_fall": -3,
    "dreamteam_count": 3,
    "element_type": 3,
    "ep_next": "3.2",
    "ep_this": "6.9",
    "event_points": 2,
    "first_name": "Bukayo",
    "form": "3.2",
    "id": 22,
    "in_dreamteam": false,
    "news": "",
    "news_added": "2022-01-13T23:00:13.665796Z",
    "now_cost": 68,
    "photo": "223340.jpg",
    "points_per_game": "4.6",
    "second_name": "Saka",
    "selected_by_percent": "33.0",
    "special": false,
    "squad_number": null,
    "status": "a",
    "team": 1,
    "team_code": 3,
    "total_points": 143,
    "transfers_in": 4725986,
    "transfers_in_event": 1494,
    "transfers_out": 2957509,
    "transfers_out_event": 15663,
    "value_form": "0.5",
    "value_season": "21.0",
    "web_name": "Saka",
    "minutes": 2405,
    "goals_scored": 9,
    "assists": 6,
    "clean_sheets": 13,
    "goals_conceded": 28,
    "own_goals": 0,
    "penalties_saved": 0,
    "penalties_missed": 0,
    "yellow_cards": 5,
    "red_cards": 0,
    "saves": 0,
    "bonus": 14,
    "bps": 459,
    "influence": "648.4",
    "creativity": "850.8",
    "threat": "1136.0",
    "ict_index": "263.3",
    "influence_rank": 32,
    "influence_rank_type": 12,
    "creativity_rank": 5,
    "creativity_rank_type": 4,
    "threat_rank": 5,
    "threat_rank_type": 3,
    "ict_index_rank": 5,
    "ict_index_rank_type": 4,
    "corners_and_indirect_freekicks_order": 1,
    "corners_and_indirect_freekicks_text": "",
    "direct_freekicks_order": null,
    "direct_freekicks_text": "",
    "penalties_order": null,
    "penalties_text": ""
} as PlayerOverview;

const unavailablePlayer = {
    "chance_of_playing_next_round": 0,
    "chance_of_playing_this_round": 0,
    "code": 54694,
    "cost_change_event": 0,
    "cost_change_event_fall": 0,
    "cost_change_start": -4,
    "cost_change_start_fall": 4,
    "dreamteam_count": 0,
    "element_type": 4,
    "ep_next": "0.0",
    "ep_this": "0.0",
    "event_points": 0,
    "first_name": "Pierre-Emerick",
    "form": "0.0",
    "id": 4,
    "in_dreamteam": false,
    "news": "Left club by mutual consent",
    "news_added": "2022-02-02T08:21:28.428217Z",
    "now_cost": 96,
    "photo": "54694.jpg",
    "points_per_game": "3.1",
    "second_name": "Aubameyang",
    "selected_by_percent": "1.3",
    "special": false,
    "squad_number": null,
    "status": "u",
    "team": 1,
    "team_code": 3,
    "total_points": 44,
    "transfers_in": 742898,
    "transfers_in_event": 0,
    "transfers_out": 897737,
    "transfers_out_event": 70,
    "value_form": "0.0",
    "value_season": "4.6",
    "web_name": "Aubameyang",
    "minutes": 1036,
    "goals_scored": 4,
    "assists": 1,
    "clean_sheets": 6,
    "goals_conceded": 16,
    "own_goals": 0,
    "penalties_saved": 0,
    "penalties_missed": 2,
    "yellow_cards": 3,
    "red_cards": 0,
    "saves": 0,
    "bonus": 7,
    "bps": 131,
    "influence": "217.6",
    "creativity": "132.4",
    "threat": "582.0",
    "ict_index": "92.9",
    "influence_rank": 265,
    "influence_rank_type": 33,
    "creativity_rank": 225,
    "creativity_rank_type": 35,
    "threat_rank": 47,
    "threat_rank_type": 19,
    "ict_index_rank": 135,
    "ict_index_rank_type": 27,
    "corners_and_indirect_freekicks_order": null,
    "corners_and_indirect_freekicks_text": "",
    "direct_freekicks_order": null,
    "direct_freekicks_text": "",
    "penalties_order": null,
    "penalties_text": ""
} as PlayerOverview;

test('player with owner properties all show up', () => {

    const {queryByTestId, queryByText} = render(<PlayerListInfo overview={overview} player={availablePlayer} owner={'TB'}/>)

    expect(queryByTestId('jerseyPlayerListInfo')).toBeTruthy();
    expect(queryByTestId('playerListInfoDetailsContainer')).toBeTruthy();
    expect(queryByText('TB')).toBeTruthy();


});

test('injured/unavailable player with no owner', () => {

    const {queryByTestId} = render(<PlayerListInfo overview={overview} player={unavailablePlayer} />)
    
    expect(queryByTestId('jerseyPlayerListInfo')).toBeTruthy();
    expect(queryByTestId('playerListInfoDetailsContainer')).toBeTruthy();
    expect(queryByTestId('notAvailableIndicatorContainer')).toBeTruthy();
    expect(queryByTestId('ownerText')).toBeFalsy();
});


