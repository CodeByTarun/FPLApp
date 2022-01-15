export interface FplManagerGameweekPicks {
    active_chip:    null;
    automatic_subs: any[];
    entry_history:  { [key: string]: number };
    picks:          Pick[];
}

export interface Pick {
    element:         number;
    position:        number;
    multiplier:      number;
    is_captain:      boolean;
    is_vice_captain: boolean;
}
