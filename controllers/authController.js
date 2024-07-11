const User = require("../models/userModel");
const Customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const {sendOtpMailer} = require("../mailers/otpMailer");
const Otp = require("../models/otpModel");
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

const sendOTP = async (req, res) => {
  try {
    const otp = otpGenerator.generate(6, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false});
    const hashedOtp = await bcrypt.hash(otp, 10);

    let otpRecord = await Otp.findOne({ email: req.body.email });
    if (!otpRecord) {
      otpRecord = new Otp({ otp: hashedOtp, email: req.body.email, expiry: dayjs().tz('Asia/Kolkata').add(5, "minute") });
    }
    else{
      otpRecord.otp = hashedOtp;
      otpRecord.expiry = dayjs().tz('Asia/Kolkata').add(5, "minute");
    }
    await otpRecord.save();
    
    sendOtpMailer(otp, req.body.email);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const otp = await Otp.findOne({ email: req.body.email });
    if (!otp || dayjs().tz('Asia/Kolkata').isAfter(otp.expiry)) {
      return res.status(400).json({ message: "OTP not found" });
    }

    const isValid = await bcrypt.compare(req.body.otp, otp.otp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await Otp.deleteOne({ email: req.body.email });
    let user = await User.findOne({email : req.body.email});
    if (!user) {
      user = new User({ email: req.body.email, phoneNumber: req.body.phoneNumber });
      await user.save();

      const newCustomer = new Customer({ userId: user._id });
      await newCustomer.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    
    return res
    .status(200)
      .json({ message: "OTP verified successfully", userId: user._id, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { sendOTP, verifyOTP };
