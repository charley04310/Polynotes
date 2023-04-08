# BIENVENUE SUR L'APPLICATION POLYNOTES

  <p align="center">
      <img src="frontend/public/img/polynotes.gif" alt="PolyBunny" height="400">
  </p>

## PRÉSENTATION DE L'APPLICATION

Bonjour et bienvenue à tous,

Je suis ravi de vous présenter aujourd'hui l'application Polynotes, qui a été développée dans le cadre d'un projet scolaire WOA (Web Oriented Architecture).

Polynotes est une application web qui vise à faciliter la gestion de notes, de tâches et de bases de données, en offrant une flexibilité et une personnalisation accrues. Cette application se déroulera en deux itérations : la première itération est présentée ici, tandis que la seconde itération sera réalisée en équipe.

Nous espérons que cette première itération de Polynotes vous sera utile et vous invitons à découvrir de plus près les fonctionnalités de cette application.

[![POLYNOTES TIMES DATA](https://wakatime.com/badge/user/8c51dfaf-cc71-4c33-bb4f-07b1a77dce06/project/6160a20e-1f13-4866-b07b-8adea0765e70.svg)](https://wakatime.com/badge/user/8c51dfaf-cc71-4c33-bb4f-07b1a77dce06/project/6160a20e-1f13-4866-b07b-8adea0765e70)

## Features

### Polynotes Itération V1

Dans cette première itération de Polynotes, les fonctionnalités principales sont les suivantes :

1. **Notes et Wikis :** Vous permet de créer et d'organiser des notes, de la documentation et des wikis dans un format flexible et personnalisable.

2. **Gestion des tâches et des projets :** Vous permet de créer et de gérer des tâches, des listes de tâches et des projets de manière qui convient le mieux à vos besoins.

3. **Bases de données :** Vous permet de créer et de gérer des bases de données pour stocker et organiser des informations telles que les contacts, les produits ou les dépenses.

4. **Partage de documents :** Vous permet de gérer l'accès à vos documents, afin que votre entourage professionnel ou personnel puisse vous aider à les éditer.

# PRÉSENTATION DE LA STACK TECHNIQUE
<p align="left">
    <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg" alt="docker" width="50" height="50"/>
    </a>
    <a href="https://kubernetes.io" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg" alt="kubernetes" width="50" height="50"/>
    </a>
    <a href="https://helm.sh/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/helmsh/helmsh-icon.svg" alt="helm" width="50" height="50"/>
    </a>
    <a href="https://argoproj.github.io/cd/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/argoprojio/argoprojio-icon.svg" alt="argoprojio" width="50" height="50"/>
    </a>
    <a href="https://github.com/actions" target="_blank" rel="noreferrer">
        <img src="https://avatars.githubusercontent.com/u/44036562?s=200&v=4" alt="actions" width="50" height="50"/>
    </a>
    <a href="https://nestjs.com/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/nestjs/nestjs-icon.svg" alt="nest" width="50" height="50"/>
    </a>
    <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" alt="nest" width="50" height="50"/>
    </a>
    <a href="https://fr.reactjs.org/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" alt="nest" width="50" height="50"/>
    </a>
</p>

## FRONTEND DEVELOPPEMENT : REQUIREMENTS

Main Library

- [ReactJS](https://fr.reactjs.org/)

UI Libraries Components

- [Ant Design](https://ant.design/docs/react/getting-started)
- [TipTap](https://tiptap.dev/api/editor)
- [DND kit](https://dndkit.com/)

State & HTTP REQUEST management

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [HTTP REQUEST : Axios](https://axios-http.com/fr/docs/intro)

Routing

- [Ract Router 6](https://reactrouter.com/en/main)

## FRONTEND ROUTES AND COMPONENTS

#### [Page Authentification](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/auth/WelcomePage.tsx)

```http
  GET /authentification
```

| Components                                                                                                                 | Description   |
| :------------------------------------------------------------------------------------------------------------------------- | :------------ |
| :jigsaw: [Login](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/auth/components/Login.tsx)       | Login VIEW    |
| :jigsaw: [Register](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/auth/components/Register.tsx) | Register VIEW |

#### [Page Accueil](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/HomePage.tsx)

```http
  GET /accueil
```

| Components                                                                                                                          | Description   |
| :---------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| :jigsaw: [File Explorer](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/components/FileExplorer.tsx) | File Explorer |
| :jigsaw: [Recents Files](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/components/RecentsFiles.tsx) | Recents Files |
| :jigsaw: [User Card](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/components/UserCard.tsx)         | User Card     |

#### [Page Edit Document](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/EditDocumentPage.tsx)

```http
GET /document/{id}
```

| Components                                                                                                                                   | Description       |
| :------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| :jigsaw: [Sous Page Block](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/SubPage.tsx)         | File Sub Page     |
| :jigsaw: [DataBase Block](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/DataBaseTable.tsx)    | DataBase Block    |
| :jigsaw: [Trello Block](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/TrelloDataBase.tsx)     | Trello Block      |
| :jigsaw: [Image Block](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/SubPage.tsx)             | Image Block       |
| :jigsaw: [Text Editor Block](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/EditorContent.tsx) | Text Editor Block |
| :jigsaw: [Bubble Menu](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/BubbleMenu.tsx)          | Bubble Menu       |
| :jigsaw: [DropDown Menu](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/DropDownMenu.tsx)      | DropDown Menu     |

### FRONTEND ROUTING : BASIC USAGE

Ce code utilise la bibliothèque React Router pour gérer les routes dans une application React.

Le composant <Routes> définit un groupe de routes. Dans cet exemple, il y a deux groupes de routes : un groupe privé et un groupe public. Les routes privées sont accessibles uniquement aux utilisateurs authentifiés, tandis que les routes publiques sont accessibles à tous les utilisateurs.

```Typescript

//  Pour créer une nouvelle route importer un composant dans les balises "Public" ou "Privé"
<Routes>
    <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
        <Route path="/any/page" element={<Page />} />
    </Route>
    <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
        <Route element={<Page />} path="/any" />
    </Route>
</Routes>

```

## BACKEND DEVELOPPEMENT : REQUIREMENTS

Framework

- [NestJS](https://nestjs.com/)

Database et ORM

- [MongoDB](https://www.mongodb.com/fr-fr)
- [Mongoose](https://mongoosejs.com/docs/typescript.html)

### API reference

Retrouver une documentation swagger complète [DOCUMENTATION](https://polynotes.cluster-2022-5.dopolytech.fr/api/documentation#/default)

#### Get User information By ID

```http
  GET /api/users/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`   | `string` | **Required**. Your API key        |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Login User

```http
  POST /api/auth/login
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. User email    |
| `password` | `string` | **Required**. User password |

#### Signup User

```http
  POST /api/auth/signup
```

| Parameter  | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Username      |
| `email`    | `string` | **Required**. User email    |
| `password` | `string` | **Required**. User password |

#### Logout User

```http
  POST /api/auth/logout
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token`   | `string` | **Required**. Your API key |

#### Email Verification

```http
  POST /api/auth/email-verification/{token}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `token`   | `string` | **Required**. Your Token as URI param |

#### ADD Document

```http
  POST /api/page/add
```

| Parameter | Type       | Description                                 |
| :-------- | :--------- | :------------------------------------------ |
| `pageId`  | `ObjectId` | **Required**. Page ID as Mongoose Object ID |
| `title`   | `string`   | **Required**. Document title                |
| `userId`  | `string`   | **Required**. UserId as string              |
| `content` | `Array`    | **Required**. Content as Array Block        |

#### GET Document by user ID

```http
  GET /api/page/user/{id}
```

| Parameter | Type     | Description                               |
| :-------- | :------- | :---------------------------------------- |
| `token`   | `string` | **Optional**. Optional if shared document |
| `id`      | `string` | **Required**. Id of item to fetch         |

#### UPDATE Document by user ID

```http
  PATCH /api/page/{id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `content` | `Array`  | **Required**. Content as Array Block |
| `id`      | `string` | **Required**. Id of item to fetch    |

#### UPDATE TITLE Document

```http
  PATCH /api/page/title/{id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `title`   | `Array`  | **Required**. Content as Array Block |
| `id`      | `string` | **Required**. Id of item to fetch    |
| `token`   | `string` | **Required**. Token cookie           |

#### UPDATE Privacy Document

```http
  PATCH /api/page/privacy/{id}
```

| Parameter    | Type      | Description                                              |
| :----------- | :-------- | :------------------------------------------------------- |
| `token`      | `string`  | **Required**. Token cookie                               |
| `isPublic`   | `Boolean` | **Optional/Required**. To share your document to any one |
| `isEditable` | `Boolean` | **Optional/Required**. To let people edit your document  |

#### POST Tree File System

```http
  POST /api/file-system/tree/create-or-update
```

| Parameter  | Type                | Description                          |
| :--------- | :------------------ | :----------------------------------- |
| `token`    | `string`            | **Required**. Token cookie           |
| `userId`   | `string`            | **Required**. User ID                |
| `key`      | `string`            | **Required**. key generate by uuid() |
| `children` | `NodeFileNavigator` | **Required**. Children file system   |

```typescript
interface NodeFileNavigator {
  title: string;
  key: string;
  // si undefined alors c'est un fichier
  children: NodeFileNavigator[] | undefined;
}
```

#### GET Tree File System

```http
  GET /api/file-system/tree/{id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `token`   | `string` | **Required**. Token cookie         |
| `id`      | `string` | **Required**. User ID as URI param |

### Mongo DB SCHEMA

#### [User SCHEMA](https://github.com/charley04310/Polynotes/blob/master/backend/src/users/schemas/user.schema.ts)

```typescript
export class User {
  // required: true
  username: string;
  // required: true, unique : true
  email: string;
  // required: true, default : false
  email_verified: boolean;
  // required: true
  password: string;
}
```

#### [Page SCHEMA](https://github.com/charley04310/Polynotes/blob/master/backend/src/page/schemas/page.schema.ts)

```typescript
export class Page {
  // required: true
  title: string;
  // required: true
  userId: ObjectId;
  // required: true, default : false
  isPublic: boolean;
  // required: true, default : false
  isEditable: boolean;
  // required: true
  content: [];
}
```

#### [File System TREE SCHEMA](https://github.com/charley04310/Polynotes/blob/master/backend/src/file-system/schemas/file-system.schema.ts)

```typescript
export class FileSystemTree {
  // required: true, unique: true
  userId: string;
  // required: true
  title: string;
  // required: true, unique: true
  key: string;
  // required: true
  children: NodeFileNavigator[];
}
```

## LOCAL DEPLOYMENT : REQUIREMENTS

Docker CLI & Docker compose

- [Docker](https://docs.docker.com/engine/reference/commandline/cli/)
- [Docker compose](https://docs.docker.com/compose/)



### ENVIRONMENTAL VARIABLES

Prenez soin de renseigner vos propres identifiants afin de bénéficier de la fonctionnalité

```env
// make sur to have your .env init in your project
MONGODB_URL=mongodb://mongo:27017/polynotes
MONGODB_DATABASE=polynotes
MAILER_PASSWORD= ## use your own mailer password
MAILER_PORT= ## use your own mailer port
MAILER_HOST= ## use your own host mailer
MAILER_USER= ## use your own account mailer
JWT_SECRET=  ## use your own jwt secret mailer
BASE_URL_API=http://localhost:3000/api
```

### Run locally

```sh
docker compose up --build
```
## CI / CD DEPLOYMENT

### REQUIREMENTS

- [Github Actions](https://docs.github.com/fr/actions)
- [K3S](https://k3s.io/)
- [Docker Hub](https://hub.docker.com/)
- [Helm](https://helm.sh/)
- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
- [Terraform](https://www.terraform.io/)

### SCHEMA INFRASTRUCTURE
<p align="left">
<img src="frontend/public/img/infra.png" alt="infrastructure"  height="400"/>

</p>   

###  TERRAFORM : SETTING UP ARGOCD ENVIRONNEMENT

### REQUIREMENTS

- [K8S](https://k3s.io/)
- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
- [Terraform](https://www.terraform.io/)

Before apply your Terraform configuration make sur to have you K8S installed and ArgoCD set on it. If not check the documentation above before starting it.

1. From Terraform folder setup your Provider as bellow `provider.tf` :

```tf
provider "argocd" {
  server_addr = var.server_addr
  username    = var.username
  password    = var.password

  kubernetes {
    host                   = var.host
    client_certificate     = var.client_certificate
    client_key             = var.client_key
    cluster_ca_certificate = var.cluster_ca_certificate
  }
}
```
2. Then connect your Github repository to ARGOCD as bellow `main.tf` :

```tf
resource "argocd_repository" "<your-argocd-app-name>" {
  repo     = ## your own repository 
  type     = "git"
  username = ## your own username 
  password =  ## your own password 
}
```

3. Create all variables needed as bellow `variables.tf`, check Terraform documentation to get more informations about variables management :

```tf
## ArgoCD
variable "server_addr" {
  description = "ArgoCD server address with port."
  type        = string
}
## K8s
variable "host" {
  description = "The hostname (in form of URI) of the Kubernetes API."
  type        = string
}
```
### INIT & APPLY TERRAFORM 

Before apply your terraform configuration make sur to init all changes your `terraform.tfstate` by running

```sh
terraform init
```

Then you can apply your configuration

```sh
terraform apply
```

###  TERRAFORM : SETTING UP SENSIBLE RESOURCES

1. From Terraform folder setup your Provider as bellow `provider.tf` :

```tf
provider "kubernetes" {
  host                   = var.host
  client_certificate     = base64decode(var.client_certificate)
  client_key             = base64decode(var.client_key)
  cluster_ca_certificate = base64decode(var.cluster_ca_certificate)
}
```

2. Then give all the secrets resources that kubernetes need in `main.tf` :

```tf
resource "kubernetes_secret" "<your-argocd-app-name>" {
  metadata {
    name      = "<your-secret-kube-object-name>"
    namespace = "<your-namespace>"
    labels = {
      managed-by = "terraform"
    }
  }
  data = {
    "mongodb-root-password" = ## your own password
    "mongodb-passwords"     =  ## your own password
    "jwt_secret"               =  ## your own JWT secret
    "mailer-password" =  ## your own mail password
    "mongodb-url" = ## your own string connexion

  }
  type = "Opaque"
}
```
### INIT & APPLY TERRAFORM 

Before apply your terraform configuration make sur to init all changes your `terraform.tfstate` by running

```sh
terraform init
```

Then you can apply your configuration

```sh
terraform apply
```