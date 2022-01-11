export interface FplFixture {
    code:                   number;
    event:                  number | null;
    finished:               boolean;
    finished_provisional:   boolean;
    id:                     number;
    kickoff_time:           null | string;
    minutes:                number;
    provisional_start_time: boolean;
    started:                boolean | null;
    team_a:                 number;
    team_a_score:           number | null;
    team_h:                 number;
    team_h_score:           number | null;
    stats:                  Stat[];
    team_h_difficulty:      number;
    team_a_difficulty:      number;
    pulse_id:               number;
}

export interface Stat {
    identifier: Identifier;
    a:          A[];
    h:          A[];
}

export interface A {
    value:   number;
    element: number;
}

export enum Identifier {
    Assists = "assists",
    Bonus = "bonus",
    Bps = "bps",
    GoalsScored = "goals_scored",
    OwnGoals = "own_goals",
    PenaltiesMissed = "penalties_missed",
    PenaltiesSaved = "penalties_saved",
    RedCards = "red_cards",
    Saves = "saves",
    YellowCards = "yellow_cards",
}



