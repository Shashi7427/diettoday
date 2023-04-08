import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import colors from '../../styles/colors';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

const DatePickerModal = () => {
  const [date, setDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRepast, setSelectedRepast] = useState();

  const dropdownData = [
    {label: 'BREAKFAST', value: '1'},
    {label: 'BRUNCH', value: '2'},
    {label: 'LUNCH', value: '3'},
    {label: 'DINNER', value: '4'},
    {label: 'SUPPER', value: '5'},
    {label: 'SNACK', value: '6'},
  ];

  const onDateChange = selectedDate => {
    setDate(selectedDate);
    // setIsVisible(false);
  };

  const handleSave = () => {
    setIsVisible(false);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Text style={styles.select_text}>Select Date</Text>
      </TouchableOpacity>
      {isVisible && (
        <Modal
          isVisible={isVisible}
          style={styles.modal}
          onBackButtonPress={onClose}
          onSwipeComplete={onClose}
          onBackdropPress={onClose}>
          <DatePicker date={date} onDateChange={onDateChange} mode="datetime" />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholder_style}
            selectedTextStyle={styles.selected_text_style}
            label="Repast"
            placeholder="Select Repast"
            labelField="label"
            valueField="value"
            data={dropdownData}
            value={selectedRepast}
            onChange={item => {
              setSelectedRepast(item.label);
            }}
          />
          <View style={styles.button_icon_container}>
            <TouchableOpacity>
              <Icon name="bell" size={30} style={styles.bell_icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.save_text}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modal: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    padding: 5,
    alignSelf: 'center',
    height: 360,
    width: 350,
    bottom: 180,
    justifyContent: 'space-around',
  },
  dropdown: {
    marginHorizontal: 25,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 7,
  },
  placeholder_style: {},
  selected_text_style: {
    backgroundColor: '#eceff1',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    height: 48,
    paddingTop: 13,
    marginLeft: -7,
    marginRight: 10,
    paddingLeft: 10,
  },
  select_text: {
    fontSize: 15,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.matteblue,
    color: 'white',
  },
  button_icon_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  save_text: {
    fontSize: 15,
    borderRadius: 10,
    padding: 12,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 0,
    backgroundColor: colors.logoGreen,
    color: 'white',
  },
  bell_icon: {
    color: 'orange',
  },
});

export default DatePickerModal;
