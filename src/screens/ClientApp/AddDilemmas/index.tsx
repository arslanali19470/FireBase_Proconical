import React, {useState} from 'react';
import {View, TextInput, Alert, Text, ToastAndroid} from 'react-native';
import {VStack} from 'native-base';
import Gradiant_Button from '../../../components/Gradiant_Button/Gradiant_Button';
import Space from '../../../components/spacer/Space';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/MainNavigation/MainNavigation';
import {multiThemeColor} from '../../../utils/AppConstants';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {TopicDetail} from '../../../utils/TypeExport';

type AddDilemmasNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dilemmas Description'
>;
type AddDilemmasRouteProp = RouteProp<
  RootStackParamList,
  'Dilemmas Description'
>;

export type AddDilemmasScreenProps = {
  navigation: AddDilemmasNavigationProp;
  route: AddDilemmasRouteProp;
};

const Add_Dilemmas: React.FC<AddDilemmasScreenProps> = ({
  route,
  navigation,
}) => {
  const {UserID} = route.params;
  const selectedItem = route?.params?.selectedItem;
  const isFocused = useIsFocused();

  const [inputValue, setInputValue] = useState<string>(
    selectedItem?.TopicName || '',
  );
  const [textHeight, setTextHeight] = useState(150);

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const currentDate = currentDateTime.toLocaleDateString('en-US', options);
    const currentTime = currentDateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
    return {ItemDate: currentDate, ItemTime: currentTime};
  };

  const handleAddItem = async (): Promise<void> => {
    const {ItemDate, ItemTime} = getCurrentDateTime();

    // Remove extra spaces
    const cleanedInputValue = inputValue.trim().replace(/\s+/g, ' ');

    if (!cleanedInputValue) {
      // Alert.alert('Error', 'Topic name cannot be empty');
      ToastAndroid.showWithGravityAndOffset(
        'Topic name cannot be empty!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }

    try {
      const topicDetail: TopicDetail = {
        id: selectedItem ? selectedItem.id : uuid.v4().toString(),
        TopicName: cleanedInputValue,
        Date: ItemDate,
        Time: ItemTime,
        UserID: UserID || '',
      };

      const docRef = firestore().collection('TopicDetails').doc('topics');
      const doc = await docRef.get();

      if (doc.exists) {
        const topics = doc.data()?.topics || [];
        const updatedTopics = selectedItem
          ? topics.map((topic: TopicDetail) =>
              topic.id === topicDetail.id ? topicDetail : topic,
            )
          : [...topics, topicDetail];

        await docRef.update({topics: updatedTopics});
      } else {
        await docRef.set({topics: [topicDetail]});
      }

      // Alert.alert('Success', 'Data has been updated successfully');
      ToastAndroid.showWithGravityAndOffset(
        'Topic Added successfully!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update data');
      console.error('Firestore Error: ', error);
    }
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
      {/* <Text style={{color: 'white'}}>{UserID}</Text> */}
      <Space height={20} />
      <VStack justifyContent="space-between" style={{flex: 1}}>
        <TextInput
          multiline
          numberOfLines={10}
          style={{
            minHeight: 150,
            maxHeight: 400,
            height: textHeight,
            textAlignVertical: 'top',
            borderWidth: 2,
            borderColor: multiThemeColor().BLUE1,
            width: '90%',
            alignSelf: 'center',
            fontSize: 18,
            borderRadius: 10,
            padding: 10,
            color: multiThemeColor().textcolor,
          }}
          placeholder="Description"
          placeholderTextColor="gray"
          value={inputValue}
          onChangeText={setInputValue}
          onContentSizeChange={event => {
            const newHeight = Math.min(
              400,
              Math.max(150, event.nativeEvent.contentSize.height),
            );
            setTextHeight(newHeight);
          }}
        />
      </VStack>

      <Gradiant_Button
        title={'Save'}
        onPress={handleAddItem}
        color={'white'}
        alignSelf="flex-end"
        marginRight={20}
        marginBottom={20}
        width={'120%'}
        fontSize={13}
      />
    </View>
  );
};

export default Add_Dilemmas;
