import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import "./Reservation.css";
//import react router dom
import { Link } from "react-router-dom";
const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    users: state.users,
  };
};
function mapDataTable(tables) {
  let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");

  let Data = tables.map((table) => {
    let tableObj = {
      id: table._id,
      name: table.name,
      distinction: table.distinction,
      reservation_day: ["---", "---", "---", "---", "---", "---"],
      reservation_night: ["---", "---", "---", "---", "---", "---"],
    };
    if (table.time.length) {
      for (let i = 0; i < table.time.length; i++) {
        let [h, m, y, mth, d] = table.time[i].split("-");
        if (parseInt(month) === parseInt(mth)) {
          if (parseInt(h) < 13) {
            tableObj.reservation_day[d - date] = [];
            tableObj.reservation_day[d - date].push({
              time: table.time[i],
              dish: table.dishesId[i],
              notice: table.notice[i],
              people: table.people[i],
              userId: table.userId[i],
            });
          } else {
            tableObj.reservation_night[d - date] = [];
            tableObj.reservation_night[d - date].push({
              time: table.time[i],
              dish: table.dishesId[i],
              notice: table.notice[i],
              people: table.people[i],
              userId: table.userId[i],
            });
          }
        }
      }
    }
    return tableObj;
  });
  return Data;
}

function Reservation(props) {
  console.log(props.tables.tables);
  //get times to day
  let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
  let [hour, minute, second] = new Date()
    .toLocaleTimeString("en-US")
    .split(/:| /);
  //map to dataRender
  
  return (
    <div className="WrapperTable">
      <p className="Title">Manage Table Reservation</p>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Bàn</th>
            <th>Thời gian</th>
            <th>Hôm nay</th>
            <th>{`Ngày ${parseInt(date) + 1}/${month}`}</th>
            <th>{`Ngày ${parseInt(date) + 2}/${month}`}</th>
            <th>{`Ngày ${parseInt(date) + 3}/${month}`}</th>
            <th>{`Ngày ${parseInt(date) + 4}/${month}`}</th>
            <th>{`Ngày ${parseInt(date) + 5}/${month}`}</th>
          </tr>
        </thead>
        {mapDataTable(props.tables.tables).map((data, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td rowSpan="2">
                  <Link className="NameTables" to={`/details/${data.id}`}>
                    <p>{data.name}</p>
                  </Link>
                </td>
                <td>{`Sáng
                        (10h - 13h)
                  `}</td>
                {data.reservation_day.map((rd, rdindex) => {
                  console.log(rd);
                  if (rdindex < 6) {
                    if (rd === "---") {
                      return <td key={rdindex}>{rd}</td>;
                    }
                    if (rd.length > 0) {
                      return (
                        <td key={rdindex}>
                          {rd.map((el, elindex) => {
                            let user = props.users.users.find((u) => {
                              return u._id === el.userId;
                            });

                            console.log("user" + user);
                            return (
                              <p
                                key={elindex}
                              >{`1 đơn của ${user.local.name.toUpperCase()}`}</p>
                            );
                          })}
                        </td>
                      );
                    }
                  } else {
                    return <td key={rdindex}></td>;
                  }
                })}
              </tr>
              <tr>
                <td>{`Tối
                    (16h - 21h)
                  `}</td>
                {data.reservation_night.map((rn, rnindex) => {
                  if (rnindex < 6) {
                    if (rn === "---") {
                      return <td key={rnindex}>{rn}</td>;
                    }
                    if (rn.length > 0) {
                      return (
                        <td key={rnindex}>
                          {rn.map((el, elindex) => {
                            let user = props.users.users.find((u) => {
                              return u._id === el.userId;
                            });

                            console.log("user" + user);
                            return (
                              <p
                                key={elindex}
                              >{`1 đơn của ${user.local.name.toUpperCase()}`}</p>
                            );
                          })}
                        </td>
                      );
                    }
                  } else {
                    return <td key={rnindex}></td>;
                  }
                })}
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default connect(mapStateToProps)(Reservation);
