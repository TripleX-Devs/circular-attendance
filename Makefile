up:
	docker-compose up

# Stop Docker Compose
reset:
	docker-compose down -v --rmi all && docker-compose rm -s

# clean all the unused volume
clean:
	docker volume prune -f