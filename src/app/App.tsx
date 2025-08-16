import React from 'react';
import { StatusBar } from 'react-native';
import { PeopleScreen } from './screens/PeopleScreen';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <PeopleScreen />
    </>
  );
}