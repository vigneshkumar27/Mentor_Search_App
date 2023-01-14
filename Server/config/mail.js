const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service:"hotmail",
    auth:{
        user:"mentorcruise@outlook.com",
        pass:"NODEmailer#9"
    }
})

const registrationmail = (email)=>{
     const registration = {
       from:"mentorcruise@outlook.com",
       to:email,
         subject:"Registration successfull",
         text:"Thank you for register with mentor cruise....Be Prouductive with our mentors slot available"
     }
      transporter.sendMail(registration)
    

}

const mentorassignedmail = (email)=>{
    const mentor = {
        from:"mentorcruise@outlook.com",
        to:email,
        subject:"Mentor assigned successfully",
        text:"Thank you for your application.You're successfully assigned to the mentor"
    }
    transporter.sendMail(mentor)
}
const menteeapplicationmailtomentor = (email,applicantdetails)=>{
    const menteedetails={
        from:"mentorcruise@outlook.com",
        to:email,
        subject:"New Mentee application received",
        text:`A new mentee has been subscribed to you, the mentee details are given below
        name:${applicantdetails.firstname}+${applicantdetails.lastname},
        email:${applicantdetails.email},
        country:${applicantdetails.country},
        about:${applicantdetails.about}

        You can Start the sessions with the mentee
        
        `
        
    }
    transporter.sendMail(menteedetails)
}
module.exports.registrationmail = registrationmail
module.exports.mentorassignedmail = mentorassignedmail
module.exports.menteeapplicationmailtomentor = menteeapplicationmailtomentor;