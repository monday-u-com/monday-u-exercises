import styled from "styled-components";

export const AppBackground = styled.div`
  width: 100%;
  height: 100vh;
  font-family: Georgia, serif;
  font-weight: lighter;
  background-image: linear-gradient(
    to top right,
    white,
    #d4dff3,
    rgba(138, 144, 224, 0.76),
    rgba(106, 117, 231, 0.76),
    rgba(85, 97, 229, 0.76)
  );

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 50%;
  background-color: white;
  border: 1px silver solid;
  border-radius: 8px;
  -webkit-box-shadow: 12px 12px 38px -13px #000000;
  box-shadow: 12px 12px 38px -13px #000000;
`;

export const AppTitle = styled.div`
  padding: 28px 0px;
  margin-left: 5%;
  font-weight: lighter;
  font-size: 30px;
  width: max-content;
`;

export const TextBox = styled.input`
  width: 85%;
  height: 30px;
  font-size: 16px;
`;

export const CheckBox = styled.input`
  margin-right: 10px;
`;
export const Text = styled.input`
  margin-left: 10px;
  width: auto;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 15px;
  &:hover {
    color: blueviolet;
    transition: color 0.2s ease-in-out;
  }
`;

export const FlexRow = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AddButton = styled.button`
  color: white;
  background-color: #6c6cff;
  border-style: solid;
  border-color: transparent;
  border-radius: 4px;
  height: 35px;
  width: 35px;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #3c3cff;
    transition: background-color 0.2s ease-in-out;
  }
`;

export const SortImg = styled.img`
  height: 20px;
  width: 20px;
`;

export const ListItemIcon = styled.img`
  height: 20px;
  //width: 20px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    background-color: #f0f0f5;
    transition: background-color 0.2s ease-in-out;
  }
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0px 30px;
  height: 310px;
  overflow-y: scroll;
`;

export const ListItem = styled.li`
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: blueviolet;
    transition: color 0.2s ease-in-out;
  }
  &:not(:last-of-type) {
    border-bottom: 1px #bbb5b5 solid;
  }
`;
