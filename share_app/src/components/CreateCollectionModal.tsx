import React from 'react';
import {View, Modal, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from '../styles/styles';

interface CreateCollectionModalProps {
  isVisible: boolean;
  onSave: (collectionName: string) => void;
  onClose: () => void;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  isVisible,
  onSave,
  onClose,
}) => {
  const [newCollectionName, setNewCollectionName] = React.useState<string>('');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Collection Name</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter Collection Name"
            onChangeText={setNewCollectionName}
            value={newCollectionName}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              onSave(newCollectionName);
              setNewCollectionName('');
            }}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
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

export default CreateCollectionModal;
