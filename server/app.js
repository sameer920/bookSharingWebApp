require("dotenv").config({ path: "./server/.env" }); // environment variables
const { Client } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const multer = require("multer");
var path = require('path');
const LocalStrategy = require("passport-local").Strategy;
var cors = require("cors");
// const { request } = require("http");

//setting up express:
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(express.static(__dirname + '/images'));


app.use(
	cors({
		credentials: true,
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		origin: "http://localhost:3000",
	})
);

const client = new Client({
	user: process.env.DB_USERNAME,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASS.toString(),
	port: process.env.DB_PORT,
});

var storage = multer.diskStorage({
	destination: __dirname + '/public2/images',
	filename: (req, file, cb) => {
		client.query(
			` select bid from books
		offset ((select count(*) from books)-1)
		`, (re, ress) => {
			cb(null, ress.rows[0].bid + path.extname(file.originalname));
			client.query(`update books set picture=$1 where bid=$2
			`, [ress.rows[0].bid + path.extname(file.originalname), ress.rows[0].bid], (r, e) => { if (r) console.log(r); })

		});
	},
});

var upload = multer({ storage: storage }).single("file");
app.post("/upload", (req, res) => {
	upload(req, res, (err) => {
		if (err) {

			console.log("Error while connecting", err);
			return;
		}
		else {
			console.log("Connected");
		}
		res.send(req.file);
	});
});

app.use(express.static("./public2/images"));
app.use(express.static(__dirname + '/public2/images'));

client.connect((err) => {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log("Connected");
	}
});

//setting up passport to handle sessions and authentication:

app.use(
	session({
		secret: process.env.SECRET_STRING,
		resave: false, //resaves a session even if no changes were made
		saveUninitialized: false, //saves a cookie when it is new but unmodified. false is good for gdpr compliance and logins.
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new LocalStrategy({ usernameField: "email" }, (email, password, cb) => {
		//searching email in database:
		client.query(`SELECT * from users where email = $1`, [email], (err, result) => {

			if (err) {
				//some error occured while authenticating
				console.log("Error occured while reading from users for authentication", err)
				return cb(err);
			}
			else {
				if (result.rowCount > 0) {
					user = result.rows[0];
					bcrypt.compare(password, user.password, (req, res) => {
						if (res) {
							//user authenticated
							cb(null, user);
						} else {
							//incorrect password
							cb(null, false, { message: "no user found" });
						}
					});
				}
				else {
					//user not found in the database
					cb(null, false);
				}
			}
		});
	}));

passport.serializeUser((user, done) => {
	console.log("Serialize");
	done(null, user.id);
});

passport.deserializeUser((id, cb) => {
	console.log("I called")
	client.query(`SELECT * FROM users WHERE id=$1`, [id], (err, result) => {
		if (err) {
			console.log("Error while reading users for deserialize ", err)
			cb(err);
		}
		else {
			cb(null, result.rows[0]);
		}
	})
});

function checkAunthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		console.log("heelo");
		return next();
	}
	res.redirect("/Register");
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		console.log("yeah");
		res.redirect("/test");
	}
	next();
}

app.listen(4000, () => {
	console.log("Listening on port 4000");
});

app.post('/Login', passport.authenticate("local",
	{
		failureRedirect: "/Register",
		failureMessage: true,
		successRedirect: "/Library"
	}));

function checkIfUniqueId(userId) {

	client.query(`Select id from users where id=$1`, [userId], (err, res) => {
		if (err) {
			console.log("Error while reading in check if unique", err)
		}
		else {
			if (res.rowCount == 0) {
				return true;
			}
			else {
				return false;
			}
		}
	})
}

