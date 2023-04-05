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

# PRÉSENTATION DE LA STACK TÉCHNIQUE

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

### ARCHITECTURE COMPONENTS

- :page_facing_up: [Page Authentification :](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/auth/WelcomePage.tsx)

  - :jigsaw: [Login](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/auth/components/Login.tsx)
  - :jigsaw: [Register](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/auth/components/Register.tsx)

- :page_facing_up: [Page Accueil :](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/HomePage.tsx)

  - :jigsaw: [File Explorer](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/components/FileExplorer.tsx)
  - :jigsaw: [Recents Files](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/components/RecentsFiles.tsx)
  - :jigsaw: [Component: User Card](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/home/components/UserCard.tsx)

- :page_facing_up: [Page Edit Document :](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/EditDocumentPage.tsx)

  - :jigsaw: [Sous Page Block](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/SubPage.tsx)
  - :jigsaw: [DataBase Block](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/DataBaseTable.tsx)
  - :jigsaw: [Trello Block](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/TrelloDataBase.tsx)
  - :jigsaw: [Image Block](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/SubPage.tsx)
  - :jigsaw: [Text Editor Block](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/EditorContent.tsx)
  - :jigsaw: [Bubble Menu](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/BubbleMenu.tsx)
  - :jigsaw: [DropDown Menu](https://github.com/charley04310/Polynotes/blob/master/frontend/src/pages/document/components/DropDownMenu.tsx)

### ARCHITECTURE COMPONENTS

### Deployment stack

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
</p>

### CI/CD stack

<p align="left">
    <a href="https://argoproj.github.io/cd/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/argoprojio/argoprojio-icon.svg" alt="argoprojio" width="50" height="50"/>
    </a>
    <a href="https://github.com/actions" target="_blank" rel="noreferrer">
        <img src="https://avatars.githubusercontent.com/u/44036562?s=200&v=4" alt="actions" width="50" height="50"/>
    </a>
</p>

## Run locally

```sh
docker compose up
```
