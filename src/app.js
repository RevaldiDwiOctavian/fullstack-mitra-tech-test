import express from 'express';
import taskRoute from './routes/TaskRoute.js';

const app = express();

app.use(express.json());
app.use("/api", taskRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ready at: http://localhost:${PORT}`);
});