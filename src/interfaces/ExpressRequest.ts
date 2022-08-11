import express from 'express';

export interface ExpressRequest<T> extends express.Request {
	body: T;
}
