import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "../NavBar";
//import component
import Reservation from "./Reservation/Reservation";
import DetailsReservation from "./DetailsReservation/DetailsReservation";
import DishesManage from "./DishesManage/DishesManage";
import Timeline from "./Timeline/Timeline";
//import redux
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchTables, fetchDishes, fetchUser } from "../../redux/ActionCreator";

function Main(props) {
  const dispatch = useDispatch();

  const { tables } = useSelector((state) => ({
    tables: state.tables,
    dishes: state.dishes,
    users: state.users,
  }));

  useEffect(() => {
    dispatch(fetchTables());
    dispatch(fetchDishes());
    dispatch(fetchUser());
    // props.fetchTables();
  }, [dispatch]);

  if (tables.errMess) {
    return <div>Error! {tables.errMess}</div>;
  }
  if (tables.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <div className="App">
        <NavBar />
      </div>
      <Switch>
        <Route path="/">
          <Route path="/reservation" component={Reservation}></Route>
          <Route
            path="/details/:tableId"
            component={DetailsReservation}
          ></Route>
          <Route path="/dishes" component={DishesManage}></Route>
          <Route path="/timeline/:table/:day" component={Timeline}></Route>
        </Route>
      </Switch>
    </Router>
  );
}

export default Main;
