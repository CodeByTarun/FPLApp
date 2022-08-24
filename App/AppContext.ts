import React, { createContext } from "react";
import { FixturesMap } from "../App";
import { ThemeData } from "./Helpers/FplDataStorageService";
import { FplFixture } from "./Models/FplFixtures";
import { FplOverview } from "./Models/FplOverview";

interface FplDataBaseContextValue {
    overview: FplOverview;
    fixtures: FplFixture[];
    fixtureLists: FixturesMap;
    TeamFixtureDifficultyView: JSX.Element;
  }

export const FplBaseDataContext = createContext<FplDataBaseContextValue>({ overview: {} as FplOverview, fixtures: [] as FplFixture[], fixtureLists: {} as FixturesMap, TeamFixtureDifficultyView: {} as JSX.Element });

interface ManageThemeContextValue {
  theme: string;
  useDeviceTheme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setUseDeviceTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ManageThemeContext = createContext<ManageThemeContextValue>({} as ManageThemeContextValue);