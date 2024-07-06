import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import Space from '../../../components/spacer/Space';
import {
  LinearGradient,
  MaterialIcons,
  multiThemeColor,
} from '../../../utils/AppConstants';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../../navigation/Drawer_Navigation/DrawerNavigation';
import {
  DrawerActions,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import FormattedList from '../../../CustomComponents/FormattedList';
import {Row} from 'native-base';
import Heading from '../../../components/Headings/Heading';
import firestore from '@react-native-firebase/firestore';
import {TopicDetail} from '../../../utils/TypeExport';
import {handleDelete} from '../../../FireBase/FireBaseFunctions';
import {BackHandler} from 'react-native';

type DrawerScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'Dilemmas'
>;
type DrawerScreenRouteProp = RouteProp<DrawerParamList, 'Dilemmas'>;

export type DrawerScreenProps = {
  navigation: DrawerScreenNavigationProp;
  route: DrawerScreenRouteProp;
};

const Home_Dilemmas: React.FC<DrawerScreenProps> = ({navigation}) => {
  const [resetSelection, setResetSelection] = useState(false);
  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [topics, setTopics] = useState<TopicDetail[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('TopicDetails')
      .doc('topics')
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data();
          setTopics(data?.topics || []);
        } else {
          console.log('No such document!');
        }
      });

    return () => unsubscribe();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Deselect items when screen loses focus
      setSelectedItems([]);
      setSelectedItemCount(0);
      setResetSelection(true);
    }, []),
  );

  const deleteSelectedItems = async () => {
    try {
      for (const itemId of selectedItems) {
        await handleDelete(itemId);
      }

      setSelectedItems([]);
      setSelectedItemCount(0);
      setResetSelection(true);
    } catch (error) {
      console.error('Error deleting selected items: ', error);
      Alert.alert('Error', 'Failed to delete selected items');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
      {selectedItemCount > 0 ? (
        <View
          style={{
            backgroundColor: multiThemeColor().GRAY,
            padding: 15,
          }}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Row space={7} alignItems={'center'}>
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
                style={{marginTop: 3}}>
                <MaterialIcons
                  name={'keyboard-backspace'}
                  color={'white'}
                  size={25}
                />
              </TouchableOpacity>
              <Heading
                text={`Selected ${selectedItemCount}`}
                weight={700}
                fontSize={20}
                color={'white'}
              />
            </Row>
            <TouchableOpacity
              onPress={deleteSelectedItems}
              style={{marginTop: 3}}>
              <MaterialIcons name={'delete'} color={'white'} size={25} />
            </TouchableOpacity>
          </Row>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: multiThemeColor().GRAY,
            padding: 15,
          }}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Row space={7} alignItems={'center'}>
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
                style={{marginTop: 3}}>
                <MaterialIcons name={'menu'} color={'white'} size={25} />
              </TouchableOpacity>
              <Heading
                text={'Dilemmas'}
                weight={700}
                fontSize={20}
                color={'white'}
              />
            </Row>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchHome')}
              style={{marginTop: 3}}>
              <MaterialIcons name={'search'} color={'white'} size={25} />
            </TouchableOpacity>
          </Row>
        </View>
      )}
      <Space height={10} />
      <FormattedList
        TopicList={topics}
        arrayName="FirstArray"
        setSelectedCount={setSelectedItemCount}
        setSelectedItems={setSelectedItems}
        resetSelection={resetSelection}
        setResetSelection={setResetSelection}
        LeftSwipShow={false}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Dilemmas Description');
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#4976e8', '#26c4f5', '#4ce4fc']}
          style={styles.CircularButton}>
          <MaterialIcons name={'mode-edit'} color="white" size={32} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Home_Dilemmas;

const styles = StyleSheet.create({
  CircularButton: {
    height: 60,
    width: 60,
    borderRadius: 100,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
