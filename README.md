
# Chat Application Final Project

In this report, I will describe how I've implemented the differrent tasks given in the project instructions.

This project consist of a chat application with an interface which allows the user to choose a channel and send message into it. There are different functionnalities which are implemented in order to make the application friendly and instinctive.

## Usage

This chat application run with Docker. You will need to have docker installed and open in your computer in order to launch the application. 

### Explanations

In the root of the project, there is a docker-compose.yalm file which contains different instructions to start the project. It runs with dex server on port 5556 with an image downloaded from internet. It specifies the command to run in order to start the application. It calls the config.yalm file.

In the dex folder, there is another config.yalm file which contains different information regarding the authentification to the application, like the different connectors for example.

### Start the web application:

* Clone the project:
```
git clone https://github.com/quentinece17/ProjetWebTech.git
```

* Install dexidp image at the root of the project
```
docker pull dexidp/dex
```

* Start running the container (at the root of the project):
```bash
docker-compose up 
```
* Start the back-end: 
```bash
cd back-end
# Install dependencies (use yarn or npm)
yarn install
# Start the back-end
yarn develop

Chat is waiting for you at http://localhost:3001
```
* Start the front-end:
```bash
cd front-end
# Install dependencies (use yarn or npm)
yarn install
# Start the front-end
yarn start
````

## Author

Quentin APPELGHEM

SI_FR GP06

quentin.appelghem@edu.ece.fr

## Tasks

### Project Management:

* Naming Convention

    This part is well respected on my project: community conventions and best practices, consistency have been respected.

    Grade: 2/2

* Project Structure

    My project is very well structured. There is a back-end and front-end folder, a dex folder with a configuration file and another config file in the root of the project. The structure is very simple and comprehensive.

    Grade: 4/4

* Code Quality

    The code is quite qualitative. It is well indented and quite understandable with different commentaries. 

    Grade: 4/4

* Design/ UX

    I worked hard to keep the design of the application simple and uncluttered while still being attractive. There is a pretty good user experience with different features that are quite instinctive.I used a lot of MUI components with a lot of CSS to complete the MUI style.

    Grade: 4/4

* Git and DevOps

    Having done the project alone, I only used one branch on my GitHub project. I made many commits, indicating each time the task done (if it was a feat, a fix, a style or a chore), with descriptions. I also use Docker and Docker Compose to start my application. 

    Grade: 4/4


### Application Development:


* Welcome Screens

    The Welcome screen before log in is quite simple with a welcoming message and a button to connect. After log in, the page is well designed and very friendly. It is very instinctive which helps the user to know what to do easily. 

    Grade: 4/4

* New Channel Creation

    In the menu page, there is a "Welcome" button above the different channels. This button directs the user to a page with three other buttons, including the one to create a channel. When this button is clicked, a popup screen (dialog screen) appears with the possibility to add a new channel by entering the new channel name. At the creation, the user can also add a member to his new channel by entering the username of the user he wants to add. When the form is send, the channel is created in the database and immediately displayed in the list of the channel. Indeed, the user who created the channel has became the owner of the channel and he is automatically member of the channel.

    Grade: 6/6

* Channel Membership access

    When a user log in to the application and when he pass the dex authentification, his identity (email) is checked in order to see if he is a new user or not. If his email is found in the database, he is redirected with the welcome page with the list of the channel he is member of or owner. However, if the user does not exists in the database, he is immediately created in the database with his email and default information which he can modify later (user settings).

    Grade: 4/4

* Ressource access Control

    When a user is log in, he can see different channels at the left of the screen. But he can only see the channel he is member of (if he has been invited by a friend), or his own channel(s) (if he has created the channel: he is the owner). 

    Grade: 4/4

* Invite users to Channels

    When a user is on a channel, he can see a "Settings" button at the top right of the screen, next to the channel name. On this button, he can see an option "Invite Friends". When he click the button, a popup screen appears on the screen offering the user the possibility to invite a friend. He must enter the friend email in order to add him to the current channel. When the email is enterred, and the form is sent, the new user is automatically add to the channel as a member. After that, the new user will be able to see the channel in the list of the channel he is member of.

    Grade: 6/6

* Message Modification

    Once a user has sent a message, he is able to update it but only if he is the author of the message. There is an "Update" button next to his message (wich is available if he is the author of the message). When the button is clicked, it display a popup screen with the current message in a TextField which can be updated. The user can modify his message as he want, and save his modification, or not if he decide to cancel the modification. Once it is done, the new message is immediately saved in the database by changing the content of the message, but not the creation date of it which stay the same. The channel is automatically updated with the new message. The user can do it as many time as he wants. 

    Grade: 2/2

* Message Removal 

    If a user send a message, he has the possibility to remove his message. However, he must be the author of the message to delete it, otherwise the button is disabled. When the button is clicked, the message is immediately deleted from the database and the page is automaticaly reload, without the message deleted. 

    Grade: 2/2

* Account Settings

    In the Welcome menu (at the top of the menu above the channel), there is a "Settings" button. Once it is clicked, the user information are displayed on a dialog screen. First of all, the user can see: his email, gender, language, current theme, mute mode, and Profile Image, but without update it. At the bottom of the screen, there is an "Update" button which open a new popup screen over the first one, with the possibility to update the user information (except the username which cannot be modified). He can change his gender, language, theme (light or dark mode), mute mode (on or off) and his Profile image. When he submit the form by clicking on the "Update" button at the bottom of the screen, these information are sent to the database and updated into it. If the user log out and re log in after that, the information he last modified will have been saved in the database. 

    For this part, I used different MUI components like the TextField, the RadioGroup Button, the Select and the Switch (for the theme and the mute mode).

    Grade: 4/4

* Gravatar Integration

    Gravatar is integrated in my project for the Profile image. In the Settings, the user is able to see his current profile image (which can be a Gravatar Image) and to update it. In this case, he can choose to modify his Gravatar Image by following a link to the Gravatar website. The Gravatar Image is integrated in different files (Welcome.js, List.js and Header.js). 

    Grade: 2/2

* Avatar Selection

    I have integrated the Avatar Selection in the Settings of the user. The later can choose between 5 different Avatar. The Image Profile by default is the Gravatar picture but the user can change it by choosing an Avatar Image which will become his new Image Profile saved in the database. The Profile Image is displayed in different areas. First of all in the header with the username; in the Settings, with the user information; and next to the message in the different channels. I have checked evrytime the author of the message in order to fetch his Profile Image in the database and to display it in the chat. 

    PS: When you want to change your Profile Image, the different Avatar given are clickable but when you click on it, nothing change on the style of the screen, but it is well selected ! So it is normal when you click on an Avatar if nothing happens (the Avatar is selected), you will see when you click the "Update" button, the Avatar you have selected is well saved on the database. 

    Grade: 4/4

* Personal Custom Avatar

    Not done.

## Bonus Ideas

* Remove a Channel

    In my application, I have integrated a possibility for a user to delete a channel. This option is available in the Settings of the Channel. When the user click the button, he can see a "Delete Channel" button which is only available if he is the owner of the channel (the creator). If he click the delete button, an alert appears on the screen to ask the user if he is sure of his choice. At this time, he can either cancel the delete or accept it and in this case, the channel will be deleted from the database with all the information it contains (messages, members, etc)

    Grade: 4/4

* Rename a channel

    The user is able to change the channel name if he is a member of this channel. In the Settings of the channel, there is an "Update Name" button which display a popup screen with the possibility to enter the new channel name. When the user valid his choice, the channel name is immediately change in the database and it is automaticaly modified in the page.

    Grade: 2/2

* Automatic refresh of the page

    When an update is done in the database (an insert, a delete, an update), the page displayed is immediately refresh with the new information and the user doesnt have to refresh the page. 

    Grade: 2/2

* List of the channel members

    In the Settings of a channel, the user is able to see all the members of the channel. There is a "Channel's Members" button which, when clicked, display a popup screen with all the username of the channel members well displayed. The user can only see these members without updating anything.

    Grade: 2/2

* Message in real time

    The messages are sent in real time with the actual date and they are saved like that. This allows to have a chronological order in the channel messages.

    Grade: 2/2

* Recoding of "date", "author" and "store" functions

    At the begining of the project, there were some issues with the date of the messages. Indeed, all the messages loaded from the "init" file were displayed at the actual date. I had to recode this in order to correct the problem. As well as for the author of the message which was always 'david', I had to change it in the list.js file. Finaly, there was a serious issue with the "store" functionality in the db.js file. It always provocked an error in the compilation so I had to change the functions with this functionnality like "update" in order to make the code work. 

    Grade: 3/3