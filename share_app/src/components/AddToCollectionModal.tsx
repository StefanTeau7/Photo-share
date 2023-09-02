import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';

interface AddToCollectionModalProps {
  isVisible: boolean;
  collections: string[];
  onCollectionSelect: (collectionName: string) => void;
  onClose: () => void;
}

const AddToCollectionModal: React.FC<AddToCollectionModalProps> = ({
  isVisible,
  collections,
  onCollectionSelect,
  onClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Select a Collection</Text>
          {collections.map((name, index) => (
            <TouchableOpacity
              key={index}
              style={styles.collectionOption}
              onPress={() => onCollectionSelect(name)}>
              <Text>{name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={{...styles.button, marginTop: 10}}
            onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddToCollectionModal;
