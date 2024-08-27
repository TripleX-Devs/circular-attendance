import express , {Request , NextFunction , Response } from 'express';
import cors from 'cors';
import { PORT } from './config/config';
import createHttpError from 'http-errors';

const app = express();
app.use(cors());
app.use(express.json());


app.get('/' , (req: Request , res: Response , next: NextFunction) => {
    res.json({message: 'Hello World'});
});


app.use((err: Error , req: Request , res: Response , next: NextFunction) => {
    if(err instanceof createHttpError.HttpError){
        res.status(err.status).json({message: err.message});
    }
})

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`);
})