export interface FplDraftOverview {
    elements:      Element[];
    element_types: ElementType[];
    element_stats: ElementStat[];
    events:        Events;
    fixtures:      { [key: string]: Fixture[] };
    settings:      Settings;
    teams:         Team[];
}

export interface ElementStat {
    name:             string;
    label:            string;
    abbreviation:     string;
    is_match_stat:    boolean;
    match_stat_order: number | null;
    sort:             Sort;
}

export enum Sort {
    Asc = "asc",
    Desc = "desc",
}

export interface ElementType {
    id:                  number;
    element_count:       number;
    singular_name:       string;
    singular_name_short: string;
    plural_name:         string;
    plural_name_short:   string;
}

export interface Element {
    id:                                   number;
    assists:                              number;
    bonus:                                number;
    bps:                                  number;
    clean_sheets:                         number;
    creativity:                           string;
    goals_conceded:                       number;
    goals_scored:                         number;
    ict_index:                            string;
    influence:                            string;
    minutes:                              number;
    own_goals:                            number;
    penalties_missed:                     number;
    penalties_saved:                      number;
    red_cards:                            number;
    saves:                                number;
    threat:                               string;
    yellow_cards:                         number;
    added:                                string;
    chance_of_playing_next_round:         number | null;
    chance_of_playing_this_round:         number | null;
    code:                                 number;
    draft_rank:                           number;
    dreamteam_count:                      number;
    ep_next:                              null;
    ep_this:                              null;
    event_points:                         number;
    first_name:                           string;
    form:                                 string;
    in_dreamteam:                         boolean;
    news:                                 string;
    news_added:                           null | string;
    news_return:                          null;
    news_updated:                         null;
    points_per_game:                      string;
    second_name:                          string;
    squad_number:                         null;
    status:                               Status;
    total_points:                         number;
    web_name:                             string;
    influence_rank:                       number;
    influence_rank_type:                  number;
    creativity_rank:                      number;
    creativity_rank_type:                 number;
    threat_rank:                          number;
    threat_rank_type:                     number;
    ict_index_rank:                       number;
    ict_index_rank_type:                  number;
    corners_and_indirect_freekicks_order: null;
    corners_and_indirect_freekicks_text:  string;
    direct_freekicks_order:               null;
    direct_freekicks_text:                string;
    penalties_order:                      null;
    penalties_text:                       string;
    element_type:                         number;
    team:                                 number;
}

export enum Status {
    A = "a",
    D = "d",
    I = "i",
    N = "n",
    U = "u",
}

export interface Events {
    current: number;
    data:    Datum[];
    next:    number;
}

export interface Datum {
    average_entry_score:   null;
    deadline_time:         string;
    id:                    number;
    name:                  string;
    finished:              boolean;
    highest_scoring_entry: null;
    waivers_time:          string;
}

export interface Fixture {
    id:                     number;
    started:                boolean;
    code:                   number;
    finished:               boolean;
    finished_provisional:   boolean;
    kickoff_time:           string;
    minutes:                number;
    provisional_start_time: boolean;
    team_a_score:           null;
    team_h_score:           null;
    pulse_id:               number;
    event:                  number;
    team_a:                 number;
    team_h:                 number;
}

export interface Settings {
    league:       League;
    scoring:      { [key: string]: number };
    squad:        Squad;
    transactions: Transactions;
    ui:           UI;
}

export interface League {
    default_entries:            number;
    draft_reminder_hours:       number[];
    draft_postpone_hours:       number;
    draft_pushback_times:       number;
    h2h_draw:                   number;
    h2h_lose:                   number;
    h2h_win:                    number;
    max_entries:                number;
    min_entries:                number;
    private_max:                number;
    public_draft_delay_minutes: number;
    public_draft_tz_default:    string;
    public_entry_sizes:         number[];
    public_max:                 number;
}

export interface Squad {
    size:                number;
    select_GKP:          number;
    select_DEF:          number;
    select_MID:          number;
    select_FWD:          number;
    play:                number;
    min_play_GKP:        number;
    max_play_GKP:        number;
    min_play_DEF:        number;
    max_play_DEF:        number;
    min_play_MID:        number;
    max_play_MID:        number;
    min_play_FWD:        number;
    max_play_FWD:        number;
    position_type_locks: PositionTypeLocks;
    captains_disabled:   boolean;
}

export interface PositionTypeLocks {
    "12": string;
}

export interface Transactions {
    new_element_locked_hours:            number;
    trade_veto_minimum:                  number;
    trade_veto_hours:                    number;
    waivers_before_start_min_hours:      number;
    waivers_before_deadline_hours:       number;
    waivers_before_deadline_hours_event: WaiversBeforeDeadlineHoursEvent;
}

export interface WaiversBeforeDeadlineHoursEvent {
    "20": number;
}

export interface UI {
    special_shirt_exclusions: any[];
    use_special_shirts:       boolean;
}

export interface Team {
    code:       number;
    id:         number;
    name:       string;
    pulse_id:   number;
    short_name: string;
}
