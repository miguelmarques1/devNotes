import React, { useState, useLayoutEffect, useEffect } from "react";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";

const App = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ status, setStatus ] = useState('new');
    

    useEffect(()=>{
        if(route.params?.key != undefined && props.list[route.params.key]){
            setStatus('edit');
            setTitle( props.list[route.params.key].title );
            setBody( props.list[route.params.key].body );
        }
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: status == 'new' ? 'Nova Anotação' : 'Editar Anotação',
            headerRight: () => {
                return(
                    <SaveButton onPress={handleSaveButton} underlayColor='transparent'>
                        <SaveButtonImage source={require('../../assets/save.png')} />
                    </SaveButton>
                );
            },
            headerLeft: () => {
                return(
                    <CloseButton underlayColor='transparent' onPress={handleCloseButton} >
                        <CloseButtonImage source={require('../../assets/close.png')} />
                    </CloseButton>
                );
            }
        });
    }, [status, title, body]);


    const handleDeleteNoteButton = () => {
        dispatch({
            type: 'DEL_NOTE',
            payload: {
                key: route.params.key
            }
        });
        navigation.goBack();
    }


    const handleCloseButton = () => {
        navigation.goBack();
    }


    const handleSaveButton = () => {
        if(title != '' && body != ''){
            if(status == 'edit'){
                dispatch({
                    type: 'EDIT_NOTE',
                    payload: {
                        title,
                        body,
                        key: route.params.key
                    }
                });
                navigation.goBack();
            } else {
                dispatch({
                    type: 'ADD_NOTE',
                    payload: {title, body}
                });
                navigation.goBack();
            }
        } else {
            alert('Preencha título e corpo')
        }
    }

    return(
        <Container>
            <TitleInput autoFocus={true} value={title} onChangeText={(t) => setTitle(t)} placeholder='Digite o título da anotação' placeholderTextColor='#CCC' />
            <BodyInput value={body} onChangeText={(t) => setBody(t)} placeholder='Digite o corpo da anotação' multiline={true} textAlignVertical='top' placeholderTextColor='#CCC' />
            {status == 'edit' &&
            <DeleteButton onPress={handleDeleteNoteButton} underlayColor='#FF3330'>
                <DeleteButtonText>Excluir Anotação</DeleteButtonText>
            </DeleteButton>
            }
        </Container>
    );
}


const CloseButtonImage = styled.Image`
    width: 20px;
    height: 20px;
`;

const CloseButton = styled.TouchableHighlight`
    margin-right: 20px;
`;

const SaveButton = styled.TouchableHighlight`
    margin-right: 15px;
`;

const SaveButtonImage = styled.Image`
    width: 24px;
    height: 24px;
`;

const Container = styled.View`
    flex: 1;
    background-color: #333;
`;

const TitleInput = styled.TextInput`
    color: white;
    font-size: 20px;
    font-weight: bold;
    padding: 15px;
    height: 50px;
`;

const BodyInput = styled.TextInput`
    color: white;
    flex: 1;
    padding: 15px;
    font-size: 15px;
`;

const mapStateToProps = (state) => {
    return{
        list: state.notes.list
    }
}

const DeleteButton = styled.TouchableHighlight`
    height: 40px;
    background-color: #FF3333;
    justify-content: center;
    align-items: center;
`;

const DeleteButtonText = styled.Text`
    font-size: 14px;
    color: #FFF;
`;

const mapDispatchToProps = (dispatch) => {
    return{
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);