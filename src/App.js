import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "~/pages/Home";
import Following from "~/pages/Following";
import DefaultLayout from "~/layouts/DefaultLayout";
import Upload from "./pages/Upload";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import routesConfig from "~/config/routes";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path={routesConfig.home}
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          />
          <Route
            path={routesConfig.following}
            element={
              <DefaultLayout>
                <Following />
              </DefaultLayout>
            }
          />
          <Route path={routesConfig.upload} element={<Upload />} />
          <Route path={routesConfig.search} element={<Search />} />
          <Route
            exact
            path={routesConfig.profile}
            element={
              <DefaultLayout>
                <Profile />
              </DefaultLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
