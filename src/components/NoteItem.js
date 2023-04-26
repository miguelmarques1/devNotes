import React from "react";
import styled from "styled-components";


const NoteItem = ({ data, index, onPress }) => {
    return(
        <Box onPress={onPress} >
            <Title>{data.title}</Title>
        </Box>
    );
}

const Box = styled.TouchableHighlight`
    height: 50px;
    padding: 15px;
    justify-content: center;
    border-style: solid;
    border-bottom-color: #222;
    border-bottom-width: 1px;
`;

const Title = styled.Text`

`;

export default NoteItem;