app.post('/Register', async function (req, res) {
	console.log("register", req.body)
	let name = req.body.name;
	let email = req.body.email;
	let password = req.body.password;
	let confirmPassword = req.body.confirmPassword;
	let contact = req.body.contact;

	//hash password
	let hashedPassword = await bcrypt.hash(password, 10);

	client.query(`SELECT email FROM users where email=$1`, [email], (err, result) => {
		if (err) {
			console.log("Error while retrieving emails from database in register", err);
		}
		else if (result.rowCount == 0) {
			if (password == confirmPassword) {
				let userId = name + Math.floor(Math.random() * 10000).toString();
				while (checkIfUniqueId(userId) === false) {
					userId = name + (Math.floor(Math.random() * 10000)).toString();
				}
				client.query(`INSERT INTO users(id, name, email, password, contact) VALUES($1, $2, $3, $4, $5)`,
					[userId, name, email, hashedPassword, contact], (err, result) => {
						if (err) {
							console.log("Error while inserting in database, Register", err)
						}
						else {
							console.log({ result: "true" });
							res.json(JSON.stringify({ result: "true" }));
						}
					})
			}
			else {
				console.log("password not match")
				res.json({
					result: "passwords dont match"
				});
			}

		}
		else {
			console.log("already exist");
			return res.json({ result: "User already exists. Please Login" });
		}
	});
});


app.get("/Library", (req, res) => {
	return res.json({ result: "hello world" });
})


app.get("/test", checkAunthenticated, (req, res) => {
	console.log(req.body);
	console.log("test");
	res.json({ result: "you are already authenticated" });
});

app.get("/Book/:bookId", function (req, res) {
	let bookId = req.params.bookId;
	client.query("Select * from books where bid=$1", [bookId], (err, result) => {
		if (err) {
			console.log("Error while retrieving book", err);
		}
		else {
			return res.json(result.rows)
		}
	})
});

app.get("/Reviews/:bookId", function (req, res) {
	let bookId = req.params.bookId;
	client.query(
		"Select r.review,r.id,r.rating, r.date, u.name from reviews r, users u where u.id = r.id AND bid=$1",
		[bookId],
		(err, result) => {
			if (err) {
				console.log("Error in retreiving reviews", err);
			} else {
				res.json(result.rows);
			}
		}
	);
});

app.get("/MyProfile/:userId", function (req, res) {
	let userId = req.params.userId;
	client.query("SELECT * FROM users WHERE id=$1 ", [userId], (err, result) => {
		if (err) {
			console.log("Error while retrieving Profile", err);
		} else {
			console.log(result.rows[0])
			if (result.rows[0] !== null) {
				res.json({
					id: result.rows[0].id,
					email: result.rows[0].email,
					name: result.rows[0].name,
					contact: result.rows[0].contact,
				});
			}
		}
	});
});


