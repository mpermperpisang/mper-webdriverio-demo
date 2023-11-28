# syntax=docker/dockerfile:1
FROM node:16-slim

WORKDIR /project

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
