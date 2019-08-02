import styled, {css} from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.p`
  color: red ;
  font-size: 50px;
`;

const buttonType = css`
  color: ${props => (props.primary ? 'blue':'white')};
  color: ${props => (props.warning && 'red')};
  }}
`;

const Button = styled.button`
  background-color: green;
  ${buttonType}
  font-size: 20px;
  opacity: 0.6;
  :hover{
    opacity: 1;
  }
`;


export {
  Container,
  Title,
  Button
}