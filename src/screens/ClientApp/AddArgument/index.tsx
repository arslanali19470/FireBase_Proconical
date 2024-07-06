import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Slider from '@react-native-community/slider';
import Space from '../../../components/spacer/Space';
import CircularBorder from '../../../components/CircularBorder/CircularBorder';
import Heading from '../../../components/Headings/Heading';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import GradientButton from '../../../components/Gradiant_Button/Gradiant_Button';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/MainNavigation/MainNavigation';
import {multiThemeColor} from '../../../utils/AppConstants';
// import {ArgumentType} from '../../../services/ReduxToolkit/argumentSlice';
import {ProsConsType, TopicDetail} from '../../../utils/TypeExport';
import {AddProsConsListFireBase} from '../../../FireBase/FireBaseFunctions';

type ArgumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Argument'
>;
type ArgumentRouteProp = RouteProp<RootStackParamList, 'Argument'>;

export type ArgumentScreenProps = {
  navigation: ArgumentNavigationProp;
  route: ArgumentRouteProp;
};

const AddArgument: React.FC<ArgumentScreenProps> = ({route}) => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [textInput, setTextInput] = useState('');
  const navigation = useNavigation<ArgumentNavigationProp>();

  const selectedItem: ProsConsType | undefined = route?.params?.selectedItem;
  const {mode} = route.params;
  const isUpdateMode = mode === 'update';

  useEffect(() => {
    if (selectedItem) {
      setTextInput(selectedItem.description || '');
      setSliderValue(selectedItem.importance || 0);
      setSelectedId(
        selectedItem.type === 'Pros'
          ? '1'
          : selectedItem.type === 'Cons'
          ? '2'
          : '',
      );
    }
  }, [selectedItem]);

  const handleSliderChange = (value: number) => {
    const roundedValue = Math.round(value);
    setSliderValue(roundedValue);
  };

  const handleTextInputChange = (text: string) => {
    setTextInput(text);
  };

  const handleRadioButtonChange = (id: string) => {
    setSelectedId(id);
  };
  const addProsConsList = async () => {
    if (!textInput.trim() || !selectedId) {
      console.error('Please fill all required fields');
      return;
    }

    const newItem: ProsConsType = {
      id: uuid.v4().toString(),
      description: textInput.trim(),
      importance: sliderValue,
      type: selectedId === '1' ? 'Pros' : 'Cons',
      TopicName: selectedItem?.TopicName || '',
      TopicId: selectedItem?.id || uuid.v4().toString(), // Ensure TopicId is a string
    };

    try {
      await AddProsConsListFireBase(newItem);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding item: ', error);
    }
  };

  const updateProsConsList = async () => {
    if (!selectedItem || !textInput.trim() || !selectedId) {
      console.error('Please fill all required fields');
      return;
    }

    const updatedItem: Partial<ProsConsType> = {
      description: textInput.trim(),
      importance: sliderValue,
      type: selectedId === '1' ? 'Pros' : 'Cons',
    };

    try {
      const previousCollectionName =
        selectedItem.type === 'Pros' ? 'Pros' : 'Cons';
      const newCollectionName = updatedItem.type;

      // If type has changed, delete from the previous collection and add to the new one
      if (previousCollectionName !== newCollectionName) {
        await firestore()
          .collection('ProConsDetail')
          .doc('ProsConsList')
          .collection(previousCollectionName)
          .doc(selectedItem.id as string) // Ensure selectedItem.id is a string
          .delete();

        const newItem: ProsConsType = {
          ...selectedItem,
          ...updatedItem,
          TopicId: selectedItem.TopicId || uuid.v4().toString(), // Ensure TopicId is a string
        };

        await AddProsConsListFireBase(newItem);
      } else {
        // Update within the same collection
        await firestore()
          .collection('ProConsDetail')
          .doc('ProsConsList')
          .collection(newCollectionName as string) // Ensure newCollectionName is a string
          .doc(selectedItem.id as string) // Ensure selectedItem.id is a string
          .update(updatedItem);
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error updating item: ', error);
    }
  };

  const BoderColor = multiThemeColor().textcolor;

  const radioButtons = useMemo<RadioButtonProps[]>(
    () => [
      {
        id: '1',
        label: 'Pros',
        value: 'Pros',
        borderColor: BoderColor,
        color: BoderColor,
      },
      {
        id: '2',
        label: 'Cons',
        value: 'Cons',
        borderColor: BoderColor,
        color: BoderColor,
      },
    ],
    [BoderColor],
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: multiThemeColor().main_background,
      }}>
      <View>
        <Space height={30} />
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={[
            styles.textInput,
            {
              borderColor: multiThemeColor().BLUE1,
              color: multiThemeColor().textcolor,
            },
          ]}
          placeholder="Description"
          placeholderTextColor={'gray'}
          value={textInput}
          onChangeText={handleTextInputChange}
        />
        <Space height={30} />
        <CircularBorder
          b_color={multiThemeColor().BLUE1}
          style={{alignSelf: 'center'}}>
          <Heading text={String(sliderValue)} />
        </CircularBorder>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={multiThemeColor().BLUE2}
          maximumTrackTintColor={multiThemeColor().BLUE1}
          value={sliderValue}
          onValueChange={handleSliderChange}
        />
        <Heading text={'Importance'} textAlign={'center'} />
        <Space height={20} />
        <View style={{alignSelf: 'flex-start', marginLeft: 10}}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={handleRadioButtonChange}
            selectedId={selectedId}
            labelStyle={{color: multiThemeColor().textcolor}}
          />
        </View>
      </View>
      {isUpdateMode ? (
        <GradientButton
          title={'Update'}
          color={'white'}
          alignSelf="flex-end"
          marginRight={20}
          marginBottom={20}
          width={'120%'}
          fontSize={13}
          onPress={updateProsConsList}
        />
      ) : (
        <GradientButton
          title={'SAVE'}
          color={'white'}
          alignSelf="flex-end"
          marginRight={20}
          marginBottom={20}
          width={'120%'}
          fontSize={13}
          onPress={addProsConsList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: 300,
    height: 40,
    marginTop: 20,
    alignSelf: 'center',
  },
  textInput: {
    height: 80,
    textAlignVertical: 'top',
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    fontSize: 18,
    borderRadius: 5,
    padding: 10,
  },
});

export default AddArgument;
