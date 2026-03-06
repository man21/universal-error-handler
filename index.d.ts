export interface CustomMessage {
  code?: string;
  error?: string;
  message: string;
  category: string;
  statusCode: number;
}

export const CustomMessages: CustomMessage[];

export class AppError extends Error {
  statusCode: number;
  errorCode: string | null;
  isOperational: boolean;
  details: any;
  status: string;
  constructor(message: string, statusCode?: number, errorCode?: string | null, isOperational?: boolean, details?: any);
}

export class BadRequestError extends AppError { constructor(message?: string, errorCode?: string, details?: any); }
export class UnauthorizedError extends AppError { constructor(message?: string, errorCode?: string, details?: any); }
export class ForbiddenError extends AppError { constructor(message?: string, errorCode?: string, details?: any); }
export class NotFoundError extends AppError { constructor(message?: string, errorCode?: string, details?: any); }
export class ConflictError extends AppError { constructor(message?: string, errorCode?: string, details?: any); }
export class UnprocessableEntityError extends AppError { constructor(message?: string, errorCode?: string, details?: any); }
export class InternalServerError extends AppError { constructor(message?: string, errorCode?: string, details?: any); }

export class StatusCodeError extends Error {
  statusCode: number;
  constructor(statusCode: number);
}

export interface ConfigOptions {
  includeTimestamp?: boolean;
  includePath?: boolean;
  customDictionary?: CustomMessage[];
  defaultFormatter?: (err: AppError, req: any) => any;
}

export function configure(options: ConfigOptions): void;

export function getConfig(): ConfigOptions;

export function HttpErrorDetail(statusCode: number): { statusCode: number; message: string };

export function expressErrorMiddleware(err: any, req: any, res: any, next: any): void;

export function fastifyErrorMiddleware(error: any, request: any, reply: any): void;

export function asyncHandler(fn: Function): Function;

export function normalizeError(err: Error | any): AppError;

export function parseError(err: Error | number | string | any, customMessageOverride?: string | null, customDetails?: any): AppError;

export interface Logger {
  error(message?: any, ...optionalParams: any[]): void;
  warn?(message?: any, ...optionalParams: any[]): void;
  info?(message?: any, ...optionalParams: any[]): void;
  debug?(message?: any, ...optionalParams: any[]): void;
}

export function setLogger(customLogger: Logger): void;

export function getLogger(): Logger;

export function setupProcessCrashHandlers(server?: any): void;
