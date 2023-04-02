import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import styles from './Home.style';
import fetchDietPrograms from '../../../utils/FetchDietPrograms';
import DietPlans from '../../../components/cards/DietPlansCard/DietPlansCard';
import CalculateUserInfo from '../../../utils/CalculateUserInfo';

const Home = ({navigation}) => {
  const [dietPrograms, setDietPrograms] = useState([]);
  const [user, setUser] = useState();
  const [recommendedDiet, setRecommendedDiet] = useState('');

  useEffect(() => {
    const userId = auth().currentUser.uid;
    const dbRef = database().ref(`/users/${userId}`);
    dbRef.once('value').then(snapshot => {
      setUser(snapshot.val());
    });
  }, []);

  useEffect(() => {
    const getDietPrograms = async () => {
      const data = await fetchDietPrograms();
      if (data.length > 0) {
        setDietPrograms(data);
      } else {
        setDietPrograms([]);
      }
    };
    getDietPrograms();
  }, []);

  useEffect(() => {
    if (user && user.userInfo) {
      const {bmi, maintenanceCalories, fatLossCalories} =
        CalculateUserInfo.calculateInfo({
          height: user.userInfo.height,
          weight: user.userInfo.weight,
          age: user.userInfo.age,
          activityLevel: user.userInfo.activity
            ? user.userInfo.activity.label
            : undefined,
        });

      const diet = CalculateUserInfo.suggestDiet({
        bmi,
        maintenanceCalories,
        fatLossCalories,
      });

      setRecommendedDiet(diet);
    }
  }, [user]);

  const renderDietPlans = ({item}) => (
    <DietPlans program={item} key={item.foodId} navigation={navigation} />
  );

  function handleCreate() {
    navigation.navigate('CreateDietProgram');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Home</Text>
      </View>
      <Text>Hello</Text>
      <Button title="Create" onPress={handleCreate} />
      <Text style={styles.plans_title}>Diet Plans</Text>
      <FlatList
        data={dietPrograms}
        renderItem={renderDietPlans}
        keyExtractor={item => item.foodId.toString()}
        numColumns={2}
      />
      <View style={{flex: 1, marginTop: -250}}>
        <Text>Recommended Diet Program</Text>
        <Text style={styles.recommended_diet}>{recommendedDiet}</Text>
      </View>
    </View>
  );
};

export default Home;
