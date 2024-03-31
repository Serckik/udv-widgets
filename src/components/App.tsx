import { Route, Routes } from "react-router-dom"
import HistoryRouter from "./history-route"
import browserHistory from "../browser-history"
import MainPage from "../pages/main-page"


function App() {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </HistoryRouter>
  )
}

export default App
