declare namespace graphene_pk11 {
    type Callback<ErrorType, ResultType> = (error: ErrorType | null, data: ResultType | null) => void;
}