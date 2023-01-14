
const express = require("express");
const app = express();
const User = require("./models/user");
const connectDB = require("./config/db");
const cors = require("cors");
const Mentor = require("./models/mentor");
const authorize = require("./middlewares/protect");
const protect = require("./middlewares/protect");
const mail = require("./config/mail");
const mentor = require("./models/mentor");

app.use(express.json());
app.use(cors());

connectDB();


app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(email)
  const enteredMail = email;
  const user = await User.findOne({ email: enteredMail });
  if (!user) {

    const user = await User.create(req.body);
    const token = await user.getSignedJwtToken();
    mail.registrationmail(email)

    res.json({ returnedToken: token });
  }
  else {
    res.send("Email already exists")
  }
});


//Login API
app.post("/login", async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  const enteredMail = email;
  const enteredPassword = password;

  const user = await User.findOne({ email: enteredMail });
  if (user) {
    const isMatch = await user.matchPassword(enteredPassword);
    if (isMatch) {
      const token = await user.getSignedJwtToken()
      ///////
      let currentuser = await User.findOne({ email: enteredMail })
      currentuser = { name: currentuser.name, email: currentuser.email, subscriptions: currentuser.cartProducts }
      ////////
      ////console.log(currentuser)
      res.json({ returnedToken: token, currentuser });
    } else {
      res.send("Invalid Password");
    }
  } else {
    res.send("Invalid Email ID");
  }
});

// Creating a mentor with admin authorizations
app.post("/mentor", protect, authorize, async (req, res) => {
  console.log("headers --- ", req.headers.authorization);
  const product = await Mentor.create(req.body);
  res.json({ product, created: true });
});

// Getting all the Mentors
app.get("/mentors", async (req, res) => {
  const mentors = await Mentor.find();
  res.json({ mentors });
});

// Getting individual Mentor details
app.get("/mentors/:mentorId", async (req, res) => {
  const mentor = await Mentor.findById(req.params.mentorId);
  res.json({ mentor });
});

//Subscribing to mentor

app.post("/assignMentorToUser/:mentorId", protect, async (req, res, next) => {

  const applicantdata = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, country: req.body.country, about: req.body.about }
  const mentormail = await Mentor.findById({ "_id": req.params.mentorId })
  console.log(mentormail.email, "This is the data expensive")
  //Uncomment the mailer below
  //mail.menteeapplicationmailtomentor(mentormail.email,applicantdata)
  const cuser = await User.findById(req.user.id)

   //Uncomment the mailer below
   
  //mail.mentorassignedmail(cuser.email)
  const user = await User.findById(req.user.id).select("cartProducts");

  user.cartProducts.push(req.params.mentorId);
  const userToBeUpdated = await User.findByIdAndUpdate(req.user.id, {
    cartProducts: user.cartProducts,
  });


  res.json({ success: true, userToBeUpdated });
});

//Getting Subscribed Mentors


app.get("/subscriptions", protect, async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .select("cartProducts")
    .populate("cartProducts");
  let mentors = user.cartProducts;
  let id = []
  let mentor = []
  for (let i of mentors) {
    if (!(id.includes(i._id))) {
      id.push(i._id)
      mentor.push(i)
    }
  }
  console.log("thsi is the unique")
  console.log(mentor)
  res.json(mentor);
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});