#!/usr/bin/env node
/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/extensions */
import CliApp from './scripts/CliApp.mjs';
import TodoWebServer from './server.js';

export function CliAppRun() {
  const cli = new CliApp();
  cli.init();
  cli.run();
}

export function WebServer() {
  TodoWebServer();
}
