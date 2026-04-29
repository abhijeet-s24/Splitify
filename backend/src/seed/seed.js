const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Group = require("../models/Group");
const GroupMember = require("../models/GroupMember");
const Expense = require("../models/Expense");

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/splitwise-clone");
    // await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB Connected");

    // Clear DB
    await User.deleteMany();
    await Group.deleteMany();
    await GroupMember.deleteMany();
    await Expense.deleteMany();

    // Users
    const users = await User.insertMany([
      {
        name: "Aman",
        email: "aman@test.com",
        password: await bcrypt.hash("123456", 10),
      },
      {
        name: "Rahul",
        email: "rahul@test.com",
        password: await bcrypt.hash("123456", 10),
      },
      {
        name: "Ravi",
        email: "ravi@test.com",
        password: await bcrypt.hash("123456", 10),
      },
    ]);

    const [aman, rahul, ravi] = users;

    // Group
    const group = await Group.create({
      name: "Goa Trip",
      createdBy: aman._id,
      inviteCode: "GOA123",
    });

    // Memberships
    await GroupMember.insertMany([
      { group: group._id, user: aman._id, role: "admin" },
      { group: group._id, user: rahul._id },
      { group: group._id, user: ravi._id },
    ]);

    // Expenses
    await Expense.insertMany([
      {
        group: group._id,
        paidBy: aman._id,
        amount: 900,
        description: "Hotel",
      },
      {
        group: group._id,
        paidBy: rahul._id,
        amount: 300,
        description: "Food",
      },
    ]);

    console.log("Seeding done 🌱");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();