app.get("/Explore", function (req, res) {
	function shuffleArray(array) {
		if (array.length === 1) {
			return;
		}
		//Fisher-yates Sorting algorithm
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	client.query(
		"SELECT bid,picture, rating FROM books ORDER BY rating ASC ",
		(err, result) => {
			if (err) {
				console.log("Error while retreiving books for explore page", err);
			} else {
				exploreResult = {
					popularBooks: [],
					recommendedBooks: [],
				};
				for (let i = 0; i < 10; i++) {
					// console.log(i);
					exploreResult.popularBooks.push(result.rows[i]);
					if (i === result.rowCount - 1) {
						break;
					}
				}
				shuffleArray(result.rows);
				for (let i = 0; i < 20; i++) {
					exploreResult.recommendedBooks.push(result.rows[i]);
					if (i === result.rowCount - 1) {
						break;
					}
				}
				res.json(exploreResult);
			}
		}
	);
});

app.get("/Library/sharing", function (req, res) {
	console.log("shred");
	const obj = {
		Title: "min",
		Author: "bckend",
		user: "no ide",
		Details: "lorem20",
		Condition: 9,
		Hardcover: "yes",
		date_given: "2-2-2002",
	};
	console.log(obj);
	return res.json(obj);
});

app.get("/Library/shared", function (req, res) {
	console.log("shred");
});
app.get("/Library/reviews", function (req, res) {
	console.log("shred");
});


app.get("/register", function (req, res) {
	res.json({ response: "hi" })
})

app.get("/getUserInfo", function (req, res) {
	if (req.isAuthenticated()) {
		res.json({
			id: req["user"].id,
			name: req["user"].name,
			email: req["user"].email,
			contact: req["user"].contact,
		});
	} else {
		res.redirect("/Register")
	}
});

app.post("/AddBooks", async function (req, res) {

	console.log(req.body);
	client.query("SELECT bid FROM books WHERE book_name=$1 ", [req.body.title], (err, result) => {
		if (err) {
			console.log("Error while retrieving book", err);
		}
		else {
			console.log(result.rowCount);
			if (result.rowCount > 0) {
				let ts = Date.now();
				let date_ob = new Date(ts);
				let date = date_ob.getDate();
				let month = date_ob.getMonth() + 1;
				let year = date_ob.getFullYear();
				let date_f = year + "-" + month + "-" + date;
				client.query("insert into uploaded_books(bid,owner,date_uploade,hardcover,condition,add_details,availability) values($1,$2,$3,$4,$5,$6,$7)", [
					result.rows[0].bid, req.body.id, date_f, req.body.hardcover, req.body.condition, req.body.details, true], (err, rest) => {
						if (err) console.log("sharing already", err);
						else res.send(true);
					}
				);
			} else {
				client.query(
					"insert into books(book_name,rating,synopsis,no_of_reviews) values($1,$2,$3,$4)",
					[req.body.title, 0, req.body.synopsis, 0],
					(err, resu) => {
						if (!err) {
							client.query(
								"select bid from books offset ((select count(*) from books)-1)",
								(err, results) => {
									if (!err) {
										let ts = Date.now();
										let date_ob = new Date(ts);
										let date = date_ob.getDate();
										let month = date_ob.getMonth() + 1;
										let year = date_ob.getFullYear();
										let date_f = year + "-" + month + "-" + date;
										client.query(
											"insert into uploaded_books(bid,owner,date_uploade,hardcover,condition,add_details,availability) values($1,$2,$3,$4,$5,$6,$7)",
											[
												results.rows[0].bid,
												req.body.id,
												date_f,
												req.body.hardcover,
												req.body.condition,
												req.body.details,
												true,
											],
											(err, ress) => {
												client.query("select aid from authors where author_name=$1", [req.body.author], (sel_err, sel_auth) => {
													if (sel_auth.rowCount > 0) {
														client.query("insert into books_of_authors values($1,$2)", [results.rows[0].bid, sel_auth.rows[0].aid], (ins_err, ins_res) => {
															if (ins_err) {
																console.log(ins_err);
															}
															else {
																console.log("pyrmind of doom");
															}
														})

													}
													else {
														client.query("insert into authors(author_name) values($1) returning aid", [req.body.author], (errors, requests) => {
															client.query("select aid from authors offset ((select count(*) from authors)-1)", (auth_err, auth_req) => {
																client.query("insert into books_of_authors values($1,$2)", [results.rows[0].bid, auth_req.rows[0].aid], (ins_err, ins_res) => {
																	if (ins_err) {
																		console.log(ins_err);
																	}
																	else {
																		console.log("pyrmind of doom p2");
																	}
																})
															});
														})

													}

												})
												if (err) console.log("sharing already", err);
											}
										);
									}
								}
							);
							res.send(false);
						}
					}
				);
			}
		}
	}
	);
	// res.send("ok");
});

app.post("/AddReviews", async function (req, res) {
	console.log(req.body);
	client.query("SELECT bid FROM books WHERE book_name=$1 ", [req.body.title], (err, result) => {
		if (err) {
			console.log("Error while retrieving book", err);
		}
		else {
			console.log(result.rowCount);
			if (result.rowCount > 0) {
				let ts = Date.now();
				let date_ob = new Date(ts);
				let date = date_ob.getDate();
				let month = date_ob.getMonth() + 1;
				let year = date_ob.getFullYear();
				let date_f = year + "-" + month + "-" + date;
				client.query("insert into reviews(bid,id,date,rating,review) values($1,$2,$3,$4,$5)", [
					result.rows[0].bid, req.body.id, date_f, req.body.rating, req.body.review], (err, rest) => {
						if (err) console.log("sharing already", err);
						else {
							client.query("update books set rating=rating+$1,no_of_reviews=no_of_reviews+$2 where bid=$3", [req.body.rating, 1, result.rows[0].bid], (rating_err, rating_res) => { res.send(true); });
						}
					}
				);
			} else {
				client.query(
					"insert into books(book_name,rating,synopsis,no_of_reviews) values($1,$2,$3,$4)",
					[req.body.title, req.body.rating, req.body.synopsis, 1],
					(err, resu) => {
						if (!err) {
							client.query(
								"select bid from books offset ((select count(*) from books)-1)",
								(err, results) => {
									if (!err) {
										let ts = Date.now();
										let date_ob = new Date(ts);
										let date = date_ob.getDate();
										let month = date_ob.getMonth() + 1;
										let year = date_ob.getFullYear();
										let date_f = year + "-" + month + "-" + date;
										client.query(
											"insert into reviews(bid,id,date,review,rating) values($1,$2,$3,$4,$5)",
											[
												results.rows[0].bid,
												req.body.id,
												date_f,
												req.body.review,
												req.body.rating,
											],
											(err, ress) => {
												client.query("select aid from authors where author_name=$1", [req.body.author], (sel_err, sel_auth) => {
													if (sel_auth.rowCount > 0) {
														client.query("insert into books_of_authors values($1,$2)", [results.rows[0].bid, sel_auth.rows[0].aid], (ins_err, ins_res) => {
															if (ins_err) {
																console.log(ins_err);
															}
															else {
																console.log("pyrmind of doom");
															}
														})

													}
													else {
														client.query("insert into authors(author_name) values($1) returning aid", [req.body.author], (errors, requests) => {
															client.query("select aid from authors offset ((select count(*) from authors)-1)", (auth_err, auth_req) => {
																client.query("insert into books_of_authors values($1,$2)", [results.rows[0].bid, auth_req.rows[0].aid], (ins_err, ins_res) => {
																	if (ins_err) {
																		console.log(ins_err);
																	}
																	else {
																		console.log("pyrmind of doom p2");
																	}
																})
															});
														})

													}

												})
												if (err) console.log("sharing already", err);
											}
										);
									}
								}
							);
							res.send(false);
						}
					}
				);
			}
		}
	}
	);
	// res.send("ok");
})

app.post("/Search", function (req, res) {
	console.log(req.body.searchStr)
	let searchStr = req.body.searchStr;

	client.query(`Select * from books where book_name LIKE $1`, [searchStr + '%'], (err, result) => {
		if (err) console.log(err)
		if (!err) {
			console.log("hello")
			if (result.rows.length > 0) {
				res.json(result.rows);
			}
			else {
				client.query(`Select * from books where bid in (Select
					 bid from books_of_authors where aid in (
						Select aid from authors where author_name like $1
					 ) )`, [searchStr + '%'], (err, results) => {
					if (err) console.log(err)
					if (!err) {
						res.json(results.rows);
					}
				})
			}
		}
	})
})

app.get("/logout", (req, res) => {
	req.logout(err => {
		if (err) {
			console.log("Logout error", err);

		}
	});
	res.redirect("/Register")
})

client.on("error", (e) => {
	console.log(e);
});

app.get("/Owner/:bookId", function (req, res) {
	client.query(`SELECT * from users where id = (SELECT owner from uploaded_books WHERE bid=$1)`, [req.params.bookId], (err, result) => {
		if (err) console.log("error while retrieving book owner", err)
		else {
			if (result.rows[0] !== undefined && result.rows[0] !== null) {
				res.json({
					name: result.rows[0].name,
					email: result.rows[0].email,
					contact: result.rows[0].contact,
					title: "Owner",
					src: "person.jpg",
					id: result.rows[0].id

				});
			}
			else {
				console.log("No owner exists for book with id", req.params.bookId);
				res.redirect("/Explore");
			}


		}
	})
})
app.get("/requests/:Id", function (req, res) {
	let userId = req.params.Id;
	// let id=path.parse(userId).name; // index
	console.log("sssss", userId, " kjkjk");
	client.query("select id,date_req,name,book_name,picture from users natural  join (select target_user as id,book_name,picture,date_req  from requests natural join books where owner=$1 and state is null) as t1", [userId], (error, result) => {
		console.log(result.rows);
		res.json(result.rows);
	})
});

app.post("/update_req", function (req, res) {
	console.log("body", req.body);
	client.query("update requests set state=$1,owner_seen=true where owner=$2 and target_user=$3 and bid=(select bid from books where book_name=$4)", [req.body.state, req.body.owner, req.body.id, req.body.title], (error, result) => {
		if (error) {
			console.log("error while requesting", error);
		}
		if (!error)
			if (req.body.state === 'true' || req.body.state === true) {
				let date = new Date().toJSON().slice(0, 10);
				client.query("update requests set state=false,owner_seen=true  where owner=$1 and bid=(select bid from books where book_name=$2 )", [req.body.owner, req.body.title], (errr, ress) => {
					if (!errr) {
						console.log("res")
						client.query("select bid from books where book_name=$1", [req.body.title], (errr, ress) => {
							if (errr) {
								console.log("Not selecting books", errr)
							}
							client.query(" insert into shared_books values($1,$2,$3,$4)", [ress.rows[0].bid, req.body.owner, req.body.id, date], (e, r) => {
								if (e) {
									console.log("error inserting request", e)
								}
							})
						})
					}

				})


			}
	})
});
// app.get("/requests/:id",(req,res)=>{
// 	console.log(req.params.id)
// 	client.query(`select * from requests r, books b where r.owner=$1 and r.bid=b.bid`, [req.params.id], (err, result) => {
// 		if (err) console.log("error in requests", err);
// 		else {
// 			res.json(result.rows);
// 		}
// 	})
// })
app.get("/Details/:bookId", function (req, res) {
	let bookId = req.params.bookId;
	client.query(`Select hardcover, add_details, condition, availability from uploaded_books where bid=$1`, [bookId], (err, result) => {
		if (err) console.log("error in details", err);
		else {
			res.json(result.rows[0]);
		}
	})
})

app.post("/RequestBook", function (req, res) {
	let date = new Date().toJSON().slice(0, 10);
	client.query(`INSERT INTO requests (date_req, owner, target_user, bid)
                VALUES ($1, $2, $3, $4) RETURNING TRUE`, [date, req.body.owner, req.body.targetUser, req.body.bookId], (err, result) => {
		if (err) {
			res.json({ result: "failure" });
			console.log("ERROR OCCURRED WHILE REQUESTING BOOK \n", err)
		}
		else {
			if (result.rows[0].bool === true) {
				res.json({ result: "Success" });
			}
			else {
				res.json({ result: "failure" });
			}
		}
	});
});


app.get("/bookssharing/:Id", function (req, res) {
	let userId = req.params.Id.slice(1);
	console.log(userId);
	client.query("select picture from books where bid in(select bid from uploaded_books where owner=$1 and availability=true)", [userId], (error, result) => {
		res.json(result.rows);
	})
});

app.get("/booksreading/:Id", function (req, res) {
	console.log("hit");
	let userId = req.params.Id.slice(1);
	console.log("44343", userId);
	client.query("select picture from books where bid in (select bid from shared_books where target_user=$1)", [userId], (error, result) => {
		res.json(result.rows);
	})

});

app.get("/reviewed/:Id", function (req, res) {
	console.log("hitted");
	let userId = req.params.Id.slice(1);
	console.log("ee", userId);
	client.query("select picture from books where bid in(select bid from reviews where id=$1 )", [userId], (error, result) => {
		res.json(result.rows);
	})
});

app.get("/booksgiven/:Id", function (req, res) {
	let userId = req.params.Id.slice(1);
	console.log("ttt", userId);
	client.query("select picture from books where bid in(select bid from shared_books where owner=$1)", [userId], (error, result) => {
		res.json(result.rows);
	})
});
app.get("/bookssharing/data/:Id/:file_name", function (req, res) {
	let userId = req.params.Id;
	let file_name = req.params.file_name;
	console.log("cdddl", userId, file_name);
	client.query("select a.author_name,u.date_uploade,u.hardcover,u.condition,u.add_details,b.book_name from books b,uploaded_books u,authors a,books_of_authors boa where u.bid=b.bid and b.picture=$1 and b.bid=boa.bid and boa.aid=a.aid", [file_name], (error, result) => {
		res.json(result.rows[0]);
	})
});

app.get("/booksreading/data/:Id/:file_name", function (req, res) {
	let userId = req.params.Id;
	// let id=path.parse(userId).name; // index
	console.log("sssss", userId);
	client.query("select book_name,add_details,author_name,name,date_shared from authors natural join (select * from books_of_authors natural join (select * from books natural join (select * from uploaded_books natural join(select * from shared_books full join users on users.id=shared_books.owner where shared_books.target_user=$1) as t0)as t1)as t2)as t3", [userId], (error, result) => {
		console.log(result.rows[0]);
		res.json(result.rows[0]);
	})
});

app.get("/reviewed/data/:Id/:file_name", function (req, res) {
	let userId = req.params.Id;
	let bid = req.params.file_name;
	bid = bid.split('.')[0];
	console.log("sssss", userId, bid);
	client.query("select author_name,book_name,synopsis,review,date from authors natural join (select * from books_of_authors natural join (select * from books natural join (select * from reviews where bid=$1 and id=$2)as t1)as t2)as t3", [bid, userId], (error, result) => {
		console.log(result.rows[0]);
		res.json(result.rows[0]);
	})
});

app.get("/booksgiven/data/:Id/:file_name", function (req, res) {
	let userId = req.params.Id;
	let bid = req.params.file_name;
	bid = bid.split('.')[0];
	console.log("ssssstttt", userId, bid);
	client.query("select name,book_name,author_name,add_details,condition,hardcover,date_shared from users natural join (select target_user as id,author_name,book_name,date_shared,condition,hardcover,add_details from authors natural join (select * from books_of_authors natural join (select * from books natural join (select * from uploaded_books natural join (select * from shared_books where bid=$1 and owner=$2)as t0) as t2)as t3)as t4)as t5", [bid, userId], (error, result) => {
		console.log(result.rows[0]);
		res.json(result.rows[0]);
	})
});
//  app.get("/booksreading/data/:Id", function (req, res) {
//      let userId = req.params.Id.slice(1);
//     client.query("select picture from books where bid in (select bid from shared_books where target_user=$1)",[userId],(error,result)=>{
//      res.json(result.rows);
//    })

//  });

//  app.get("/reviews/data/:Id", function (req, res) {
//      let userId = req.params.Id.slice(1);
//     client.query("select picture from books where bid in(select bid from reviews where owner=$1 )",[userId],(error,result)=>{
//      res.json(result.rows);
//    })
//  });

//  app.get("/booksgiven/data/:Id", function (req, res) {
//      let userId = req.params.Id.slice(1);
//     client.query("select picture from books where bid in(select bid from shared_books where owner=$1)",[userId],(error,result)=>{
//      res.json(result.rows);
//    })
//  });


app.get('/CheckAvailability/:bookId', function (req, res) {
	client.query('SELECT availability FROM uploaded_books where bid=$1', [req.params.bookId], (err, result) => {
		if (err) console.log("error occured while CHECKING AVAILABILITY\n", err);
		else {
			res.json(result.rows[0]);
		}
	})
})

