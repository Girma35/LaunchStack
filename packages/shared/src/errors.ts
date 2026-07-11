export class DomainError extends Error {
  public readonly code: string;

  public constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "DomainError";
  }
}

export class AuthorizationError extends DomainError {
  public constructor(message = "You are not authorized to perform this action.") {
    super("AUTHORIZATION_ERROR", message);
    this.name = "AuthorizationError";
  }
}

export class ValidationError extends DomainError {
  public constructor(message = "Validation failed.") {
    super("VALIDATION_ERROR", message);
    this.name = "ValidationError";
  }
}
