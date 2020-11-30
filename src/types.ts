export type CryptoData = string | Buffer;

export type Callback<ErrorType, ResultType> = (error: ErrorType | null, data: ResultType | null) => void;
