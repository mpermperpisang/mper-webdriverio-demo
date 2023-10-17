# Parameters
NPM=npm
NPMCI=$(NPM) ci
NPMRUN=$(NPM) run

# Dependencies section BEGIN
deps: cp-env ci-deps

ci-deps:
	@$(NPMCI) --force
# Dependencies section END

# Docker section BEGIN
dockerChrome: docker-up run-chrome docker-down open-reporter

dockerFirefox: docker-up run-firefox docker-down open-reporter

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down
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
