import React from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";

//import css
import "./DishesManage.css";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};

function DishesManage(props) {
  const dishes = props.dishes.dishes;
  return (
    <div className="WrapperTable WrapperDishes">
      <p className="Title">Quản lý món ăn</p>
      {dishes.map((dish) => {
        return (
          <Card
            key={dish._id}
            style={{ width: 600, marginBottom: 30, borderWidth: 0.5}}
          >
            <Card.Img
              src={dish.image}
              style={{
                width: "98%",
                margin: 6,
                height: 400,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            />
            <Card.Body
              style={{
                marginLeft: 6,
                marginRight: 6,
                marginTop: 10,
                marginBottom: 10,
                padding: 0,
              }}
            >
              <Card.Title>{dish.name.toUpperCase()}</Card.Title>
              <Card.Text>{dish.description}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
export default connect(mapStateToProps)(DishesManage);
