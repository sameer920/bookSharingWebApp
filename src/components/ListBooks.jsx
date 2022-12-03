import React, { useState } from "react";
import BookCover from "./BookCover";
import BookDisplay from "./BookDisplay";
import "./styles/ListBooks.css";
import "./styles/ListBooks.css";

var obje = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function ListBooks(props) {
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
   // const [image,setimage] =useState("");
   // const [name,setname]=useState("");
   // const [author,setauthor]=useState("");
   // const [details,setdetails]=useState("");
   // const [condition,setcondition]=useState(0);
   // const [cover,setcover]=useState("");
   // const [date,setdate]=useState("");
   // const [div,setdiv]=useState("");  //dte or dte tken
   // const [btn,setbtn]=useState("");   //remove or done reding
   // const [state,setstate]=useState("");

   function close(e) {
      set(false);
   }
   function click(e) {
      let pathName = props.pathName;

      if (pathName == "Library") {
         const parent = e.target.parentNode.parentNode.id;
         if (parent === "bookssharing") {
            setobj({ ...obj, image: e.target.src });
            // obj1.image=arr[3];
            setcond(true);
            set(true);
            setrev(false);
            // setimage(e.target.src);
            // setname("dummy nme");
            // setauthor("dummy uthor");
            // setdetails("no detils");
            // setcondition(8);
            // setcover("soft");
            // setdate("23-2-2020");
            // setdiv("Dte");
            // setbtn("remove");
         } else if (parent === "booksreading") {
            // setimg(e.target.src);
            setcond(false);
            setowner(true);
            set(true);
            setrev(false);
            setobj({ ...obj, datetype: "date taken" });
            setobj({ ...obj, image: e.target.src });
         } else if (parent === "booksgiven") {
            setcond(true);
            setowner(true);
            set(true);
            setbtn(false);
            setrev(false);
            //   setobj({ ...obj, datetype: "date taken" });
            //   setobj({ ...obj, usertype: "user" });
            setobj({ ...obj, image: e.target.src, usertype: "user", datetype: "date given" });
         }
         else if (parent === "reviews") {
            setcond(false);
            setowner(false);
            setbtn(true);
            setrev(true);

            setobj({ ...obj, image: e.target.src, datetype: "Review date ", text: "nyy", btn_name: "edit" });
            set(true);
         }

         // console.log(display);
         // console.log(document.getElementById("1").parentElement);
         // document.getElementById("root").classList.add("salmon");
         // document.getElementById("bookbody").classList.add("salmon");
         // document.getElementById("bookbody").classList.add("aa");

         // document.getElementById("ul").classList.add("salmon");
         // console.log(display);
      }
      else if(pathName == "Explore"){
         //route to book page;
      }
   }
   // const []

   return (
      <>
         <div id={props.id} className={props.value ? "Flex " : "Flex wrap"}>
            {obje.map((val, val1) => {
               return (
                  <BookCover
                     src={props.image}
                     className={"small details"}
                     onpress={click}
                  />
               );
            })}

            {props.value1 ? (
               <BookCover
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