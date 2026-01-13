import { ApiError } from "../types";

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "statusCode" in (error as any) &&
    typeof (error as any).statusCode === "number"
  );
}

export function extractErrorMessage(error: unknown): string {
  try {
    if (isApiError(error)) {
      return (error.message || error.error || "API error").toString();
    }

    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === "string") {
      return error;
    }

    if (typeof error === "object" && error !== null && "message" in (error as any)) {
      const msg = (error as any).message;
      if (typeof msg === "string") return msg;
    }

    return "An unknown error occurred";
  } catch (e) {
    return "An unknown error occurred";
  }
}

export function isNotFound(error: unknown): boolean {
  return isApiError(error) && (error.statusCode === 404 || /not\s*found/i.test(error.message));
}
