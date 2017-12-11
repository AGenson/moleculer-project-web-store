#	Atelier

*	Faire l'API selon le cahier des charges
*	Déployer votre API en ligne avec opennode.io
	-	npm install -g openode
	-	openode deploy
	-	nommer avec le nom-prenom du lead developer qui représente le groupe
*	La note est groupé

#	Evaluation API

*	npm start -> démarrer le serveur
*	Vous pouvez tester avec Postman hors ligne aussi http://0.0.0.0:9000/ ....

## Cahier des charges

Vous êtes chargé d'écrire l'API de gestion d'un magasin de jeux vidéo.
Cette API doit être découpée en micro-services afin de permettre une meilleure évolution et maintenabilité.
Les domaines de gestions sont :
- Utilisateurs
- Produits
- Commandes

Vous devez déduire et gérer les cas d'erreurs de l'API.
Vous travaillerez en équipe de 2 à 3 personnes.
Vous devrez effectuer vos propres tests unitaires.

Vous devez déployer votre API sur https://www.openode.io/

L'API doit répondre répondres sur les différentes url ci-dessous :

### Utilisateur


####POST - /api/v1/user
	
Description:
-	Création d'un utilisateur

Paramètres:
-	email
-	lastName
-	firstName	

Retour:
-	utilisateur

Erreur:
- 500 :	erreur critique
- 417 : 	n'est pas valide
- 409 : 	existe déjà



####	GET - /api/v1/user/:email

Description:
-	Récupération de l'utilisateur

Paramètres:
-	email de l'utilisateur
	
Retour:
-	l'utilisateur
	
Erreur:
- 500 :	erreur critique
- 404 : 	n'existe pas



####	PATCH - /api/v1/user/:email
	
Description:
-	Modification d'un utilisateur

Paramètres:
-	email de l'utilisateur
-	informations du profile à modifier
	
Retour:
-	email de l'utilisateur

Erreur:
- 500 :	erreur critique
- 404 : 	n'existe pas



### Produit


####	POST /api/v1/product

Description:
	-	Création d'un produit

Paramètres:
	-	title
	-	description
	-	price
	
Retour:
	-	Les données du produit



####	GET /api/v1/product/:id_product
	
Description:
-	Récupération d'un produit

Paramètres:
-	id du produit

Retour:
-	récupération des données du produit



####	PATCH - /api/v1/product/:id_product

Description:
-	Modification d'un produit

Paramètres:
-	id du produit
-	informations du produit

Retour:
-	id du produit



####	PATCH - /api/v1/product/:id_product/increment

Description:
-	Ajout d'une unité de produit

Paramètres:
-	id du produit

Retour:
-	id du produit
-	quantity



####	PATCH - /api/v1/product/:id_product/decrement
	
Description:
-	Retire une unité de produit

Paramètres:
-	id du produit

Retour:
-	id du produit
-	quantity



### Commande



#### POST /api/v1/order/user/:id_user

Description:
-	Création d'une commande pour utilisateur

Paramètres:
-	id de l'utilisateur

Retour:
-	commande



####	GET - /api/v1/order/:id_order
	
Description:
-	Récupération d'une commande

Paramètres:
-	id de la commande

Retour:
-	commande



####	GET - /api/v1/order/user/:id_user
	
Description:
-	Récupération liste des commandes d'un utilisateur

Paramètres:
-	id de l'utilisateur

Retour:
-	tableau d'id de commandes



####	PATCH - /api/v1/order/:id_order/product/:id_product/increment
	
Description:
-	Modification d'une commande en incrémentant un produit

Paramètres:
-	id de la commande
-	id produit

Retour:
-	commande (quantity inside)



####	PATCH - /api/v1/order/:id_order/product/:id_product/decrement
	
Description:
-	Modification d'une commande en decrémentant un produit

Paramètres:
-	id de la commande
-	id produit

Retour:
- commande (quantity inside)




#### PATCH /api/v1/order/:id_order
	
Description:
-	Validation d'une commande

Paramètres:
-	id de la commande

Retour:
-	commande



# Notes : 
- On ne peut pas ajouter un utilisateur avec la même adresse email
- On ne peut pas modifier l'email d'un utilisateur




Rendre le projet :

-	Déployer le projet en ligne
-	Créer un dépot GitHub
-	Publier le code de votre projet sur github
-	Envoyer un email à hello@davidroman.io
	*	Object :   [Projet-Moleculer] - Rendu
	*	Body : 
		-	url de l'api
		-	url du github
		-	Nom des personnes de l'équipe



# Bonne chance !! 