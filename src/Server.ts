import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import fileUpload from 'express-fileupload'
import cors from 'cors'
import mongoose from 'mongoose'

import express, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import { MONGO_URL } from '@shared/constants';


// Init express
const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload({
    createParentPath: true,
    // useTempFiles : true,
    safeFileNames: true,
    // tempFileDir : './src/tmp-backups/',
    preserveExtension: true,
}));
app.use(cors());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(StatusCodes.BAD_REQUEST).json({
        error: err.message,
    });
});

// Connect to Mongoose
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Export express instance
export default app;
