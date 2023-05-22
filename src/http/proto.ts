// Types for the JSON structures specific to Hrana over HTTP.

export * from "../proto.js";
import { int32, Error, Stmt, StmtResult, Batch, BatchResult, DescribeResult } from "../proto.js";

// ## Execute requests on a stream

export type PipelineRequestBody = {
    "baton": string | null,
    "requests": Array<StreamRequest>,
}

export type PipelineResponseBody = {
    "baton": string | null,
    "base_url": string | null,
    "results": Array<StreamResult>
}

export type StreamResult =
    | StreamResultOk
    | StreamResultError

export type StreamResultOk = {
    "type": "ok",
    "response": StreamResponse,
}

export type StreamResultError = {
    "type": "error",
    "error": Error,
}

// ## Requests

export type StreamRequest =
    | CloseStreamReq
    | ExecuteStreamReq
    | BatchStreamReq
    | SequenceStreamReq
    | DescribeStreamReq
    | StoreSqlStreamReq
    | CloseSqlStreamReq

export type StreamResponse =
    | CloseStreamResp
    | ExecuteStreamResp
    | BatchStreamResp
    | SequenceStreamResp
    | DescribeStreamResp
    | StoreSqlStreamResp
    | CloseSqlStreamResp

// ### Close stream

export type CloseStreamReq = {
    "type": "close",
}

export type CloseStreamResp = {
    "type": "close",
}

// ### Execute a statement

export type ExecuteStreamReq = {
    "type": "execute",
    "stmt": Stmt,
}

export type ExecuteStreamResp = {
    "type": "execute",
    "result": StmtResult,
}

// ### Execute a batch

export type BatchStreamReq = {
    "type": "batch",
    "batch": Batch,
}

export type BatchStreamResp = {
    "type": "batch",
    "result": BatchResult,
}

// ### Execute a sequence of SQL statements

export type SequenceStreamReq = {
    "type": "sequence",
    "sql"?: string | null,
    "sql_id"?: int32 | null,
}

export type SequenceStreamResp = {
    "type": "sequence",
}

// ### Describe a statement

export type DescribeStreamReq = {
    "type": "describe",
    "sql"?: string | null,
    "sql_id"?: int32 | null,
}

export type DescribeStreamResp = {
    "type": "describe",
    "result": DescribeResult,
}

// ### Store an SQL text on the server

export type StoreSqlStreamReq = {
    "type": "store_sql",
    "sql_id": int32,
    "sql": string,
}

export type StoreSqlStreamResp = {
    "type": "store_sql",
}

// ### Close a stored SQL text

export type CloseSqlStreamReq = {
    "type": "close_sql",
    "sql_id": int32,
}

export type CloseSqlStreamResp = {
    "type": "close_sql",
}