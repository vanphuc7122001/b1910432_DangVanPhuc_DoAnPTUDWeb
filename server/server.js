const app = require("./src/app");
require("dotenv").config();

// port
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
