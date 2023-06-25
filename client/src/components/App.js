import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
// import Login from "../pages/Login";
// import RecipeList from "../pages/RecipeList";
// import NewRecipe from "../pages/NewRecipe";
import Layout from "../layout/Layout";

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // auto-login
  //   fetch("/check_session").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  // if (!user) return <Login onLogin={setUser} />;

  return (
    <>
    <div className="container bg-red-900">
      <h1>Hell</h1>
    </div>
      {/* <NavBar user={user} setUser={setUser} /> */}
      {/* <main> */}
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="/new">
              <NewRecipe user={user} />
            </Route> */}
            {/* <Route path="/">
              <RecipeList />
            </Route> */}
          </Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
