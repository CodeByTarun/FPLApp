<!-- Project Logo -->
<p align="center">
  <h1 align="center">Fantasy Premier League App</h1>
  <p align="center">Live updated fantasy premier league viewer for your teams, fixtures, dream teams and viewing player stats.</p>
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

This project was made as a quicker way for someone to view their FPL (fantasy premier league) teams and see how players are doing for any fixture in any gameweek. The application uses data from the fantasy premier league API. It also features live updates for fixtures and player scores. This was a great project to learn about the React Native framework, Expo, Typescript, React-Spring, Redux, Jest and the React Testing Library. A detailed explanation of how to use this mobile application is in the [Usage](https://github.com/CodeByTarun/FPLApp/blob/master/README.md#usage) section below.

This project utilized functional components, react native hooks and the redux design pattern. The RTK Query data fetching and caching tool made using fetched data across the application easy. Redux was also used for storing the main state of the team whether it is the team of the week, a user’s team, or a team currently playing in a match. Test driven development (TDD) was used for the creation of services and helper functions. Testing was done using Jest and the React Testing Library. I chose to use this testing library as it leads to creation of tests that exclude implementation details. This is helpful because when I refactor my components my tests don’t break as often. Also, AsyncStorage was used to keep data offline in a key-value storage system. Animations were created using the React-Spring library.


### Built With
* [React Native](https://reactnative.dev/)
* [Node.js](https://nodejs.org/en/)
* [Redux](https://redux.js.org/)
* [Expo](https://docs.expo.dev/)
* [React-Spring](https://react-spring.io/)

## Getting Started

To use this application you must install it via Xcode for iPhones or download the apk file provided for the android build.

Android APK: https://drive.google.com/file/d/1Y_iuUvAIALsR3Vgv4f2MwZmj0KPPhko3/view?usp=sharing

## Usage

Upon starting up the app, it fetches data from the FPL API. If there is an error fetching the data, it will tell you to close the app and open it later. Once the data has been fetched it will take you to the main screen. Here you can view fixtures for the current gameweek at the top and switch the gameweek as well to look at upcoming and previous fixtures. Below this, there is a screen telling you to add your team if no team has been added yet. You can add your draft or budget league team to your list of teams. To add your team, you need your team ID which can be found embedded in the URL when viewing your team on a web browser.

Example: 

When on the points tab on the browser the URL will contain your team ID: https://fantasy.premierleague.com/entry/ ***8423283*** /event/36

Once your team it will be set as your favourite team and will open automatically when the app is opened. If you click on your team’s name, the standings will open for draft leagues and a list of leagues will open for budget leagues. You can navigate to any league and click on any team to view how they are doing. 

When viewing your team there are two cards at the top that show if you are viewing the current gameweek, press the right one to view additional info such as expected points, cost, form, selection percentage and upcoming fixtures. The left one shows point totals, transaction totals and rank.

Through the bottom navigation bar, you can view the dream team for the gameweek you are viewing, overview which will open a popup where you can see some info about the gameweek you are on. The gameweek button expands the fixtures scrollview for easier viewing of all fixtures. The players button will open a player table where you can see various stats for players, filter players by price range, minutes played, team, and position. You can also check per 90 values for applicable stats and watchlist players.

Selecting a player will open a detailed view of there stats for the year and the history of the player as well. You can filter there stats for different gameweek spans and see there per 90 numbers as well. If you press the button on the left side of the view toggle button it will open a player comparison popup where you can add up to five players to compare their stats. You can compare these players during certain game spans and there per 90 numbers as well.
The last button on the bottom bar opens a team modal for you to manage your teams. You can add, remove, edit, and choose a new default team on start up here.


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

<!-- Links and Images -->
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
