# Fragile
#	NodeJS 

* On attaque enfin le concret !
* NodeJs est un moteur Javascript totalement autonome crée à partir du moteur V8 de Google Chrome
* Durant toute le cours sur les bases de JS, j'ai utilisé NodeJs pour exécuter du Js dans mon terminal
* Sans faire trop d'historique, on va directement mettre les mains dans le cambouis !

#	Serveur ou Client

* On peut utiliser NodeJS autant en serveur qu'en "compilateur" (transpileur) pour une application cliente (navigateur).
* On l'utilise presque pour tout maintenant :
- Serveur
- Client
- Script d'automatisations
- Des tests unitaires
- Application Mobile
- Application bureau
- etc...
- Le terminal que j'utilise est fait en React+Redux à compilé par NodeJs !

#	Installation

nodejs.com
installation de npm

* Pendant que ça installe sur vos machines, je vais m'occuper de faire une démo

#	Comment créer son premier projet NodeJs

https://www.tutorialspoint.com/nodejs/nodejs_interview_questions.htm

* On va voir les bases puis passer aux choses sérieuses !

```
mkdir NomProjet
cd NomProjet
```

* Puis

```
npm init
```

```
touch index.js
nano index.js
```

```
var http = require('http');
var server = http.createServer(function(req, res) {
	res.writeHead(200);
	res.end('Wow such great server');
});
server.listen(8080);
```

*	package.json
package.json est présent dans le répertoire racine de toute application / module Node et est utilisé pour définir les propriétés d'un package.
	name -  nom du paquet
	version - version du paquet
	description - description du paquet
	homepage - page d'accueil du paquet
	author - auteur du paquet
	contributors - nom des contributeurs au package
	dependencies - liste des dépendances. npm installe automatiquement toutes les dépendances mentionnées ici dans le dossier node_module du paquet.
	repository - type de référentiel et URL du paquet
	main - point d'entrée du paquet
	keywords - mots clés



* Donc voici la base de la base de NodeJs
* On va majoritairement travailler en ES5
* On ne va pas aller plus loin pour le moment, je vais d'abord vous montrer comment importer des modules

#	Les modules 



# Moleculer

* La base de Moleculer

```
cd microservices
```

* Installer les dépendances

```
npm install
```

* Démarrer le serveur

```
npm start
```

* Executer un service

```
call "greeter.welcome" --name David
```

# API
## C'est quoi une API ?
*	url
*	ensemble d'url depuis des clients pour exécuter des opérations sur un base de données

## Comment ça marche ?
*	GET/POST/PATCH/DELETE (la base)
*	Query / Body 

## Comment on écrit et on test ?
* Téléchargez et installez PostMan


# Atelier API
* On ne vera que les bases
* On n'y verra pas de sécurité, par exemple l'authentification par token
* On verra uniquement le fonctionnement d'un serveur microservice pour créer notre api
* Je vous invite à vous amuser plus tard avec cet outil pour créer vos propres projets
* Utilisation d'une librairie qui va gérer la base de données avec un json.
https://github.com/typicode/lowdb

* Nous allons écrire une API de chat
- Créer un utilisateur
- Envoyer un message via un utilisateur
- Lire les derniers messages

# Evaluation

* 	Vous allez écrire une API de gestion d'un magasin de jeux vidéo
- Créer/Modifier/Supprimer un produit
	-	Un produit peut être visible
	-	Un produit a un stock, un prix, un nom, une description
- Récupérer la liste des produits
- Créer une commande
- Ajouter/Supprimer un produit de la commande
- Enregistrer la commande 

* 	Comment vous allez être évalué
- Le code doit être sur un dépot GitHub et m'être transmis avant Lundi matin prochain
- J'exécuterai un test unitaire qui va tester votre routes avec les paramètres spécifiés et vérifier que tout marche bien
- La manière dont vous avez découper votre API en services, le moins de code réutilisé, et d'autres critères.
- Je regarderai votre code, j'en jugerai de la qualité
- Plus vite je reçois, plus vu je noterai mais je communiquerai vos notre Lundi prochain

