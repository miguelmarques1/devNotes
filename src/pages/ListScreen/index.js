import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import NoteItem from "../../components/NoteItem";

const App = (props) => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Suas notas',
            headerRight: () => (
                <AddButton underlayColor='transparent' onPress={()=>navigation.navigate('EditNote')}>
                    <AddButtonImage source={require('../../assets/more.png')} />
                </AddButton>
            ),
        });
    }, [])
    const list = []

    const handleNav = () => {
        navigation.navigate('EditNote');
    }

    const handleNotePress = (index) => {
        navigation.navigate('EditNote', {
            key: index
        })
    }
    return(
        <Container>
            {props.list.length > 0 &&
            <NotesList 
            data={props.list}
            renderItem={({item, index})=> {
                return(
                    <NoteItem data={item} index={index} onPress={() => handleNotePress(index)} />
                );
            }}
            keyExtractor={(item, index) => index.toString()}
            />}
            {props.list.length == 0 &&
            <NoNotes>
                <NoNotesImage source={require('../../assets/note.png')} />
                <NoNotesText>Não há notas</NoNotesText>
            </NoNotes>}
        </Container>
    );
}

const NoNotes = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const NoNotesImage = styled.Image`
    width: 25px;
    height: 25px;
`;

const NoNotesText = styled.Text`
    color: white;
    font-size: 20px;
    margin-left: 10px;
`;

const NotesList = styled.FlatList`
    flex: 1;
    width: 100%;
`;

const AddButton = styled.TouchableHighlight`
    margin: 15px;
`;

const AddButtonImage = styled.Image`
    width: 24px;
    height: 24px;
`;

const Container = styled.View`
    flex: 1;
    background-color: #333;
    justify-content: center;
    align-items: center;
`;

const mapStateToProps = (state) => {
    return{
        list: state.notes.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return{};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);