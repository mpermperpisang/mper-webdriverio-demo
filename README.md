# mper-wdio-demo

#### Good quote to start the code
```
Junior developers take simple requirements and create complex code
Senior developers take complex requirements and create simple code
```

#### DISCLAIMER: I'm using MacBook Pro M1, so I cannot join NodeJS + Chrome (etc) docker. So I choose to install NodeJS in local instead of using Docker.

## Preparation
### Installation
- [x] Nodejs >= 18.x.x
- [x] Docker
- [x] Docker Compose

### Dependencies
`make deps` (first setup only)</br>
`make ci-deps` (every after **git pull origin master**)<br/><br/>
*Note: Please change password in .env (before trying to run)

## Running sample
### Web
#### With Docker
##### Browser Chrome
`make dockerChrome` or `make dockerChrome tags=@sample`

##### Browser Firefox
`make dockerFirefox` or `make dockerFirefox tags=@sample`

### API
#### Without Docker
1. `npm ci`
2. `npm run wdio`

#### With Docker
1.
