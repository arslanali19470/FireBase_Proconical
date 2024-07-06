import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Share, StyleSheet, Text} from 'react-native';
import {Button, Row} from 'native-base';
import {
  useNavigation,
  NavigationProp,
  useIsFocused,
} from '@react-navigation/native';
import {
  MaterialIcons,
  Modal,
  multiThemeColor,
} from '../../../utils/AppConstants';
import Heading from '../../../components/Headings/Heading';
import Space from '../../../components/spacer/Space';
import Gradiant_Button from '../../../components/Gradiant_Button/Gradiant_Button';
import {ModelHandler} from './ModelHandler';
import firestore from '@react-native-firebase/firestore';
import {TopicDetail} from '../../../utils/TypeExport';
import {handleDelete} from '../../../FireBase/FireBaseFunctions';

interface HeadProsConsProps {
  selectedItem: TopicDetail;
}

const Head_ProsCons: React.FC<HeadProsConsProps> = ({selectedItem}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMoreVisible, setMoreVisible] = useState(false);
  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const [topicName, setTopicName] = useState(selectedItem.TopicName);

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUpdatedTopic = async () => {
      try {
        const docRef = firestore().collection('TopicDetails').doc('topics');
        const doc = await docRef.get();
        if (doc.exists) {
          const topics = doc.data()?.topics || [];
          const updatedItem = topics.find(
            (topic: TopicDetail) => topic.id === selectedItem.id,
          );
          if (updatedItem) {
            setTopicName(updatedItem.TopicName);
          }
        }
      } catch (error) {
        console.error('Firestore Error: ', error);
      }
    };

    if (isFocused) {
      fetchUpdatedTopic();
    }
  }, [isFocused, selectedItem.id]);

  const handleShare = async () => {
    setMoreVisible(false);
    try {
      await Share.share({
        title: 'Here is My Pros and Cons',
        message: 'I have Good Habits and want to improve more',
        url: 'https://google.com',
      });
    } catch (error) {
      console.error('Error sharing the content:', (error as Error).message);
    } finally {
      setMoreVisible(false);
    }
  };

  const handleDeleteFunction = (item: string) => {
    handleDelete(item);
    navigation.goBack();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <View style={[styles.header, {backgroundColor: multiThemeColor().GRAY}]}>
        <Space height={15} />
        <Row
          justifyContent="space-between"
          alignItems="center"
          alignContent="center">
          <Row space={7}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="keyboard-backspace"
                color="white"
                size={25}
                style={{marginTop: 3}}
              />
            </TouchableOpacity>
            <Heading text="Dilemma" color="white" fontSize={20} />
          </Row>
          <Row space={5}>
            <TouchableOpacity onPress={toggleModal}>
              <MaterialIcons name="tune" color="white" size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="visibility-off" color="white" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMoreVisible(!isMoreVisible)}>
              <MaterialIcons name="more-vert" color="white" size={25} />
            </TouchableOpacity>
          </Row>
        </Row>
        <Space height={20} />
        <Text style={{color: 'white', padding: 5, fontSize: 18}}>
          {topicName}
        </Text>
        <Space height={20} />
        <TouchableOpacity
          style={[
            styles.editButton,
            {backgroundColor: multiThemeColor().OnlyWHITE},
          ]}
          onPress={() =>
            navigation.navigate('Dilemmas Description', {selectedItem})
          }>
          <MaterialIcons
            name="mode-edit"
            color={multiThemeColor().GRAY}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <Space height={60} />
      <ModelHandler isModalVisible={isModalVisible} toggleModal={toggleModal} />
      <Modal
        isVisible={isMoreVisible}
        onBackdropPress={() => setMoreVisible(false)}
        style={{margin: 0}}>
        <View
          style={[
            styles.modalContent,
            {backgroundColor: multiThemeColor().main_background},
          ]}>
          <TouchableOpacity onPress={handleShare}>
            <Heading text="Share" />
          </TouchableOpacity>
          <Space height={20} />
          <TouchableOpacity
            onPress={() => handleDeleteFunction(selectedItem.id)}>
            <Heading text="Delete" />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isDeleteVisible}>
        <View style={styles.modal}>
          <Heading
            text="Move this Dilemma to Trash ?"
            textAlign="center"
            weight={600}
          />
          <Space height={40} />
          <Row
            width="90%"
            justifyContent="space-between"
            alignItems="center"
            alignContent="center"
            alignSelf="center">
            <Button
              size="sm"
              width={110}
              alignSelf="flex-end"
              variant="outline"
              borderColor="blue.400"
              onPress={() => setDeleteVisible(false)}>
              CANCEL
            </Button>
            <Gradiant_Button
              title={'OK'}
              color={'white'}
              alignSelf="flex-end"
              // onPress={handleDelete}
            />
          </Row>
        </View>
      </Modal>
    </>
  );
};

export default Head_ProsCons;

const styles = StyleSheet.create({
  header: {
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
  },
  modalContent: {
    height: 120,
    width: 200,
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 20,
    borderRadius: 5,
  },
  modal: {
    padding: 20,
    borderRadius: 10,
  },
});
