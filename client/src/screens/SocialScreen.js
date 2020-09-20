import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Screen from '../components/Screen';
import ActivityIndicator from '../components/ActivityIndicator';
import { PostCard } from '../components/lists';
import Text from '../components/Text';
import Button from '../components/Button';
import colors from '../config/colors';
import postsApi from '../api/posts';
import useApi from '../hooks/useApi';

function SocialScreen(props) {
  const { data: posts, error, loading, request: loadPosts } = useApi(
    postsApi.getPosts,
    'posts'
  );

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && (
        <View>
          <Text>Couldn't retrieve the posts.</Text>
          <Button title='Retry' onPress={loadPosts} width='60%' />
        </View>
      )}
      <ActivityIndicator visible={loading} />
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            dogname={item.dogId} // change later to name
            profileImageUrl={item.postImageUrl} // change later to profileImageUrl
            postImageUrl={item.postImageUrl}
            body={item.body}
            createdAt={item.createdAt}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.palegrey,
  },
});

export default SocialScreen;
