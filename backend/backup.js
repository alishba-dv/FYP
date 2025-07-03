// backup.js
require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');

const DB_NAME = 'Furliva'; // Your database name from Atlas
const BACKUP_DIR = path.resolve(__dirname, 'backups');
const USERNAME = process.env.MONGO_USERNAME || 'yourUsername'; // MongoDB Atlas username
const PASSWORD = process.env.MONGO_PASSWORD || 'yourPassword'; // MongoDB Atlas password
const CLUSTER = process.env.MONGO_CLUSTER || 'cluster0.pp75j.mongodb.net'; // Your cluster address
const URI = process.env.MONGO_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/${DB_NAME}`;

//  Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR);
}

// Backup function
const backupDatabase = () => {
  // Build mongodump command
  const dumpCmd = `mongodump --uri="${URI}" --out="${BACKUP_DIR}/${DB_NAME}_${new Date().toISOString().slice(0, 10)}"`;
  //  Start backup process
  console.log(`🔁 Starting backup: ${dumpCmd}`);
  exec(dumpCmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Backup error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.warn(`⚠️ Backup warning: ${stderr}`);
    }
    console.log(`✅ Backup completed: ${BACKUP_DIR}/${DB_NAME}_${new Date().toISOString().slice(0, 10)}`);
  });
};

//  Cron job to run the backup every 15 days at 3:00 AM
cron.schedule('0 3 1,16 * *', () => {
  console.log('🔁 Running scheduled backup every 15 days at 3:00 AM...');
  backupDatabase();
});

//  Export the backup function for external use
module.exports = { backupDatabase };
