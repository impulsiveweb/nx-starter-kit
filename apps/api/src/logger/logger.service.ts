import {
  forwardRef,
  Inject,
  Injectable,
  LoggerService as Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { appendFile, open } from "fs";
import { join } from "path";
import * as dayjs from "dayjs";

const DEBUG = "DEBUG";
const INFO = "INFO";
const WARNING = "WARNING";
const ERROR = "ERROR";
const VERBOSE = "VERBOSE";

const _allowed_log_types: any = {
  DEBUG: [DEBUG, INFO, WARNING, ERROR],
  INFO: [INFO, WARNING, ERROR],
  WARNING: [WARNING, ERROR],
  ERROR: [ERROR],
  VERBOSE: [DEBUG, INFO, WARNING, ERROR],
};

@Injectable()
export class LoggerService implements Logger {
  private level: string;

  constructor(
    @Inject(forwardRef(() => ConfigService)) private config: ConfigService
  ) {
    this.level = config.get("LOG_LEVEL");
  }
  private _log(level: string, message: string, stack: any) {
    if (_allowed_log_types[this.level].indexOf(level) !== -1) {
      this._write({
        message: this._format(level, message, stack),
      });
    }
  }

  private _write(data: any) {
    const fileName: string =
        dayjs().format(
          this.config.get("LOG_FILE_NAME_FORMAT") || "YYYY-MM-DD"
        ) + ".log",
      filePath: string = join(this.config.get("LOG_PATH"), fileName),
      message: string = data.message + "\r\n";

    open(filePath, "a+", () => {
      appendFile(filePath, message, () => {});
    });
  }

  private _format(level: string, message: any, stack: any = null): string {
    if (stack) {
      message = stack;
    }

    if (!message) {
      return;
    }

    if (typeof message !== "string" && typeof message.message !== "undefined") {
      message = message.message;
    }

    return `[${dayjs().format("YYYY-MM-DD-HH-mm-ss")}] ${level}: ${message}`;
  }

  log(message: string, stack: any = null) {
    this._log(INFO, message, stack);
  }

  error(message: string, stack: any = null) {
    this._log(ERROR, message, stack);
  }

  warn(message: string, stack: any = null) {
    this._log(WARNING, message, stack);
  }

  debug(message: string, stack: any = null) {
    this._log(DEBUG, message, stack);
  }

  verbose(message: string, stack: any = null) {
    this._log(VERBOSE, message, stack);
  }
}
