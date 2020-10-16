import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ActivityIndicator from '../components/animations/ActivityIndicator';
import PostCard from '../components/social/PostCard';
import Text from '../components/Text';
import Button from '../components/Button';

import useApi from '../hooks/useApi';

import postsApi from '../api/posts';
import likesApi from '../api/likes';
import routes from '../navigation/routes';
import { actions } from '../redux/ducks';

function SocialScreen({ navigation }) {
  const [scrolling, setScrolling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const reloadPosts = useSelector(state => state.reloadPosts);
  const dog = useSelector(state => state.dog);

  const getLikesApi = useApi(likesApi.getLikes);

  const dispatch = useDispatch();
  
  const { data: posts, error, loading, request: loadPosts } = useApi(
    postsApi.getPosts,
    'posts'
  );
  console.log('LIKES - SOCIAL SCREEN: ', useSelector((state) => state.likes));
  useEffect(() => {
    loadPosts();
  }, [reloadPosts]);

  useEffect(() => {
    (async () => await getLikesApi.request())().then(result => {
      dispatch(actions.setLikes(result.data.likes));
    });
  }, [dog]);

  return (
    <>
      <ActivityIndicator visible={loading} backgroundColor='palegrey' />
      {error && (
        <View style={styles.error}>
          <Text>Couldn't retrieve the posts.</Text>
          <Button title='Retry' onPress={loadPosts} width='60%' />
        </View>
      )}
      {!(scrolling || loading) && (
        <View style={styles.newPostButton}>
          <Button 
            title='Participate!'
            icon='star'
            margin={0}
            onPress={() => navigation.navigate(routes.NEW_POST)}
          />
        </View>
      )}
      <FlatList
        onScrollBeginDrag={() => setScrolling(true)}
        onMomentumScrollEnd={() => setScrolling(false)}
        onRefresh={() => loadPosts()}
        refreshing={refreshing}
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            postId={item.id}
            dogname={item.dog.name}
            profileImageUrl={item.dog.profileImageUrl}
            postImageUrl={item.postImageUrl}
            body={item.body}
            createdAt={item.createdAt.toString().split(' ').slice(1, 5).join(' ')}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    top: 300,
    zIndex: 1,
  },
  newPostButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    alignSelf: 'center',
  }
});

export default SocialScreen;
