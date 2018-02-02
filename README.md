# GraphQL Template

Quick start for React/GraphQL projects.

to test locally:

```
cd sub/data
sls offline start
```

this will run the data on port 9000 (e.g., http://localhost:9000)

then, in another terminal window:

```
cd sub/app
yarn start
```

this will run the app on port 3000 (e.g., http://localhost:3000)


## Sample Data Queries

query example:
```
$ curl http://localhost:9000/data \
	-X POST \
	-H "Content-Type: application/json" \
	-d '{ "query": "{ records { title } }" }'
	
```

mutation example:
```
$ curl http://localhost:9000/data \
	-X POST \
	-H "Content-Type: application/json" \
	-d '{"query": "mutation($title:String!){insertRecords(records:[{title:$title}]){title}}","variables":{"title":"New Record"}}'
	

```


TODO(zuspan):
* finish serverless implimentation
* finish web submodule