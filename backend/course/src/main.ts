import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {json, urlencoded} from "express";
import * as bodyParser from 'body-parser';

const firebaseConfig = {

  apiKey: "AIzaSyAxMXdI3E6fZ15xMTE7NK81h6WkD_cEK9s",

  authDomain: "piscourse-59b18.firebaseapp.com",

  projectId: "piscourse-59b18",

  storageBucket: "piscourse-59b18.firebasestorage.app",

  messagingSenderId: "738828055028",

  appId: "1:738828055028:web:580d30b6608c1ed9ec89a1",

  measurementId: "G-7PJLR1WBP5"

};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const firebase = initializeApp(firebaseConfig);
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();
