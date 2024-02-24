import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Loading from './components/Loading/Loading';

import Main from './pages/AuthPages/Main/Main';
import Login from './pages/AuthPages/Login/Login';
import Register from './pages/AuthPages/Register/Register';

import UserInfo from './pages/UserInfo/UserInfo';
import EditUserInfo from './pages/UserInfo/UserInfo';
import CreateDietProgram from './pages/CreateDietProgram/CreateDietProgram';
import ProgramDetail from './pages/ProgramDetail/ProgramDetail';

import Home from './pages/BottomTabPages/Home/Home';
import MyPlan from './pages/BottomTabPages/MyPlan/MyPlan';
import Results from './pages/BottomTabPages/Results/Results';
import Profile from './pages/BottomTabPages/Profile/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthPages() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function BottomTabPages() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen name="Home" component={Home} options={HomeOptions} />
      <Tab.Screen name="MyPlan" component={MyPlan} options={MyPlanOptions} />
      <Tab.Screen name="Results" component={Results} options={ResultsOptions} />
      <Tab.Screen name="Profile" component={Profile} options={ProfileOptions} />
    </Tab.Navigator>
  );
}

const Router = () => {
  const [userSession, setUserSession] = useState();
  const [userInfo, setUserInfo] = useState(true);
  const [firstLogin, setFirstLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // It checks if the user has the first login and is logged in to make the correct redirects.
  //   auth().onAuthStateChanged(user => {
  //     setUserSession(user);
  //     if (user) {
  //       const userId = user.uid;
  //       database()
  //         .ref(`/users/${userId}/userInfo`)
  //         .once('value')
  //         .then(snapshot => {
  //           if (snapshot.exists()) {
  //             setUserInfo(true);
  //             setFirstLogin(false);
  //           }
  //           setLoading(false);
  //         })
  //         .catch(error => {
  //           showMessage({
  //             message: 'An error occured!' + error,
  //             type: 'danger',
  //             floating: true,
  //           });
  //           setLoading(false);
  //         });
  //     } else {
  //       setFirstLogin(true);
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!userSession ? (
          <Stack.Screen name="AuthPages" component={AuthPages} />
        ) : (
          !userInfo &&
          firstLogin && <Stack.Screen name="UserInfo" component={UserInfo} />
        )}
        <Stack.Screen name="BottomTabPages" component={BottomTabPages} />
        <Stack.Screen name="EditUserInfo" component={EditUserInfo} />
        <Stack.Screen name="CreateDietProgram" component={CreateDietProgram} />
        <Stack.Screen name="ProgramDetail" component={ProgramDetail} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

const tabBarOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    position: 'absolute',
    margin: 15,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 3,
  },
};

const HomeOptions = () => ({
  tabBarIcon: ({focused}) => (
    <MaterialIcon name="home" size={35} color={focused ? '#008037' : 'gray'} />
  ),
});
const MyPlanOptions = () => ({
  tabBarIcon: ({focused}) => (
    <MaterialIcon
      name="sign-direction"
      size={35}
      color={focused ? '#008037' : 'gray'}
    />
  ),
});
const ResultsOptions = () => ({
  tabBarIcon: ({focused}) => (
    <MaterialIcon
      name="finance"
      size={35}
      color={focused ? '#008037' : 'gray'}
    />
  ),
});
const ProfileOptions = () => ({
  tabBarIcon: ({focused}) => (
    <MaterialIcon
      name="account"
      size={35}
      color={focused ? '#008037' : 'gray'}
    />
  ),
});

export default Router;
