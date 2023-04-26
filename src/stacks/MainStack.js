import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ListScreen from '../pages/ListScreen/index';
import EditNoteScreen from '../pages/EditNoteScreen/index';

const MainStack = createNativeStackNavigator();

export default () => {
    return(
        <MainStack.Navigator screenOptions={{
            headerStyle:{
                backgroundColor: '#222',
            },
            headerTintColor: 'white'
        }}>
            <MainStack.Screen name='List' component={ListScreen} />
            <MainStack.Screen name='EditNote' component={EditNoteScreen} />
        </MainStack.Navigator>
    );
}