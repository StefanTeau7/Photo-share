import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCenter: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  collectionsTitle: {
    fontSize: 20,
    padding: 15,
  },
  image: {
    width: '33.33%',
    height: 120,
    aspectRatio: 1,
    borderRadius: 12,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  imageWrapper: {
    width: '33.33%',
    padding: 5,
  },
  imageSelected: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 12,
  },
  iosButtonDisabled: {
    borderColor: '#C3C3C3',
  },
  iosButtonTextDisabled: {
    color: '#C3C3C3',
  },
  primaryButton: {
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  secondaryButton: {
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: 'transparent',
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  collectionOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageBig: {
    width: 300,
    height: 300,
    margin: 5,
  },
  collectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  collectionImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  collectionName: {
    fontSize: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedImage: {
    opacity: 0.5,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    width: '100%',
    marginBottom: 5,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeMessage: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
});
