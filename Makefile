build:
	docker build -t node_chat .
run:
	docker run --name chat_container -dp 3000:3000 node_chat 
start-a:
	docker start -a chat_container
stop:
	docker stop chat_container
db:
	docker-compose up -d db
stop_db:
	docker-compose stop db