#!/usr/bin/env node
import CliApp from './scripts/CliApp.mjs';
import TodoWebServer from './server.js';

export function CliAppRun()
{
    const cli = new CliApp();
    cli.init();
    cli.run();
}

export function WebServer()
{
    const server = TodoWebServer();
}