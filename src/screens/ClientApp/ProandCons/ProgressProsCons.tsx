import React, {useState} from 'react';
import {View, Text, Share, StyleSheet} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import {multiThemeColor} from '../../../utils/AppConstants';

// import { CONS_COLOR, PROS_COLOR } from '../../../styles/Colors';

const ProgressProsCons = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [progress, setProgress] = useState(0.5);

  const width = 320;
  const height = 50;

  const filledPercentage = Math.round(progress * 100);
  const emptyPercentage = 100 - filledPercentage;

  const filledTextPosition = (progress * width) / 2;
  const emptyTextPosition = width - ((emptyPercentage / 100) * width) / 2;
  return (
    <View>
      <View style={{width, height, alignSelf: 'center', position: 'relative'}}>
        <Progress.Bar
          progress={progress}
          width={width}
          height={height}
          unfilledColor={multiThemeColor().PROS_COLOR}
          color={multiThemeColor().CONS_COLOR}
          borderWidth={0}
        />
        <Text style={[styles.progressText, {left: filledTextPosition - 25}]}>
          +{`${filledPercentage}.0 %`}
        </Text>
        <Text style={[styles.progressText, {left: emptyTextPosition - 25}]}>
          +{`${emptyPercentage}.0 %`}
        </Text>
      </View>
    </View>
  );
};

export default ProgressProsCons;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    padding: 10,
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 100,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -25,
    borderWidth: 2,
    borderColor: 'black',
  },
  progressText: {
    position: 'absolute',
    top: '40%',
    transform: [{translateY: -8}],
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
