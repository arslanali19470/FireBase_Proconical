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

interface ProsListProps {
  selectedItem: TopicDetail;
  setEmptyCheck: (empty: boolean) => void;
}

type ArgumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Argument'
>;

const ProsList: React.FC<ProsListProps> = ({selectedItem, setEmptyCheck}) => {
  const navigation = useNavigation<ArgumentNavigationProp>();
  const [prosList, setProsList] = useState<ProsConsType[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ProConsDetail')
      .doc('ProsConsList')
      .collection('Pros')
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

          setProsList(list);
        },
        error => {
          console.error('Error fetching data: ', error);
        },
      );

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const handleProsDetails = (item: ProsConsType) => {
    navigation.navigate('Argument', {
      selectedItem: item,
      mode: 'update',
    });
  };

  const filteredProsList = prosList.filter(
    item => selectedItem.id === item.TopicId,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmptyCheck(filteredProsList.length === 0);
    }, 1000);

    return () => clearTimeout(timer);
  }, [filteredProsList, setEmptyCheck]);

  return (
    <View style={{width: '65%', padding: 5, borderRadius: 5}}>
      {filteredProsList.map(item => (
        <TouchableOpacity onPress={() => handleProsDetails(item)} key={item.id}>
          <Row
            justifyItems="center"
            alignItems="center"
            space={2}
            style={styles.row}>
            <View
              style={[
                styles.circle,
                {backgroundColor: multiThemeColor().CONS_COLOR},
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

export default ProsList;
