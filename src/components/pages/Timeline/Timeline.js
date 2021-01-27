import React, { useState } from "react";
import { connect } from "react-redux";
import { Table, Modal, Button } from "react-bootstrap";
//import color
import * as COLOR from "../../../shared/color/color";
//import css
import "./Timeline.css";
//import action from action creator
//import useParams of react router dom
import { useParams } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    users: state.users,
    timeline: state.timeline,
  };
};

//modal timeline
function filterTimeLine(array, table, day) {
  var tableOfTimeline = array.find((el) => el.name === table);
  let timeArray = [
    "---",
    "---",
    "---",
    "---",
    "---",
    "---",
    "---",
    "---",
    "---",
    "---",
    "---",
    "---",
    "---",
    "---",
    "---",
    "---",
  ];
  console.log(tableOfTimeline)
  if (tableOfTimeline) {
    let time = {
      day: sortArray(tableOfTimeline.reservation_day[parseInt(day)]),
      night: sortArray(tableOfTimeline.reservation_night[parseInt(day)]),
    };

    console.log(time);

    for (let el of time.day) {
      if (el.time) {
        let [h, m, _] = el.time.split("-");
        let index = 0;
        if (parseInt(h) === 10) {
          index = parseInt(h) - 10;
          if (parseInt(m) === 30) {
            index = index + 1;
          }
        } else {
          index = (parseInt(h) - 10) * 2;
          if (parseInt(m) === 30) {
            index = index + 1;
          }
        }
        if (timeArray[index] === "---") {
          timeArray.splice(index, 0, el);
        }
      }
    }

    for (let el of time.night) {
      if (el.time) {
        console.log(el.time);
        let [h, m, _] = el.time.split("-");
        console.log(`${h} ${m}`);

        let index = 0;
        if (parseInt(h) === 16) {
          index = parseInt(h) - 16 + 6;
          if (parseInt(m) === 30) {
            index = index + 1;
          }
        } else {
          index = (parseInt(h) - 16) * 2 + 6;
          if (parseInt(m) === 30) {
            console.log("do");
            index = index + 1;
          }
          console.log(index);
        }
        if (timeArray[index] === "---") {
          timeArray.splice(index, 0, el);
        }
      }
    }
    for (let i of timeArray) {
      if (i !== "---") {
        timeArray.pop();
      }
    }

    console.log(timeArray);
    return timeArray;
  } else {
    return [];
  }
}

function sortArray(array) {
  if(array === "---"){
    return array
  }else{
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
}

function Timeline(props) {
  const { table, day } = useParams();
  let check = -1;
  if (props.timeline.timeline) {
    let timeArray = filterTimeLine(props.timeline.timeline, table, day);
    return (
      <div className="WrapperTable">
        <p className="Title">Manage Table Reservation</p>
        <Table bordered hover>
          <thead>
            <tr>
              <th>10h</th>
              <th>10h30</th>
              <th>11h</th>
              <th>11h30</th>
              <th>12h</th>
              <th>12h30</th>
              <th>16h</th>
              <th>16h30</th>
              <th>17h</th>
              <th>17h30</th>
              <th>18h</th>
              <th>18h30</th>
              <th>19h</th>
              <th>19h30</th>
              <th>20h</th>
              <th>20h30</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {timeArray.map((time, index) => {
                if (time.userId) {
                  var user = props.users.users.find((u) => {
                    return u._id === time.userId;
                  });
                  var [h, m, y, mth, d] = time.time.split("-");
                }
                if (time === "---") {
                  if (check === index && check != 6) {
                    return;
                  } else {
                    return (
                      <td key={index}>
                        <p>{time}</p>
                      </td>
                    );
                  }
                } else {
                  check = index + 1;
                  return ( 
                    <td
                      className="notEmpty"
                      key={index}
                      colSpan={
                        (parseInt(h) === 12 && parseInt(m) === 30) ||
                        (parseInt(h) === 20 && parseInt(m) === 30)
                          ? 1
                          : 2
                      }
                    >
                      <div key={index} className="userInfo">
                        <i className="fas fa-circle notEmpty"></i>
                        <div className="detailInfo notEmpty">
                          <p>{`1 đơn của ${user.local.name.toUpperCase()}`}</p>
                          <p>{`${h}h${m}`}</p>
                        </div>
                      </div>
                    </td>
                  );
                }
              })}
            </tr>
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

export default connect(mapStateToProps)(Timeline);
