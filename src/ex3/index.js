#!/usr/bin/env node
import CliApp from './scripts/CliApp.mjs';
const cli = new CliApp();
cli.init();
cli.run();