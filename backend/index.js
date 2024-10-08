const express = require("express");
const app = express();

const authRoutes = require("./routes/auth-routes");
const chatRoutes = require("./routes/chat-routes")
const imageRoutes = require("./routes/image-routes")

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

//database connect
const PORT = process.env.PORT || 5000;
database.connect();




//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "https://synapse-ai.onrender.com",
		credentials: true,
	})
)


//auth routes
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/chat", chatRoutes)

app.use("/api/v1/image", imageRoutes)


//default route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

