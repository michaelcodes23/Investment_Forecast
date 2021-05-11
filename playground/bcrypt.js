const bcrypt = require('bcrypt');

const salt_rounds = bcrypt.genSaltSync(10);

const password = 'playingwithbcrypt';

const hashedString = bcrypt.hashSync(password, salt_rounds);

const isMatch = bcrypt.compareSync('playingwithbcrypt',hashedString);

console.log(hashedString);

console.log(isMatch);