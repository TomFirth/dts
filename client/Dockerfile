# Stage 1 - build
FROM node:18 AS build

WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - run
FROM node:18

WORKDIR /app
COPY --from=build /app ./
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
