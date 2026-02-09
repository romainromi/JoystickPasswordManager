const express = require("express");
const passwordRoutes = require("./routes/password.routes");

const app = express();
app.use(express.json());

app.use("/passwords", passwordRoutes);

app.listen(3000, () => {
	console.log("Serveur lancé sur http://localhost:3000");
});
