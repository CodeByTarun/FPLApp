import { Theme, useTheme } from "@react-navigation/native";
import { animated, useSpring } from "@react-spring/native";
import Checkbox from "expo-checkbox";
import React, { useContext, useEffect, useState } from "react";
import { Appearance, Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { ManageThemeContext } from "../../AppContext";
import { ModalWrapper } from "../../Features/Controls";
import { cornerRadius, fieldColor, height, largeFont, mediumFont, width } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { getThemeData, setThemeData } from "../../Helpers/FplDataStorageService";

const AnimatedView = animated(View);

const SettingsModal = () => {

    const themeData = useTheme();
    const styles = SettingsModalStyle(themeData);

    const {theme, setTheme, useDeviceTheme, setUseDeviceTheme} = useContext(ManageThemeContext);

    const [view, setView] = useState(1);

    const sliderSping = useSpring({ left: view === 1 ? '0%' : '50%' });

    return (
        <ModalWrapper modalWidth={moderateScale(width * 0.65, -0.2)} modalHeight={moderateVerticalScale(height * 0.3, -0.6)}>
            <Text style={styles.titleText}>Settings</Text>
            <Pressable style={styles.sliderContainer} onPress={(() => setView(view === 1 ? 2 : 1))}>
                <AnimatedView style={[styles.slider, globalStyles.shadow, {left: sliderSping.left}]}/>
                <View style={styles.sliderPartContainer}>
                    <Text style={styles.sliderText}>Theme</Text>
                </View>
                <View style={styles.sliderPartContainer}>
                    <Text style={styles.sliderText}>Info</Text>
                </View>
            </Pressable>
            <View style={styles.viewContainer}>
                { view === 1 &&
                    <>
                        <View style={styles.checkBoxContainer}>
                            <Text style={styles.checkBoxText}>Dark Mode:</Text>
                            <Checkbox value={ theme === 'dark' } hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                                      color={theme === 'dark' ? fieldColor : themeData.colors.background}
                                      onValueChange={() => setTheme((theme === 'dark') ? 'light' : 'dark')}/>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <Text style={styles.checkBoxText}>Use Devices Theme:</Text>
                            <Checkbox value={ useDeviceTheme } hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                                      color={useDeviceTheme ? fieldColor : themeData.colors.background}
                                      onValueChange={() => setUseDeviceTheme(!useDeviceTheme)}/>
                        </View>
                    </>
                }
                { view === 2 &&
                    <>
                        <Text style={styles.text}>All data taken from the Fantasy Premier League API</Text>
                        <Text style={styles.text}>Icons from https://www.flaticon.com/free-icons/soccer</Text>
                    </>
                }
            </View>

        </ModalWrapper>
    )
}

export default SettingsModal;

const SettingsModalStyle = (theme: Theme) => StyleSheet.create({

    titleText: {
        color: theme.colors.text,
        fontSize: largeFont,
        alignSelf: 'center',
        fontWeight: '600',
        marginTop: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(15),
    },

    text: {
        color: theme.colors.text,
        fontSize: mediumFont,
        textAlign: 'center',
        padding: moderateScale(5),
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10),
    },

    sliderContainer: {
        height: moderateVerticalScale(30, 0.2),
        width: moderateScale(125, 0.2),
        alignSelf: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: cornerRadius,
        flexDirection: 'row',
    },

    sliderPartContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },

    sliderText: {
        fontSize: mediumFont,
        textAlign: 'center',
        color: theme.colors.text,
        zIndex: 1,
    },

    slider: {
        width: '50%',
        position: 'absolute',
        backgroundColor: theme.colors.card,
        height: '100%',
        borderRadius: cornerRadius,
    },

    viewContainer: {
        marginTop: moderateVerticalScale(15),
        marginBottom: moderateVerticalScale(5),
        flex: 1,
        justifyContent: 'center',
        width: '100%'
    },

    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: moderateScale(5),
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10),
    },

    checkBoxText: {
        color: theme.colors.text,
        fontSize: mediumFont,
        flex: 1,
    }

});