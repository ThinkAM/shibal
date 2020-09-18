import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

import Screen from '../components/Screen';
import { ListItem, ListItemSeparator } from '../components/lists';
import Icon from '../components/Icon';
import colors from '../config/colors';

const menuItems = [
  {
    title: 'GitHub',
    icon: {
      name: 'github-alt',
      backgroundColor: colors.github,
    },
  },
  {
    title: 'LinkedIn',
    icon: {
      name: 'linkedin-in',
      backgroundColor: colors.linkedin,
    },
  },
  {
    title: 'AngelList',
    icon: {
      name: 'angellist',
      backgroundColor: colors.angellist,
    },
  },
  {
    title: 'Portfolio',
    icon: {
      name: 'briefcase',
      backgroundColor: colors.mossygrey,
    },
  },
];

function SettingsScreen(props) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.listContainer}>
        <ListItem
          title='Demo User'
          subTitle='demo@user.com'
          image={require('../assets/icon.png')}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <Text style={styles.thankYouText}>
        Thank you for checking out my app!
      </Text>
      <ListItem
        title='Logout'
        IconComponent={
          <Icon
            name='sign-out-alt'
            backgroundColor={colors.white}
            iconColor={colors.greenishgrey}
          />
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.palegrey,
  },
  listContainer: {
    marginVertical: 20,
  },
  thankYouText: {
    marginLeft: 20,
    color: colors.greenishgrey,
    fontSize: 12,
  },
});

export default SettingsScreen;
