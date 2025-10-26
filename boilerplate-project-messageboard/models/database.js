const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.NODE_ENV === 'test' 
      ? 'mongodb://localhost:27017/anonymous_message_board_test'
      : process.env.DB || 'mongodb://localhost:27017/anonymous_message_board';
    
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    // In test environment, just warn but continue
    if (process.env.NODE_ENV === 'test') {
      console.warn('Continuing without database connection for testing...');
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;