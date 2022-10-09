import "dotenv/config"
import { initServer } from "./initializer"
import {preload } from "./preload"

preload()
  .then(() => {
    initServer();
  })
  .catch((err: Error) => {
    console.log(err);
  });
