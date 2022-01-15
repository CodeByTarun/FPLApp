export interface FplDraftUserInfo {
    entry: Entry;
}

export interface Entry {
    event_points:       number;
    favourite_team:     number;
    id:                 number;
    league_set:         number[];
    name:               string;
    overall_points:     number;
    player_first_name:  string;
    player_last_name:   string;
    region_name:        string;
    region_code_short:  string;
    region_code_long:   string;
    started_event:      number;
    transactions_event: number;
    transactions_total: number;
}
