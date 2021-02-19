const http = require('http');
const httpie = require('httpie');

module.exports = async (request, response) => {
  const username = request.query.username;
  const type = request.query.type;
  const suffix = request.query.suffix;

  if (!username) {
    return response
      .status(500)
      .send({ error: "'username' must be set" });
  }

  let message = 'support me';
  try {
    const { data } = await httpie.get('https://www.buymeacoffee.com/' + username);
    // const { data } = {data: '44 supporters'};
    // console.log(data);

    const regex = /(\d+ supporters)/;
    const match = regex.exec(data);
    console.log(match[0]);

    message = match[0];
  } catch (e) {
    console.error(e);
  }

  response.send({
    schemaVersion: 1,
    label: "Buy me a coffee",
    namedLogo: "buy-me-a-coffee",
    message: message,
    logoColor: "000000",
    labelColor: "FFDD00",
    color: "2c2f33",
    cacheSeconds: 60 * 60 * 8 // 8 hours
  });
};

