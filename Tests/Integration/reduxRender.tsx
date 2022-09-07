import React, { FunctionComponent, PropsWithChildren, ReactElement, useState } from "react";
import { render as rtlRender } from "@testing-library/react-native";
import { Provider } from "react-redux";
import store from "../../App/Store/store";
import { AnyAction, Store } from "@reduxjs/toolkit";
import { FplBaseDataContext, ManageThemeContext } from "../../App/AppContext";
import { overview } from "../SampleData/Overviews";
import { fixtures } from "../SampleData/Gameweek32Data";
import { FixturesMap } from "../../App";
import fixtureDifficultyList from "../SampleData/fixtureDifficultyList.json"

export const setThemeMockFn = jest.fn();
export const setUseDeviceThemeMockFn = jest.fn();

const reduxRender = (ui: ReactElement, customStore: Store<any, AnyAction> = store ) => {

    function Wrapper ({ children }: PropsWithChildren<{}>) : JSX.Element {
        return (
            <Provider store={customStore}>
                <FplBaseDataContext.Provider value={{overview: overview, fixtures: fixtures, fixtureLists: fixtureDifficultyList as FixturesMap, TeamFixtureDifficultyView: null as React.ReactNode}}>
                    <ManageThemeContext.Provider value={{theme: 'light', useDeviceTheme: true, setTheme: setThemeMockFn, setUseDeviceTheme: setUseDeviceThemeMockFn}}>
                        { children }
                    </ManageThemeContext.Provider>
                </FplBaseDataContext.Provider>
            </Provider>
        )
    };

    return rtlRender(ui, {wrapper: Wrapper, createNodeMock: () => {}});
}

export * from "@testing-library/react-native";

export { reduxRender }