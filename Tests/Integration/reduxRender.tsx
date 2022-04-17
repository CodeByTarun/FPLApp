import React, { FunctionComponent, ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react-native";
import { Provider } from "react-redux";
import store from "../../App/Store/store";

const render = (ui: ReactElement, renderOptions?: RenderOptions) => {
    const Wrapper: FunctionComponent = ({ children }) => {
        return (
            <Provider store={store}>{ children }</Provider>
        )
    };

    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
}

export * from "@testing-library/react-native";

export { render }