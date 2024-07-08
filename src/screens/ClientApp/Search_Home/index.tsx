import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Row} from 'native-base';
import {
  Ionicons,
  MaterialIcons,
  multiThemeColor,
} from '../../../utils/AppConstants';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import FormattedList from '../../../CustomComponents/FormattedList';
import firestore from '@react-native-firebase/firestore';
import {TopicDetail} from '../../../utils/TypeExport';
import {DrawerParamList} from '../../../navigation/Drawer_Navigation/DrawerNavigation';

const SearchHome = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<TopicDetail[]>([]);
  const [topics, setTopics] = useState<TopicDetail[]>([]);
  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [resetSelection, setResetSelection] = useState(false);

  const route = useRoute<RouteProp<DrawerParamList, 'SearchHome'>>();
  const {UserID} = route.params;

  useEffect(() => {
    const fetchTopics = async () => {
      const doc = await firestore()
        .collection('TopicDetails')
        .doc('topics')
        .get();

      if (doc.exists) {
        const data = doc.data();
        const filteredTopics = (data?.topics || []).filter(
          (topic: TopicDetail) => topic.UserID === UserID,
        );
        setTopics(filteredTopics);
      } else {
        console.log('No such document!');
      }
    };

    fetchTopics();
  }, [UserID]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredItems([]);
    } else {
      setFilteredItems(
        topics.filter(item =>
          item.TopicName.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }
  }, [searchQuery, topics]);

  return (
    <View style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
      <Row
        style={{backgroundColor: multiThemeColor().GRAY, padding: 10}}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-backspace" color="white" size={25} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Search ..."
          placeholderTextColor={'gray'}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </Row>
      <FormattedList
        TopicList={filteredItems}
        arrayName="filteredItems"
        setSelectedCount={setSelectedItemCount}
        setSelectedItems={setSelectedItems}
        resetSelection={resetSelection}
        setResetSelection={setResetSelection}
        LeftSwipShow={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '90%',
    fontSize: 18,
    color: 'white',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
});

export default SearchHome;
