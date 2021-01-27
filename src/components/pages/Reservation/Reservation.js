import React, { useState } from "react";
import { connect } from "react-redux";
import { Table, Modal, Button } from "react-bootstrap";
//import color
import * as COLOR from "../../../shared/color/color";
//import css
import "./Reservation.css";
//import react router dom
import { Link } from "react-router-dom";
//import action from action creator
import { addTimeline } from "../../../redux/ActionCreator";

const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    users: state.users,
    timeline: state.timeline,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTimeline: (timeline) => dispatch(addTimeline(timeline)),
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
            if (
              parseInt(d) - parseInt(date) < 6 &&
              parseInt(d) - parseInt(date) >= 0
            ) {
              if (
                tableObj.reservation_day[
                  Math.abs(parseInt(d) - parseInt(date))
                ] === "---"
              ) {
                tableObj.reservation_day[
                  Math.abs(parseInt(d) - parseInt(date))
                ] = [];
              }
              tableObj.reservation_day[
                Math.abs(parseInt(d) - parseInt(date))
              ].push({
                time: table.time[i],
                dish: table.dishesId[i],
                notice: table.notice[i],
                people: table.people[i],
                userId: table.userId[i],
              });
            }
          } else {
            if (
              parseInt(d) - parseInt(date) < 6 &&
              parseInt(d) - parseInt(date) >= 0
            ) {
              if (
                tableObj.reservation_night[
                  Math.abs(parseInt(d) - parseInt(date))
                ] === "---"
              ) {
                tableObj.reservation_night[
                  Math.abs(parseInt(d) - parseInt(date))
                ] = [];
              }
              tableObj.reservation_night[
                Math.abs(parseInt(d) - parseInt(date))
              ].push({
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
    }
    return tableObj;
  });
  return Data;
}

function sortArray(array) {
  let sortArray = array.sort((a, b) => {
    let [ha, ma] = a.time.split("-");
    let [hb, mb] = b.time.split("-");
    if (parseInt(ha) === parseInt(hb)) {
      return parseInt(ma) - parseInt(mb);
    } else {
      return parseInt(ha) - parseInt(hb);
    }
  });
  return sortArray;
}

function Reservation(props) {
  if (props.tables.tables.length > 0) {
    //get times to day
    let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
    let [hour, minute, second] = new Date()
      .toLocaleTimeString("en-US")
      .split(/:| /);
    //map to dataRender
    console.log(props.tables.tables);
    console.log(mapDataTable(props.tables.tables));
    if (props.timeline.timeline.length === 0) {
      props.addTimeline(mapDataTable(props.tables.tables));
    }

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
          <tbody>
            {mapDataTable(props.tables.tables).map((data, index) => {
              return (
                <>
                  <tr key={index + "trDay"}>
                    <td rowSpan="2">
                      <Link className="NameTables" to={`/details/${data.id}`}>
                        <p>{data.name}</p>
                      </Link>
                    </td>
                    <td>{`Sáng
                          (10h - 13h)
                    `}</td>
                    {data.reservation_day.map((rd, rdIndex) => {
                      if (rd === "---") {
                        return <td key={rdIndex}>{rd}</td>;
                      } else {
                        let sortAscending = sortArray(rd);
                        return (
                          <td key={rdIndex}>
                            <Link
                              className="NameTables"
                              to={`/timeline/${data.name}/${rdIndex}`}
                            >
                              {sortAscending.map((el, elIndex) => {
                                let user = props.users.users.find((u) => {
                                  return u._id === el.userId;
                                });
                                console.log(user);
                                let [h, m, y, mth, d] = el.time.split("-");
                                return (
                                  <div key={elIndex} className="userInfo">
                                    <i className="fas fa-circle"></i>
                                    <div className="detailInfo">
                                      <p>
                                        {user
                                          ? `1 đơn của ${user.local.name.toUpperCase()}`
                                          : "---"}
                                      </p>
                                      <p>{`${h}h${m}`}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </Link>
                          </td>
                        );
                      }
                    })}
                  </tr>
                  <tr key={index + "trNight"}>
                    <td>{`Tối
                      (16h - 21h)
                    `}</td>
                    {data.reservation_night.map((rn, rnIndex) => {
                      if (rn === "---") {
                        return <td key={rnIndex}>{rn}</td>;
                      } else {
                        let sortAscending = sortArray(rn);
                        return (
                          <td key={rnIndex}>
                            <Link
                              className="NameTables"
                              to={`/timeline/${data.name}/${rnIndex}`}
                            >
                              {sortAscending.map((el, elIndex) => {
                                let user = props.users.users.find((u) => {
                                  return u._id === el.userId;
                                });
                                console.log(user);
                                let [h, m, y, mth, d] = el.time.split("-");
                                return (
                                  <div key={elIndex} className="userInfo">
                                    <i className="fas fa-circle"></i>
                                    <div className="detailInfo">
                                      <p>
                                        {user
                                          ? `1 đơn của ${user.local.name.toUpperCase()}`
                                          : "---"}
                                      </p>
                                      <p>{`${h}h${m}`}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </Link>
                          </td>
                        );
                      }
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  } else {
    return (
      <div>
        <p>KHÔNG CÓ DỮ LIỆU</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
