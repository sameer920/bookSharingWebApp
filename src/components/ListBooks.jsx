import React, { useEffect, useState } from "react";
import BookCover from "./BookCover";
import BookDisplay from "./BookDisplay";
import "./styles/ListBooks.css";
import { Navigate, redirect, Route } from "react-router-dom";
// import { response } from "express";
let path = "http://localhost:4000/";
function getFilename(fullPath) {
  return fullPath.replace(/^.*[\\\/]/, "");
}
function ListBooks(props) {
  const [books_arr, setbooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/getUserInfo", {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        "content-type": "application/json",
        Accept: "application/json",
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const user = data;
        fetch("http://localhost:4000/" + props.id + "/:" + user.id, {
          method: "GET",
          mode: "cors",
          headers: new Headers({
            "content-type": "application/json",
            Accept: "application/json",
          }),
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            setbooks(data);
            // console.log(data);
          });
      });
  }, []);
  const [display, set] = useState(false);
  const [cond, setcond] = useState(false); //to display condition or not
  const [owner, setowner] = useState(false); //to display owner/user will be shown
  const [btn, setbtn] = useState(true);
  const [rev, setrev] = useState(false);
  const [obj, setobj] = useState({
    image: "",
    name: "testname",
    author: "testauthor",
    details: "no details",
    rating: 4,
    date: "2-2-2002",
    datetype: "Date",
    condition: 9,
    hardcover: "yes",
    btn_name: "remove",
    usertype: "owner",
    usertypename: "amin", //owner user_given
    text: "",
  });

  function close(e) {
    set(false);
  }
  function click(e) {
    const st = e.target.parentNode.parentNode.id;
    if (st === "bookssharing") {
      if (e.target.id === "add") {
        console.log("yes");
        window.location.href = "/AddBooks";
      } else {
        fetch("http://localhost:4000/getUserInfo", {
          method: "GET",
          mode: "cors",
          headers: new Headers({
            "content-type": "application/json",
            Accept: "application/json",
          }),
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            const user = data;
            console.log(getFilename(e.target.src));
            fetch(
              "http://localhost:4000/" +
                props.id +
                "/data/" +
                user.id +
                "/" +
                getFilename(e.target.src),
              {
                method: "GET",
                mode: "cors",
                headers: new Headers({
                  "content-type": "application/json",
                  Accept: "application/json",
                }),
                credentials: "include",
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setobj({
                  image: e.target.src,
                  name: data.book_name,
                  condition: data.condition,
                  hardcover: data.hardcover,
                  author: data.author_name,
                  date: data.date_uploade.substr(0, 10),
                  details: data.add_details,
                  datetype: "Date-uploaded",
                  btn_name: "Delete",
                });
                setcond(true);
                set(true);
                setrev(false);
                console.log(data);
              });
          });
      }
    } else if (st === "booksreading") {
      fetch("http://localhost:4000/getUserInfo", {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "content-type": "application/json",
          Accept: "application/json",
        }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          const user = data;
          console.log(getFilename(e.target.src));
          fetch(
            "http://localhost:4000/" +
              props.id +
              "/data/" +
              user.id +
              "/" +
              getFilename(e.target.src),
            {
              method: "GET",
              mode: "cors",
              headers: new Headers({
                "content-type": "application/json",
                Accept: "application/json",
              }),
              credentials: "include",
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setobj({
                image: e.target.src,
                name: data.book_name,
                author: data.author_name,
                date: data.date_shared.substr(0, 10),
                details: data.add_details,
                usertype: "owner",
                usertypename: data.name,
                datetype: "Date-Taken",
                btn_name: "Delete",
              });
              setcond(false);
              setowner(true);
              setrev(false);
              setbtn(false);
              set(true);
              console.log(data);
            });
        });
    } else if (st === "booksgiven") {
      fetch("http://localhost:4000/getUserInfo", {
          method: "GET",
          mode: "cors",
          headers: new Headers({
            "content-type": "application/json",
            Accept: "application/json",
          }),
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            const user = data;
            console.log(getFilename(e.target.src));
            fetch(
              "http://localhost:4000/" +
                props.id +
                "/data/" +
                user.id +
                "/" +
                getFilename(e.target.src),
              {
                method: "GET",
                mode: "cors",
                headers: new Headers({
                  "content-type": "application/json",
                  Accept: "application/json",
                }),
                credentials: "include",
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setobj({
                  image: e.target.src,
                  name: data.book_name,
                  author: data.author_name,
                  date: data.date_shared.substr(0, 10),
                  hardcover: data.hardcover,
                  details: data.add_details,
                  condition:data.condition,
                  usertype: "User",
                usertypename: data.name,
                });
                setcond(false);
                setowner(false);
                setbtn(true);
                setrev(true);
                set(true);
              });
          });
    } else if (st === "reviewed") {
      if (e.target.id === "add") {
        console.log("yes");
        window.location.href = "/AddReviews";
      } else {
        fetch("http://localhost:4000/getUserInfo", {
          method: "GET",
          mode: "cors",
          headers: new Headers({
            "content-type": "application/json",
            Accept: "application/json",
          }),
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            const user = data;
            console.log(getFilename(e.target.src));
            fetch(
              "http://localhost:4000/" +
                props.id +
                "/data/" +
                user.id +
                "/" +
                getFilename(e.target.src),
              {
                method: "GET",
                mode: "cors",
                headers: new Headers({
                  "content-type": "application/json",
                  Accept: "application/json",
                }),
                credentials: "include",
              }
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setobj({
                  image: e.target.src,
                  name: data.book_name,
                  author: data.author_name,
                  date: data.date.substr(0, 10),
                  details: data.synopsis,
                  text: data.review,
                  datetype: "Date-Reviewed",
                  btn_name: "Delete",
                });
                setcond(false);
                setowner(false);
                setbtn(true);
                setrev(true);
                set(true);
              });
          });
      }
    }
  }

  // const []

  return (
    <div>
      <div id={props.id} className={props.value ? "Flex " : "Flex wrap"}>
        {books_arr.map((vl2, vl3) => {
          return (
            <BookCover
              src={"http://localhost:4000/" + vl2.picture}
              className={"small details"}
              onpress={click}
            />
            // (Src,i)
          );
        })}

        {props.value1 ? (
          <BookCover
            id={"add"}
            src={"add.png"}
            className={"small details"}
            onpress={click}
          />
        ) : (
          ""
        )}
      </div>
      {display ? (
        <BookDisplay
          close={close}
          obj={obj}
          cond={cond}
          owner={owner}
          btn={btn}
          review={rev}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
export default ListBooks;
