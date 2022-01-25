
1. Execute the following command from this directory

        docker-compose -f kafka-single-node.yml up -d

2. Check if the containers are up and running

        docker ps


3. To shutdown and remove the setup, execute this command in the same directory

        docker-compose -f kafka-single-node.yml down



# how to run the app

## running publisher

    set DEBUG=*
    ts-node src\producer.ts

## running consumer

    set DEBUG=*
    ts-node src\consumer.ts



    
---
