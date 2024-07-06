import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Heading from '../../../components/Headings/Heading';
import {Row} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/MainNavigation/MainNavigation';
import {multiThemeColor} from '../../../utils/AppConstants';
import firestore from '@react-native-firebase/firestore';
import {ProsConsType, TopicDetail} from '../../../utils/TypeExport';

interface ConsListProps {
  selectedItem: TopicDetail;
  setEmptyCheck1: (empty: boolean) => void;
}

type ArgumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Argument'
>;

const ConsList: React.FC<ConsListProps> = ({selectedItem, setEmptyCheck1}) => {
  const navigation = useNavigation<ArgumentNavigationProp>();
  const [consList, setConsList] = useState<ProsConsType[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ProConsDetail')
      .doc('ProsConsList')
      .collection('Cons')
      .onSnapshot(
        querySnapshot => {
          const list = querySnapshot.docs.map(documentSnapshot => {
            const data = documentSnapshot.data();
            return {
              id: documentSnapshot.id,
              description: data.description || 'No description',
              importance: data.importance || 0,
              type: data.type || 'Unknown',
              TopicName: data.TopicName || 'Unknown Topic',
              TopicId: data.TopicId || 'Unknown ID',
            } as ProsConsType;
          });

          setConsList(list);
        },
        error => {
          console.error('Error fetching data: ', error);
        },
      );

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const filteredConsList = consList.filter(
    item => selectedItem.id === item.TopicId,
  );

  useEffect(() => {
    setEmptyCheck1(filteredConsList.length === 0);
  }, [filteredConsList, setEmptyCheck1]);

  const handleConsDetails = (item: ProsConsType) => {
    navigation.navigate('Argument', {
      selectedItem: item,
      mode: 'update',
    });
  };

  return (
    <View style={{width: '70%', padding: 5, borderRadius: 5}}>
      {filteredConsList.map(item => (
        <TouchableOpacity onPress={() => handleConsDetails(item)} key={item.id}>
          <Row
            justifyItems="center"
            alignItems="center"
            space={2}
            style={styles.row}>
            <View
              style={[
                styles.circle,
                {backgroundColor: multiThemeColor().PROS_COLOR},
              ]}>
              <Heading
                text={item.importance.toString()}
                color="white"
                fontSize={15}
              />
            </View>
            <Heading text={item.description} fontSize={14} />
          </Row>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 7,
    margin: 5,
    borderRadius: 5,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConsList;
