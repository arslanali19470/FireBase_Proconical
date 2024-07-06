/* eslint-disable import/prefer-default-export */
import { useNavigation } from '@react-navigation/native';

export const useStackNavigator = () => {
    const navigation = useNavigation();

    const navigate = (screenName, params) => {
        navigation.navigate(screenName, params);
    };

    const goBack = () => {
        navigation.goBack();
    };

    const replaceScreen = (screenName, params) => {
        navigation.replace(screenName, params);
    };

    return {
        navigate,
        goBack,
        replaceScreen,
    };
};
