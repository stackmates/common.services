
# Services

Right now there is only JSON token and schema for an ecommerce solution but the intent is to not create any formal solution or product but a collcetion of micro-services that can work together.

## The plan

As with client code is split between common and domain centric. Create services that can be run as **one app** or spilt out into **micro-services** thank to Seneca.

The common directory serves as a staging area until ideas for service are settled. Inside the domain will be code particular to your domain and the **app** that serves as configuring the **connection layer** to the outside world.


## Install

```
git clone https://github.com/stackmates/common.services services
mkdir services/domain
cd services/domain
git clone https://github.com/stackmates/feed-the-backs [your-project]
cd ..
```

### Try it out the fast way

```
  cd services
  npm i
  node app
```

Check out

```
  http://localhost:3000/salestax  
```

You should see

```
  {"total":123}
```


### Testing
```
  npm test
```

Should result in passing auth tests


## Develop with Vagrant and Docker

### Install 

Vagrant :
```
https://www.vagrantup.com/downloads
```

Virtualbox:
```
https://www.virtualbox.org/wiki/Downloads
```


### Start vagrant

```bash
cd provision
vagrant up
```

### Run docker

Edit  DOCKERFILE 

```
WORKDIR domain/[your-project]
```

ssh into the Vagrant box
```bash
vagrant ssh
cd /src
fig run web npm install && fig up
```

If everything works run

```bash
fig run web npm install && fig up -d
```

#### Not working?

Edit the fig.yml to replace supervisor with node app.js so you can see what the problem is 

replace
```
  command: /usr/bin/supervisord
```

with
```
  command: node app.js
```


#### If everything is Hapi in your browser:

```
http://192.168.50.4:8080/
```

Launch node-inspector:
```
http://192.168.50.4:8081/debug
```

Check Elasticsearch:
```
http://192.168.50.4:9200
```

## helpful commands

```bash

  fig build
  fig run web npm install && fig up -d  

  fig run web ls -A
```


```bash
fig run web npm prune
fig run web npm install

fig run db /bin/sh -c "mongo 192.168.50.4:27017"

```

The credit for this config goes to [Nodejs-Express-Mongodb-Elasticsearch](https://github.com/kristofsajdak/vagrant-fig-nodejs-mongodb-elasticsearch)

