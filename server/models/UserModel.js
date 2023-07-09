import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    unique: false,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    unique: false,
  },
  email: {
    type: String,
    required: [true, 'Please provide a unique email.'],
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: [true, 'Please provide a unique mobile number.'],
    unique: true,
  },
  userType: {
    type: Number,
    required: true,
  },
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);
