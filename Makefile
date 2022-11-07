SERVICE_NAME=npg-finance-service
CURDIR=$(PWD)


local-build:
	echo "local build command"


# This will rebuild the docker container by using the cached image
rebuild:
	echo "Rebuilding container: $(SERVICE_NAME)"
	docker-compose -f $(CURDIR)/../npg-dev-tool/docker-compose.yaml kill $(SERVICE_NAME)
	docker-compose -f $(CURDIR)/../npg-dev-tool/docker-compose.yaml up -d --build $(SERVICE_NAME)




# This will not only rebuild the docker container but also rebuild the image before running the container
clean-rebuild:
	docker-compose -f $(CURDIR)/../npg-dev-tool/docker-compose.yaml kill $(SERVICE_NAME)
	docker rmi $(SERVICE_NAME) -f
	docker build -t $(SERVICE_NAME) .
	docker-compose -f $(CURDIR)/../npg-dev-tool/docker-compose.yaml up -d --build $(SERVICE_NAME)


stop:
	echo "Stopping container: $(SERVICE_NAME)"
	docker-compose -f $(CURDIR)/../npg-dev-tool/docker-compose.yaml stop $(SERVICE_NAME)


restart:
	echo "Restarting container: $(SERVICE_NAME)"
	docker-compose -f $(CURDIR)/../npg-dev-tool/docker-compose.yaml start $(SERVICE_NAME)
