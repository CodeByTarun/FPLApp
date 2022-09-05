import React from "react";
import { render, fireEvent } from "../reduxRender";
import AdditionalInfoCard from "../../../App/Features/LineupView/Lineup/AdditionalInfoCard";
import { StyleSheet } from "react-native";
import { textPrimaryColor, lightColor, defaultTheme, darkTheme } from "../../../App/Global/GlobalConstants";

const viewIndexScenes = ["Lineup", "More Info", "Points", "Fixtures"];

test('info card is pressable and shows correct ui on press', () => {

    let viewIndex = 0;
    const mockSetViewIndexFn = jest.fn(index => viewIndex = (viewIndex + 1 < viewIndexScenes.length) ? viewIndex + 1 : 0);

    const { getByTestId, getAllByTestId, getByText, rerender } = render(<AdditionalInfoCard viewIndex={viewIndex} setViewIndex={mockSetViewIndexFn} viewIndexScenes={viewIndexScenes}/>);

    expect(getByTestId('additionalInfoCardButton')).toBeEnabled();
    expect(getByText(viewIndexScenes[0])).toBeTruthy();
    expect(getAllByTestId('additionalInfoCardDots')[0]).toHaveStyle({backgroundColor: textPrimaryColor});
    expect(getAllByTestId('additionalInfoCardDots')[1]).toHaveStyle({backgroundColor: defaultTheme.colors.border});

    fireEvent.press(getByTestId('additionalInfoCardButton'));

    expect(mockSetViewIndexFn).toBeCalledTimes(1);
    expect(mockSetViewIndexFn).toHaveBeenCalledWith(1);

    rerender(<AdditionalInfoCard viewIndex={viewIndex} setViewIndex={mockSetViewIndexFn} viewIndexScenes={viewIndexScenes}/>);

    expect(getByText(viewIndexScenes[1])).toBeTruthy();
    expect(getAllByTestId('additionalInfoCardDots')[0]).toHaveStyle({backgroundColor: defaultTheme.colors.border});
    expect(getAllByTestId('additionalInfoCardDots')[1]).toHaveStyle({backgroundColor: textPrimaryColor});

    fireEvent.press(getByTestId('additionalInfoCardButton'));

    expect(mockSetViewIndexFn).toBeCalledTimes(2);
    expect(mockSetViewIndexFn).toHaveBeenCalledWith(2);

    rerender(<AdditionalInfoCard viewIndex={viewIndex} setViewIndex={mockSetViewIndexFn} viewIndexScenes={viewIndexScenes}/>);

    expect(getByText(viewIndexScenes[2])).toBeTruthy();
    expect(getAllByTestId('additionalInfoCardDots')[1]).toHaveStyle({backgroundColor: defaultTheme.colors.border});
    expect(getAllByTestId('additionalInfoCardDots')[2]).toHaveStyle({backgroundColor: textPrimaryColor});

    fireEvent.press(getByTestId('additionalInfoCardButton'));

    expect(mockSetViewIndexFn).toBeCalledTimes(3);
    expect(mockSetViewIndexFn).toHaveBeenCalledWith(3);

    rerender(<AdditionalInfoCard viewIndex={viewIndex} setViewIndex={mockSetViewIndexFn} viewIndexScenes={viewIndexScenes}/>);

    expect(getByText(viewIndexScenes[3])).toBeTruthy();
    expect(getAllByTestId('additionalInfoCardDots')[2]).toHaveStyle({backgroundColor: defaultTheme.colors.border});
    expect(getAllByTestId('additionalInfoCardDots')[3]).toHaveStyle({backgroundColor: textPrimaryColor});

    fireEvent.press(getByTestId('additionalInfoCardButton'));

    expect(mockSetViewIndexFn).toBeCalledTimes(4);
    expect(mockSetViewIndexFn).toHaveBeenCalledWith(0);

    rerender(<AdditionalInfoCard viewIndex={viewIndex} setViewIndex={mockSetViewIndexFn} viewIndexScenes={viewIndexScenes}/>);

    expect(getByText(viewIndexScenes[0])).toBeTruthy();
    expect(getAllByTestId('additionalInfoCardDots')[0]).toHaveStyle({backgroundColor: textPrimaryColor});
    expect(getAllByTestId('additionalInfoCardDots')[1]).toHaveStyle({backgroundColor: defaultTheme.colors.border});
});
