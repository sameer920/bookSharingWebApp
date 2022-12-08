import React, { useState } from "react";
import BookCover from "./BookCover";
import BookDisplay from "./BookDisplay";
import "./styles/ListBooks.css";
import { Navigate, redirect, Route } from "react-router-dom";
import { response } from "express";
let path = "http://localhost:4000/";

var obje = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function ListBooks(props) {
  const [books_arr,setbooks]=useState([]);
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
        const user=data;
        fetch("http://localhost:4000/"+props.id+"/:"+user.id,{
          method: "GET",
          mode: "cors",
          headers: new Headers({
            "content-type": "application/json",
            Accept: "application/json",
          }),
          credentials: "include",
        }).then((response)=>response.json())
        .then((data)=>setbooks(data));
      });
  const [display, set] = useState(false);
  const [cond, setcond] = useState(false); //to display condition or not
  const [owner, setowner] = useState(false); //to display owner/user will be shown
  // const [img, setimg] = useState("");
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
      }
      // setimg(e.target.src);
      else {
        setobj({ ...obj, image: e.target.src });
        // obj1.image=arr[3];
        setcond(true);
        fetch(path + "Library/sharing")
          .then((response) => response.json())
          .then((data) => console.log(data));

        set(true);
        setrev(false);
      }
    } else if (st === "booksreading") {
      // setimg(e.target.src);
      setcond(false);
      setowner(true);
      set(true);
      setrev(false);
      setbtn(false);
      setobj({ ...obj, datetype: "date taken" });
      setobj({ ...obj, image: e.target.src });
    } else if (st === "booksgiven") {
      setcond(true);
      setowner(true);
      set(true);
      setbtn(false);
      setrev(false);
      //   setobj({ ...obj, datetype: "date taken" });
      //   setobj({ ...obj, usertype: "user" });
      setobj({
        ...obj,
        image: e.target.src,
        usertype: "user",
        datetype: "date given",
      });
    } else if (st === "reviews") {
      if (e.target.id === "add") {
        console.log("yes");
        window.location.href = "/AddReviews";
      }
      else{
      setcond(false);
      setowner(false);
      setbtn(true);
      setrev(true);

      setobj({
        ...obj,
        image: e.target.src,
        datetype: "Review date ",
        text: "nyy",
        btn_name: "edit",
      });
      set(true);
    }
    }
  }

  // const []

  return (
    <>
      <div id={props.id} className={props.value ? "Flex " : "Flex wrap"}>
        {books_arr.map(( Src,i) => {
         return(
          <BookCover
            src={props.image}
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
    </>
  );
}
export default ListBooks;
