// Third party modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new Schema({
     username: {
          type: 'String',
          required: [true, "Username is required"],
          trim: true,
          minlength: [7, "Username should have atleast 7 characters"],
     },
     email: {
          type: 'String',
          required: [true, "Email is required"],
          trim: true,
          unique: true,
          lowercase: true,
          validate: [(val) => {
               return isEmail(val) ? true: false;
          }, "Email is not valid"]
     },
     password: {
          type: 'String',
          required: [true, "Password is required"],
          minlength: [7, "Password should have atleast 7 characters"],
     },
     joined: {
          type: 'Date',
          default: new Date(),
     },
});

userSchema.pre("save", async function(next) {
     // this will refer to the newly created instance of User
     const hashedPassword = await bcrypt.hash(this.password, 10);
     this.password = hashedPassword;
     next();
})

userSchema.statics.login = async function(email, password) {
     const user = await this.findOne({email});
     if(user) {
          const matched = await bcrypt.compare(password, user.password);
          if(matched) {
               return user;
          }
          // Wrong password
          throw new Error("Invalid credentials");
     }
     // User not found
     throw new Error("Invalid credentials");
}

module.exports = mongoose.model('User', userSchema);
