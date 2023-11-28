# Parameters
NPM=npm
NPMCI=$(NPM) ci
NPMRUN=$(NPM) run
DOCKERCMD=docker
DOCKERRM=$(DOCKERCMD) rm
DOCKERRMI=$(DOCKERCMD) rmi

# Dependencies section BEGIN
deps: cp-env ci-deps

ci-deps:
	@$(NPMCI) --force
# Dependencies section END

# Docker section BEGIN
dockerAPI: docker-build docker-run

dockerChrome: docker-up run-chrome docker-down open-reporter

dockerFirefox: docker-up run-firefox docker-down open-reporter

docker-build:
	docker build --no-cache -t api-test/node .

docker-run:
	docker run --name test_api api-test/node npm run testAPI

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-rm: container-rm images-rm

# remove all docker container
container-rm:
	@$(DOCKERRM) -f $$(docker ps -aq)
	@echo "Docker container successfully removed"

# remove all docker images
images-rm:
	@$(DOCKERRMI) -f $$(docker images -aq)
	@echo "Docker images successfully removed"
# Docker section END

# Automation run section BEGIN
run-chrome: run-test-chrome run-reporter
run-firefox: run-test-firefox run-reporter

run-test-chrome:
	@$(NPMRUN) testChrome "$(tags)" || true

run-test-firefox:
	@$(NPMRUN) testFirefox "$(tags)" || true

run-reporter:
	@$(NPMRUN) reporter || true

open-reporter:
	@$(NPMRUN) open-reporter
# Automation run section END

# Others section BEGIN
cp-env:
	[ -f .env ] && echo ".env already exist" || cp env.sample .env
