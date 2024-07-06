import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Row} from 'native-base';
import {MaterialIcons, multiThemeColor} from '../../../utils/AppConstants';
import Heading from '../../../components/Headings/Heading';
import Space from '../../../components/spacer/Space';
import Gradiant_Button from '../../../components/Gradiant_Button/Gradiant_Button';
import Head_ProsCons from './Head_ProsCons';
import ProgressProsCons from './ProgressProsCons';
import ProsList from './ProsList';
import ConsList from './ConsList';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/MainNavigation/MainNavigation';
import {TopicDetail} from '../../../utils/TypeExport';

type ProsConsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProandCons'
>;
type ProsConsRouteProp = RouteProp<RootStackParamList, 'ProandCons'>;

export type ProsConsScreenProps = {
  navigation: ProsConsNavigationProp;
  route: ProsConsRouteProp;
};

const ProandCons: React.FC<ProsConsScreenProps> = ({route, navigation}) => {
  const {selectedItem} = route.params;
  const [emptyCheck, setEmptyCheck] = useState<boolean>(false);
  const [emptyCheck1, setEmptyCheck1] = useState<boolean>(false);
  const isEmpty = emptyCheck && emptyCheck1;

  return (
    <View style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
      <Head_ProsCons selectedItem={selectedItem} />
      <ProgressProsCons />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        {isEmpty ? (
          <View>
            <Space height={140} />
            <MaterialIcons
              name="source"
              size={150}
              color="lightgray"
              style={{alignSelf: 'center'}}
            />
            <Heading
              text="there is no argument, yet"
              color="lightgray"
              textAlign="center"
            />
            <Space height={50} />
          </View>
        ) : (
          <View>
            <Heading text="Pros" style={{padding: 20}} />
            <Row style={styles.row}>
              <ProsList
                selectedItem={selectedItem}
                setEmptyCheck={setEmptyCheck}
              />
              <ConsList
                selectedItem={selectedItem}
                setEmptyCheck1={setEmptyCheck1}
              />
            </Row>
          </View>
        )}
        <Space height={40} />
        <Gradiant_Button
          title="ADD ARGUMENT"
          onPress={() => navigation.navigate('Argument', {selectedItem})}
          color="white"
          alignSelf="flex-end"
          marginRight={20}
          marginBottom={20}
          width="120%"
          fontSize={13}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '100%',
    padding: 5,
  },
});

export default ProandCons;
