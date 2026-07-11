#!/usr/bin/env node
import { Command } from "commander";
import { parseEnv } from "@launchstack/shared";

const program = new Command();

program.name("launchstack").description("LaunchStack CLI").version("0.1.0");

program
  .command("validate-env")
  .description("Validate required environment variables")
  .action(() => {
    parseEnv(process.env);
    console.log("Environment variables are valid.");
  });

program.parse(process.argv);
