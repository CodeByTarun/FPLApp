export interface FplDraftGameweekPicks {
    picks:         Pick[];
    entry_history: EntryHistory;
    subs:          Sub[];
}

export interface EntryHistory {
}

export interface Pick {
    element:         number;
    position:        number;
    is_captain:      boolean;
    is_vice_captain: boolean;
    multiplier:      number;
}

export interface Sub {
    element_in:  number;
    element_out: number;
    event:       number;
}
