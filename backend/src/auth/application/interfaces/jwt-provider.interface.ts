export interface IJwtProvider {
  sign(payload: any): string;
}
