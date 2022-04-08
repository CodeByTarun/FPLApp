export interface StatsFilterState {
    gameSpan: number | null;
    isPer90: boolean;
}

export enum StatsFilterActionKind {
    ChangeGameSpan,
    ChangeIsPer90,
    Reset,
}

export type StatsFilterAction = {
    type: StatsFilterActionKind.ChangeGameSpan;
    value: number;
} | {
    type: StatsFilterActionKind.ChangeIsPer90;
} | {
    type: StatsFilterActionKind.Reset;
    value: number;
}

export function statsFilterReducer(state: StatsFilterState, action: StatsFilterAction): StatsFilterState {
    switch (action.type) {
        case StatsFilterActionKind.ChangeGameSpan: {
            return {
                gameSpan: action.value,
                isPer90: state.isPer90,
            }
        }
        case StatsFilterActionKind.ChangeIsPer90: {
            return {
                gameSpan: state.gameSpan, 
                isPer90: !state.isPer90,
            }
        }
        case StatsFilterActionKind.Reset: {
            return { gameSpan: action.value, isPer90: false };
        }
    }
}