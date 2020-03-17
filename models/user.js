const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    budgets: [{
        budgetName: {type: String, required: true},
        budgetTotal: {type: Number, min: 1, required: true},
        transactions: [{
            transactionName: {type: String, required: true},
            transactionAmount: {type: Number, min:1, required:true},
            category: {type: String, required: true}
        }], 
        categories: [{
            categoryName: {type: String, required: true},
            categoryAmount: {type: Number, min: 1, required: true}
        }],
        createdAt: {type: Date, default: Date.now}
    }],
    joined: { type: Date, default: Date.now }
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;