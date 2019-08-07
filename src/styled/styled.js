import styled from 'styled-components'

const Button = styled.button`
  display:inline-block;
  padding:0.3em 1.2em;
  margin:0 0.1em 0.1em 0;
  border:0.16em solid rgba(255,255,255,0);
  border-radius:0.5em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:500;
  color:#FFFFFF;
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
  text-align:center;
  transition: all 0.2s;
  :hover{
    border-color: rgba(0,0,0,1);
  }
  :active{
    box-shadow:inset 0 0.6em 2em -0.3em rgba(0,0,0,0.5),inset 0 0 0em 0.05em rgba(255,255,255,0.3);
  }
`;


const StyledButton = styled.div`
  font-size: 20px;
  width: 200px;
  background-color: ${props => props.red ? 'red' : 'white'}
  background-color: ${props => props.green ? 'green' : 'white'}
  background-color: ${props => props.primary ? '#f4ba1b' : 'white'}
  display:inline-block;
  padding:0.3em 1.2em;
  margin:1vh 0.1em 0.1em 0;
  border:0.16em solid rgba(255,255,255,0);
  border-radius:0.5em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:500;
  color:${props => props.primary ? 'white' : '#f4ba1b'}
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
  text-align:center;
  transition: all 0.2s;
  :hover{
    border-color: rgba(0,0,0,1);
  }
  :active{
    box-shadow:inset 0 0.6em 2em -0.3em rgba(0,0,0,0.5),inset 0 0 0em 0.05em rgba(255,255,255,0.3);
  }
`;

export {
  Button,
  StyledButton
}