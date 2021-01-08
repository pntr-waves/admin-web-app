import React from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import "./DetailsReservation.css";
//import useParams of react router dom
import { useParams } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    dishes: state.dishes,
    users: state.users,
  };
};

function mapDetailTable(table, dishes, users) {
  //map dishesId
  let new_tablesId = table.dishesId.map((dish) => {
    let a = dish.map((el) => {
      let count = 0;
      for (let i = 0; i < dish.length; i++) {
        if (el === dish[i]) {
          count = count + 1;
          //delete 2 or more the same dish
        }
      }
      return {
        id: el,
        count: count,
      };
    });
    return a;
  });
  new_tablesId = new_tablesId.map((dish) => {
    let temp = [];
    return dish.filter((el) => {
      if (temp.includes(el.id) === false) {
        temp.push(el.id);
        return el;
      }
    });
  });

  console.log(new_tablesId);

  let tableObj = {
    ...table,
    reservation: [],
  };
  for (let i = 0; i < table.time.length; i++) {
    let [h, m, y, mth, d] = table.time[i].split("-");
    tableObj.reservation.push({
      hour: h,
      minute: m,
      year: y,
      month: mth,
      day: d,
      user: users.find((user) => {
        return user._id === table.userId[i];
      }),
      people: table.people[i],
      notice: table.notice[i],
      dishes:
        table.dishesId.length > 0
          ? new_tablesId[i].map((dish) => {
              let re_value = dishes.find((d) => d._id === dish.id);
              if (re_value) {
                return {
                  count: dish.count,
                  details: re_value,
                };
              } else {
                return "Ksp";
              }
            })
          : [],
    });
  }
  return tableObj;
}

function DetailsReservation(props) {
  //get params
  const { tableId } = useParams();
  //find table from id of table
  let detailsTable = props.tables.tables.find((el) => el._id === tableId);
  console.log(detailsTable);
  //create data to render
  var dataRender = mapDetailTable(
    detailsTable,
    props.dishes.dishes,
    props.users.users
  );

  console.log(dataRender);
  //time for today
  let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
  let [hour, minute, second] = new Date()
    .toLocaleTimeString("en-US")
    .split(/:| /);

  return (
    <div className="WrapperTable">
      <p className="Title">{`Các đơn đã đặt ở Bàn ${detailsTable.name}`}</p>
      {dataRender.reservation.length ? (
        <Table
          className="TableDetails"
          borderless
          hover
          style={{ width: "62%" }}
        >
          {dataRender.reservation.map((dataReservation, dindex) => {
            return (
              <tbody
                className={
                  dataReservation.dishes.length === 0 ||
                  (dataReservation.dishes[dindex] === "Ksp" &&
                    dataReservation.dishes.length === 1)
                    ? "none"
                    : "tbody"
                }
                key={dindex}
              >
                <tr key={dindex + 1}>
                  <td
                    rowSpan={
                      dataReservation.dishes !== 0
                        ? dataReservation.dishes.length + 1
                        : 1
                    }
                  >
                    <div className="function">
                      <p>
                        {`${dataReservation.hour}h${dataReservation.minute} - ` +
                          dataReservation.day ===
                          date && dataReservation.month === month
                          ? "Hôm nay"
                          : `Ngày ${dataReservation.day}/${dataReservation.month}/${dataReservation.year}`}
                      </p>
                    </div>
                  </td>
                  <td style={{ textAlign: "left" }}>
                    <div className="userInfo">
                      <i className="fas fa-circle"></i>
                      <p>
                        Người đặt:
                        <b>{` ${dataReservation.user.local.name}\n`}</b>
                      </p>
                    </div>
                    <div className="userInfo">
                      <i className="fas fa-circle"></i>
                      <p>
                        Email liên hệ:
                        <b>{` ${dataReservation.user.local.email}`}</b>
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="function">
                      <p>{`${dataReservation.people} người`}</p>
                    </div>
                  </td>
                  <td>
                    <div className="function">
                      <p>Thêm</p>
                      <i className="far fa-plus-square"></i>
                    </div>
                  </td>
                  <td>
                    <div className="function">
                      <p>Xóa</p>
                      <i className="far fa-calendar-times"></i>
                    </div>
                  </td>
                </tr>
                {dataReservation.dishes.length ? (
                  dataReservation.dishes.map((dish, i) => {
                    if (dish === "Ksp") {
                      return <tr key={dindex + 2 + i}></tr>;
                    } else {
                      return (
                        <tr key={i}>
                          <td colSpan={4}>
                            <div className="function">
                              <img
                                alt={dish.name}
                                src={dish.details.image}
                              ></img>
                              <p>{dish.details.name.toUpperCase()}</p>
                              <p>{` x${dish.count}`}</p>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })
                ) : (
                  <tr key={dindex + 2}></tr>
                )}
              </tbody>
            );
          })}
        </Table>
      ) : (
        <p style={{ fontWeight: "bold", fontSize: 20 }}>
          Hiện tại chưa có đơn đặt bàn nào!
        </p>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(DetailsReservation);
