import MainPage from "../pages/main-page"
import { Global, css } from '@emotion/react';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat';
    font-weight: normal;
    font-style: normal;
  }

  button {
    border: none;
    cursor: pointer;
  }

  body {
    background-color: #F5F5F5;
    padding-top: 40px;
  }
`

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <MainPage />
    </>
  )
}

export default App
