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

## Usage

***TODO***

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
* [React Native Picker Select](https://github.com/lawnstarter/react-native-picker-select)
* [Moment Timezone](https://momentjs.com/timezone/)
* [flaticon](https://www.flaticon.com/free-icons/soccer)

<!-- Links and Images -->
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
