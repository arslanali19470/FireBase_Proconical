import React, {useEffect} from 'react';
import {Box} from 'native-base';
import {useStackNavigator} from '../../../utils/HandleNavigation';
import {multiThemeColor, normalized} from '../../../utils/AppConstants';
import Picture from '../../../components/Picture/Picture';
import {Text} from 'react-native';
import AnimatedContainer from '../../../utils/AnimationsContainer';
import {ProsConsImage} from '../../../assets';
// import } from '../../../styles/Colors';

const SplashScreen: React.FC = () => {
  const {replaceScreen} = useStackNavigator();

  useEffect(() => {
    const timeout = setTimeout(() => {
      replaceScreen('WelcomeScreen', {});
    }, 2000); // 2 seconds

    return () => clearTimeout(timeout);
  }, [replaceScreen]);

  return (
    <Box
      bg={multiThemeColor().main_background}
      alignItems="center"
      justifyContent="center"
      flex={1}>
      <AnimatedContainer
        delay={100}
        duration={800}
        animationType="fadeInDown"
        isVisible={true}>
        <Picture
          localSource={ProsConsImage}
          height={normalized.hp('28%')}
          width={normalized.hp('40%')}
          resizeMode="contain"
        />
      </AnimatedContainer>
    </Box>
  );
};

export default SplashScreen;
