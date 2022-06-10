#!/usr/bin/env node
import CliApp from './scripts/CliApp';
import TodoWebServer from './server';

export function CliAppRun() {
  const cli = new CliApp();
  cli.init();
  cli.run();
}

export function WebServer() {
  TodoWebServer();
}
