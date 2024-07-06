import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import FormattedList from '../../../CustomComponents/FormattedList';
import {useNavigation} from '@react-navigation/native';
import {MaterialIcons, multiThemeColor} from '../../../utils/AppConstants';
import {Row} from 'native-base';
import Heading from '../../../components/Headings/Heading';
import {DrawerActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {TopicDetail} from '../../../utils/TypeExport';

const Trash: React.FC = () => {
  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [resetSelection, setResetSelection] = useState(false);
  const [trashItems, setTrashItems] = useState<TopicDetail[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('TopicDetails')
      .doc('trash')
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data()?.trash || [];
          setTrashItems(data);
        } else {
          setTrashItems([]);
        }
      });

    return () => unsubscribe();
  }, []);

  const restoreItem = async (itemId: string) => {
    try {
      await firestore()
        .collection('TopicDetails')
        .doc('trash')
        .update({
          trash: firestore.FieldValue.arrayRemove({id: itemId}),
        });

      const restoredItem = trashItems.find(item => item.id === itemId);
      if (restoredItem) {
        await firestore()
          .collection('TopicDetails')
          .doc('topics')
          .update({
            topics: firestore.FieldValue.arrayUnion(restoredItem),
          });
      }
    } catch (error) {
      console.error('Error restoring item: ', error);
    }
  };

  return (
    <View style={{backgroundColor: multiThemeColor().main_background, flex: 1}}>
      <View style={{backgroundColor: multiThemeColor().GRAY, padding: 15}}>
        <Row space={7} alignItems={'center'}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{marginTop: 3}}>
            <MaterialIcons name={'menu'} color={'white'} size={25} />
          </TouchableOpacity>
          <Heading text={'Trash'} weight={700} fontSize={20} color={'white'} />
        </Row>
      </View>
      <ScrollView style={styles.container}>
        <FormattedList
          TopicList={trashItems}
          arrayName="removedItems"
          setSelectedCount={setSelectedItemCount}
          setSelectedItems={setSelectedItems}
          resetSelection={resetSelection}
          setResetSelection={setResetSelection}
          // restoreItem={restoreItem}
          LeftSwipShow={true}
        />
      </ScrollView>
    </View>
  );
};

export default Trash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
