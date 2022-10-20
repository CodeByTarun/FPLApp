<!-- Project Logo -->
<p align="center">
  <h1 align="center">Fantasy Premier League App</h1>
  <p align="center">Live updated fantasy premier league viewer for your teams, fixtures, dream teams and viewing player stats.</p>
</p>

<p align="center">
  <img alt="budgetteam" src="/readmeImages/budgetteam.PNG" width="30%">
  &nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="fixture" src="/readmeImages/fixture.PNG" width="30%">
   &nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="dreamteam" src="/readmeImages/dreamteam.PNG" width="30%">
</p>

<!-- Table of Contents -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project

This project was made as a quicker way for someone to view their FPL (fantasy premier league) teams and see how players are doing for any fixture in any gameweek. The application uses data from the fantasy premier league API. It also features live updates for fixtures and player scores. This was a great project to learn about the React Native framework, Expo, Typescript, React-Spring, Redux, React Navigation, Jest and the React Testing Library. A detailed explanation of how to use this mobile application is in the [Usage](https://github.com/CodeByTarun/FPLApp/blob/master/README.md#usage) section below.

This project utilized functional components, react native hooks and the redux design pattern. The RTK Query data fetching and caching tool made using fetched data across the application easy. Redux was also used for storing the main state of the team whether it is the team of the week, a user’s team, or a team currently playing in a match. React Navigation was used for easy addition of modals and themes.  Test driven development (TDD) was used for the creation of services and helper functions. Testing was done using Jest and the React Testing Library. I chose to use this testing library as it leads to creation of tests that exclude implementation details. Also, AsyncStorage was used to keep data offline in a key-value storage system. Animations were created using the React-Spring library.


### Built With
* [React Native](https://reactnative.dev/)
* [Node.js](https://nodejs.org/en/)
* [Redux](https://redux.js.org/)
* [Expo](https://docs.expo.dev/)
* [React-Spring](https://react-spring.io/)
* [React Navigation](https://reactnavigation.org/)

## Getting Started

To use this application you must install it via Xcode for iPhones or download the apk file provided for Android.

Android APK: https://drive.google.com/file/d/1vZzS7Cwq4WA11SWRGeZhBkBHBEnRW1v8/view?usp=sharing

IOS Simulator: https://drive.google.com/file/d/1Fre5dAugUs775VlyO3tv17Z9DqOsQZz5/view?usp=sharing

## Usage

Upon starting up the app, it fetches data from the FPL API. If there is an error fetching the data, it will tell you to close the app and open it later. Once the data has been fetched it will take you to the main screen. Here you can view fixtures for the current gameweek at the top and switch the gameweek as well to look at upcoming and previous fixtures. At the bottom is a tab bar where you can you can select 'My Teams' to add your budget or draft team. To add your team, you need your team ID which can be found embedded in the URL when viewing your team on a web browser.

Example: 

When on the points tab on the browser, the URL will contain your team ID: https://fantasy.premierleague.com/entry/ ***8423283*** /event/36

Once your team has been added it will be set as your favourite team and will be displayed initially whenever the app is opened. If you click on your team’s name, the standings will open for draft leagues and a list of leagues will open for budget leagues. You can navigate to any league and click on any team to view how they are doing. Other teams you are viewing can be added to your team list by using the team ID which is displayed to the right of the team name.

<p align="center">
  <img alt="budgetteam" src="/readmeImages/budgetteam.PNG" width="25%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="leaguelist" src="/readmeImages/leaguelist.PNG" width="25%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="standings" src="/readmeImages/standings.PNG" width="25%">
</p>

When viewing your team, there are two cards at the top that show if you are viewing the current gameweek. Press the left one to view additional info such as expected points, cost, form, selection percentage, and upcoming fixtures. The right one shows point totals, transaction totals, rank, and squad cost for budget teams.

<p align="center">
  <img alt="teamcost" src="/readmeImages/teamcost.PNG" width="25%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="teampoints" src="/readmeImages/teampoints.PNG" width="25%">
  &nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="teamfdr" src="/readmeImages/teamfdr.PNG" width="25%">
</p>


Through the bottom navigation bar, you can view the dream team for the gameweek you are viewing, overview which will open a popup where you can see some info about the gameweek you are on as well as fixture difficulty ratings for every team sorted by average difficulty over the next 4 fixtures. The gameweek button expands the fixtures scrollview for easier viewing of all fixtures. 

<p align="center">
  <img alt="overview-gameweek" src="/readmeImages/overview-gameweek.PNG" width="30%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="overview-tfdr" src="/readmeImages/overview-tfdr.PNG" width="30%">
  &nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="fixtures" src="/readmeImages/fixtures.png" width="30%">
</p>

The players button will open a player table where you can see various stats for players, filter players by price range, minutes played, team, and position. You can also check per 90 values for applicable stats and watchlist players. Selecting a player will open a detailed view of there stats for the year and the history of the player as well. You can filter there stats for different gameweek spans and see there per 90 numbers. If you press the button on the left side of the view toggle button it will open a player comparison popup where you can add up to five players to compare their stats. You can compare these players during certain game spans and there per 90 numbers as well.

<p align="center">
  <img alt="playerstats" src="/readmeImages/playerstats.PNG" width="20%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="playerstatsfilter" src="/readmeImages/playerstatsfilter.PNG" width="20%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="detailedstats" src="/readmeImages/playerdetailedstats.PNG" width="20%">
  &nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="history" src="/readmeImages/history.PNG" width="20%">
</p>

<p align="center">
  <img alt="playercomparison" src="/readmeImages/playercomparison.PNG" width="20%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="playercomparisonstats" src="/readmeImages/playercomparisonstats.PNG" width="20%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="playercomparisonfdr" src="/readmeImages/playercomparisonfdr.PNG" width="20%">
  &nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="addplayer" src="/readmeImages/addplayer.PNG" width="20%">
</p>

The last button on the bottom bar opens a team modal for you to manage your teams. You can add, remove, edit, and choose a new default team on start up here.

<p align="center">
  <img alt="teammodal" src="/readmeImages/teammodal.PNG" width="25%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="addteam" src="/readmeImages/addteam.PNG" width="25%">
</p>

Finally, in the top right is a cog which opens settings where you can change the theme of the app and also has a credits tab, crediting the FPL api and icon sources.

<p align="center">
  <img alt="Light" src="/readmeImages/dreamteam.PNG" width="25%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="/readmeImages/darktheme.PNG" width="25%">
</p>

   
## Roadmap

See the [open issues](https://github.com/TarunBola/FPLApp/issues) for a list of proposed features (and known issues).

## Contributing

Any contributions to this project are welcomed! To contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the [MIT License](https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt).

## Contact
Tarun Bola - bolatarun@gmail.com

Project Link: [https://github.com/TarunBola/FPLApp](https://github.com/TarunBola/FPLApp)

## Acknowledgments
* [React Native Async Storage](https://github.com/react-native-async-storage/async-storage)
* [React Testing Library](https://github.com/testing-library/react-testing-library)
* [React Native Slider](https://github.com/miblanchard/react-native-slider)
* [React Spring](https://github.com/pmndrs/react-spring)
* [React Native SVG](https://github.com/react-native-svg/react-native-svg)
* [Moment Timezone](https://momentjs.com/timezone/)
* [flaticon](https://www.flaticon.com/free-icons/soccer)
* [Lodash](https://lodash.com/)
* [React Native Size Matters](https://github.com/nirsky/react-native-size-matters)

<!-- Links and Images -->
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
