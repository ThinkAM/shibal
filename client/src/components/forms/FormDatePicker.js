import React, { useState } from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFormikContext } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../../config/defaultStyles';
import Text from '../Text';

function FormDatePicker({ name }) {
  const [date, setDate] = useState(new Date());
  const [buttonText, setButtonText] = useState('Birthday');
  const [show, setShow] = useState(false);

  const { setFieldValue } = useFormikContext();

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setFieldValue(name, date);
    setButtonText(date.toString().split(' ').slice(1, 4).join(' '));
    if (Platform.OS === 'android') {
      setShow(false);
    }
  };

  const showDatepicker = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={showDatepicker}>
        <View style={styles.container}>
          {buttonText === 'Birthday' ? (
            <Text style={styles.placeholder}>{buttonText}</Text>
          ) : (
            <Text style={styles.text}>{buttonText}</Text>
          )}
          <MaterialCommunityIcons
            name='chevron-down'
            size={20}
            color={defaultStyles.colors.mossygrey}
          />
        </View>
      </TouchableWithoutFeedback>
      {show && (
        <DateTimePicker
          value={date}
          mode='date'
          display='default'
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: defaultStyles.colors.palegrey,
    borderRadius: 50,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    width: '50%',
  },
  placeholder: {
    color: defaultStyles.colors.leafygrey,
    flex: 1,
    lineHeight: 18,
  },
  text: {
    color: defaultStyles.colors.black,
    flex: 1,
    lineHeight: 18,
  },
});

export default FormDatePicker;
