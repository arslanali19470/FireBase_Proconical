import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {Row} from 'native-base';
import {MaterialIcons, multiThemeColor} from '../../utils/AppConstants';
import Heading from '../../components/Headings/Heading';
import SubHeading from '../../components/SubHeading/SubHeading';
import Space from '../../components/spacer/Space';
import {TopicDetail} from '../../utils/TypeExport';
import {handleDelete, handleRestore} from '../../FireBase/FireBaseFunctions';

interface ListItemProps {
  item: TopicDetail;
  handlePress: (itemId: string) => void;
  handleLongPress: (itemId: string) => void;
  handleSwipeableOpen: (itemId: string) => void;
  currentSwipeable: string | null;
  swipeableRefs: React.MutableRefObject<{[key: string]: Swipeable | null}>;
  selectedItems: string[];
  LeftSwipShow: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  handlePress,
  handleLongPress,
  handleSwipeableOpen,
  swipeableRefs,
  selectedItems,
  currentSwipeable,
  LeftSwipShow,
}) => {
  const isSelected = selectedItems.includes(item.id);
  const IconColor = multiThemeColor().textcolor;
  const backgroundColor = isSelected
    ? 'lightgray'
    : multiThemeColor().main_background;

  const HandleRightSwip = (itemId: string) => {
    swipeableRefs.current[itemId]?.close();
    handleDelete(itemId);
  };

  const HandleLeftSwip = (itemId: string) => {
    swipeableRefs.current[itemId]?.close();
    handleRestore(itemId);
  };

  const RightSwip = (itemId: string) => (
    <TouchableOpacity
      style={styles.swipeButton}
      onPress={() => HandleRightSwip(itemId)}>
      <MaterialIcons name={'delete'} color={IconColor} size={32} />
    </TouchableOpacity>
  );

  const LeftSwip = (itemId: string) =>
    LeftSwipShow && (
      <TouchableOpacity
        style={styles.swipeButton}
        onPress={() => HandleLeftSwip(itemId)}>
        <MaterialIcons name={'delete-forever'} color={IconColor} size={32} />
      </TouchableOpacity>
    );

  useEffect(() => {
    // This effect is not needed as the logic is now handled in the parent component
  }, [currentSwipeable]);

  return (
    <Swipeable
      ref={ref => (swipeableRefs.current[item.id] = ref)}
      renderRightActions={() => RightSwip(item.id)}
      renderLeftActions={() => LeftSwip(item.id)}
      onSwipeableWillOpen={() => handleSwipeableOpen(item.id)}>
      <View>
        <TouchableOpacity
          onPress={() => handlePress(item.id)}
          onLongPress={() => handleLongPress(item.id)}
          style={[styles.row, {backgroundColor}]}>
          <Row
            style={styles.rowContent}
            space={4}
            alignItems={'center'}
            width={'95%'}
            alignSelf={'center'}>
            <View
              style={[
                styles.circle,
                {backgroundColor: multiThemeColor().CONS_COLOR},
                isSelected && styles.selectedCircle,
              ]}>
              <Heading
                text={isSelected ? '\u2713' : item.TopicName.charAt(0)}
                textAlign={'center'}
                color={'white'}
              />
            </View>
            <View>
              <Heading text={item.TopicName} />
              <Row space={3}>
                <SubHeading text={item.Time} />
                <SubHeading text={item.Date} />
              </Row>
            </View>
          </Row>
        </TouchableOpacity>
        <Space height={10} />
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  swipeButton: {
    width: 40,
    height: 60,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowContent: {
    padding: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    backgroundColor: 'red',
  },
  selectedItem: {
    backgroundColor: 'lightgray',
  },
});

export default ListItem;
