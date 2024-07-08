// utils/handleDelete.ts

import firestore from '@react-native-firebase/firestore';
import {Alert, ToastAndroid} from 'react-native';
import {ProsConsType, TopicDetail} from '../utils/TypeExport';

// =======================================================================
// Handle Delete
// =======================================================================

export const handleDelete = async (itemId: string): Promise<void> => {
  try {
    const topicsDocRef = firestore().collection('TopicDetails').doc('topics');
    const trashDocRef = firestore().collection('TopicDetails').doc('trash');

    const topicsDoc = await topicsDocRef.get();
    const trashDoc = await trashDocRef.get();

    let itemInTopics = false;

    if (topicsDoc.exists) {
      const data = topicsDoc.data() as {topics: TopicDetail[]} | undefined;

      if (data) {
        const topics = data.topics || [];
        const itemToDelete = topics.find(item => item.id === itemId);

        if (itemToDelete) {
          itemInTopics = true;
          // Remove the item from the topics array
          const updatedTopics = topics.filter(item => item.id !== itemId);

          // Update the topics document
          await topicsDocRef.update({
            topics: updatedTopics,
          });

          // Add the item to the trash document
          await trashDocRef.set(
            {
              trash: firestore.FieldValue.arrayUnion(itemToDelete),
            },
            {merge: true},
          );

          // Alert.alert('Success', 'Item moved to trash');
          ToastAndroid.showWithGravityAndOffset(
            'Item moved to trash!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      }
    }

    if (!itemInTopics) {
      if (trashDoc.exists) {
        const trashData = trashDoc.data() as {trash: TopicDetail[]} | undefined;

        if (trashData) {
          const trashItems = trashData.trash || [];
          const itemInTrash = trashItems.find(item => item.id === itemId);

          if (itemInTrash) {
            // Permanently delete the item from the trash array
            const updatedTrash = trashItems.filter(item => item.id !== itemId);

            // Update the trash document
            await trashDocRef.update({
              trash: updatedTrash,
            });

            // Alert.alert('Success', 'Item permanently deleted');
            ToastAndroid.showWithGravityAndOffset(
              'Item permanently deleted!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          } else {
            // Alert.alert('Error', 'Item not found in trash');
            ToastAndroid.showWithGravityAndOffset(
              'Item not found in trash!',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          }
        } else {
          // Alert.alert('Error', 'No trash data found');
          ToastAndroid.showWithGravityAndOffset(
            'No trash data found!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      } else {
        // Alert.alert('Error', 'Trash document does not exist');
        ToastAndroid.showWithGravityAndOffset(
          'Trash document does not exist!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    }
  } catch (error) {
    // Alert.alert('Error', 'Failed to delete data');
    ToastAndroid.showWithGravityAndOffset(
      'Failed to delete data!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    console.error('Firestore Error: ', error);
  }
};

// =======================================================================
// fetchTrashItems
// =======================================================================

export const fetchTrashItems = async (): Promise<TopicDetail[]> => {
  try {
    const trashDocRef = firestore().collection('TopicDetails').doc('trash');
    const trashDoc = await trashDocRef.get();

    if (trashDoc.exists) {
      const data = trashDoc.data() as {trash: TopicDetail[]} | undefined;
      return data ? data.trash || [] : [];
    } else {
      console.log('No trash document found');
      return [];
    }
  } catch (error) {
    console.error('Firestore Error: ', error);
    return [];
  }
};
// =======================================================================
// handleRestore
// =======================================================================

export const handleRestore = async (itemId: string): Promise<void> => {
  try {
    const topicsDocRef = firestore().collection('TopicDetails').doc('topics');
    const trashDocRef = firestore().collection('TopicDetails').doc('trash');

    const trashDoc = await trashDocRef.get();

    if (trashDoc.exists) {
      const data = trashDoc.data() as {trash: TopicDetail[]} | undefined;

      if (data) {
        const trash = data.trash || [];
        const itemToRestore = trash.find(item => item.id === itemId);

        if (itemToRestore) {
          // Remove the item from the trash array
          const updatedTrash = trash.filter(item => item.id !== itemId);

          // Update the trash document
          await trashDocRef.update({
            trash: updatedTrash,
          });

          // Add the item to the topics document
          await topicsDocRef.set(
            {
              topics: firestore.FieldValue.arrayUnion(itemToRestore),
            },
            {merge: true},
          );

          // Alert.alert('Success', 'Item restored to topics');
          ToastAndroid.showWithGravityAndOffset(
            'Item restored to topics!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else {
          // Alert.alert('Error', 'Item not found in trash');
          ToastAndroid.showWithGravityAndOffset(
            'Item not found in trash!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      } else {
        // Alert.alert('Error', 'No trash data found');
        ToastAndroid.showWithGravityAndOffset(
          'No trash data found!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } else {
      // Alert.alert('Error', 'Trash document does not exist');
      ToastAndroid.showWithGravityAndOffset(
        'Trash document does not exist!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  } catch (error) {
    // Alert.alert('Error', 'Failed to restore data');
    ToastAndroid.showWithGravityAndOffset(
      'Failed to restore data!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    console.error('Firestore Error: ', error);
  }
};
// =======================================================================
// ProsCons
// =======================================================================

export const AddProsConsListFireBase = async (newItem: ProsConsType) => {
  try {
    const collectionName = newItem.type === 'Pros' ? 'Pros' : 'Cons';
    await firestore()
      .collection('ProConsDetail')
      .doc('ProsConsList')
      .collection(collectionName)
      .add(newItem);

    console.log('Item added successfully');
  } catch (error) {
    console.error('Error adding item: ', error);
  }
};
