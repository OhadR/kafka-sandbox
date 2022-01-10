
1. Execute the following command from this directory

        docker-compose -f kafka-single-node.yml up -d

2. Check if the containers are up and running

        docker ps


3. To shutdown and remove the setup, execute this command in the same directory

        docker-compose -f kafka-single-node.yml down



# how to run the app

## running publisher

    ts-node src\producer.ts

## running consumer

    ts-node src\consumer.ts

      

    
    DEBUG=*


    
---
![geo -mapping](/images/Image_5.jpg)

![photo explaining dynamic mapping and geo-mapping](/images/Image_6.jpg)

explanation about HOW elastic indexes locations (quad-trees).

Source: https://medium.com/@yatinadd/going-geospatial-with-elasticsearch-using-geo-points-plus-its-application-b013c638064e

---
Source: https://www.compose.com/articles/geofile-elasticsearch-geo-queries-2/


"We can add more to this query by defining another field called `relation`, which allows us to add spatial relation operators: `intersects`, `disjoint`, `within`, or `contains`. 
A handy guide to these is located [here](https://www.elastic.co/guide/en/elasticsearch/reference/2.4/geo-shape.html#spatial-strategy). 
The default value is intersects which in our case will give us all the cities within and on the border of our county. If we use a relation like disjoint, all the cities outside of King County will be counted."


# Migration 

## Migrate all assets to layers

    >ts-node src\migrateAssetsToLayers\migrationRunner.ts

for the migration sake, I reuse repo and types from `gvdl-repos-wrapper`. to get it, I had to add the `.npmrc` file.

there are assets that no layers are created out of them, from several reasons (bad assets, garbage, 'utilities-pole', etc.).
I skip them and print the number at the end of the run. (in R&D: 2800++).

Similarly, there are LAYERS that fail to index - mostly because of the `captureOn` and `region`. I count them, and print at the end, so it can be analyzed.
(in R&D: 100~).

---
`NewAssetMigrationRunner` - migrates all "old" assets from 'assets' alias to a new index (with new mapping). it also
has code to handle "problematic" assets.

`MigrationRunner` - traverse all assets (NOTE: from 'assets' alias. Make sure you work with the right index!) and generates
layers. then index the layers in 'layers'. We have methods to handle bad "captureOn" field (transform it to MM/dd/YYYY format)
and bad polygons - polygons with the same point 5 times.