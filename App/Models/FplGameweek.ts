export interface FplGameweek {
    elements: Player[];
}

export interface Player {
    id:      number;
    stats:   Stats;
    explain: Explain[];
}

export interface Explain {
    fixture: number;
    stats:   Stat[];
}

export interface Stat {
    identifier: Identifier;
    points:     number;
    value:      number;
}

export enum Identifier {
    Assists = "assists",
    Bonus = "bonus",
    CleanSheets = "clean_sheets",
    GoalsConceded = "goals_conceded",
    GoalsScored = "goals_scored",
    Minutes = "minutes",
    OwnGoals = "own_goals",
    RedCards = "red_cards",
    Saves = "saves",
    YellowCards = "yellow_cards",
}

export interface Stats {
    minutes:          number;
    goals_scored:     number;
    assists:          number;
    clean_sheets:     number;
    goals_conceded:   number;
    own_goals:        number;
    penalties_saved:  number;
    penalties_missed: number;
    yellow_cards:     number;
    red_cards:        number;
    saves:            number;
    bonus:            number;
    bps:              number;
    influence:        string;
    creativity:       string;
    threat:           string;
    ict_index:        string;
    total_points:     number;
    in_dreamteam:     boolean;
}
