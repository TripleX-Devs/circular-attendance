up:
	docker-compose up

# Stop Docker Compose
reset:
	docker-compose down -v --rmi all && docker-compose rm -s

# clean all the unused volume
clean:
	docker volume prune -f

# start locally db
db:
	docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
# start service without the docker
start:
	pnpm db:migrate && pnpm db:generate && pnpm dev