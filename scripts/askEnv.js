// scripts/askEnv.js
import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'GOOGLE_TYPE',
    message: 'Enter your Google Calendar API type:',
    default: 'service_account',
    required: true,
  },
  {
    type: 'input',
    name: 'GOOGLE_PRIVATE_KEY',
    message: 'Enter your Google Calendar API private key:',
    mask: '*',
    default: '-----BEGIN PRIVATE KEY-----...',
    required: true,
    validate: (value) => {
      if (!value) return 'Private key is required';
      if (!value.includes('-----BEGIN PRIVATE KEY-----')) return 'Private key must start with -----BEGIN PRIVATE KEY-----';
      if (!value.includes('-----END PRIVATE KEY-----')) return 'Private key must end with -----END PRIVATE KEY-----';
      return true;
    }
  },
  {
    type: 'input',
    name: 'GOOGLE_CLIENT_EMAIL',
    message: 'Enter your Google Calendar API client email:',
    required: true,
    validate: (value) => {
      if (!value) return 'Client email is required';
      if (!value.includes('@')) return 'Client email must contain @';
      return true;
    }
  },
  {
    type: 'input',
    name: 'GOOGLE_CALENDAR_ID',
    message: 'Enter your ID of the google calendar you want to use:',
    required: true,
    validate: (value) => {
      if (!value) return 'Calendar ID is required';
      if (!value.includes('@group.calendar.google.com')) return 'Calendar ID must contain @group.calendar.google.com';
      return true;
    }
  },
  {
    type: 'input',
    name: 'GPS_LATITUDE',
    message: 'Enter your latitude for weather forecast:',
    default: '35.8175',
    validate: (value) => {
      if (!value) return 'Latitude is required';
      if (isNaN(value)) return 'Latitude must be a number';
      return true;
    }
  },
  {
    type: 'input',
    name: 'GPS_LONGITUDE',
    message: 'Enter your longitude for weather forecast:',
    default: '10.5375',
    validate: (value) => {
      if (!value) return 'Longitude is required';
      if (isNaN(value)) return 'Longitude must be a number';
      return true;
    }
  },
  {
    type: 'input',
    name: 'TIMEZONE',
    message: 'Enter your timezone:',
    default: 'Europe/Prague',
    validate: (value) => {
      if (!value) return 'Timezone is required';
      if (!value.includes('/')) return 'Timezone must contain / like Europe/Prague';
      return true;
    }
  }
];

const askEnv = async () => (await inquirer.prompt(questions))

export default askEnv;
