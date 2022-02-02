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

![image](https://user-images.githubusercontent.com/14295466/119246293-70d85100-bb4e-11eb-95e0-7907fef3961b.png)

Project tracker was created because I wanted an easy-to-use lightweight Kanban board application to keep track of projects that I was working on. Also, it was a way for me to showcase a lot of the programming concepts and skills I have developed. A detailed explanation of how to use the application is in the [Usage](https://github.com/TarunBola/ProjectTracker#usage) section below. 

This WPF application was created using the Model-view-viewmodel (MVVM) design pattern. The separation this pattern provides between the UI and business logic made it easier to make changes to the application. Many other design patterns were used to create this project such as the singleton pattern, composite pattern, command pattern, observer pattern, factory method pattern, etc. IOC containers were used as well for easier use of dependency injection.

All the service classes were created through test driven development (TTD) which saved a lot of time when the service classes dealt with concepts such as linked lists in SQL and SQL queries. The database was created using the Code First approach in Entity Framework. This allowed for creation of the model in C# first and then through configurations of each class in the model, a database was created to match it.  

### Built With
* [.NET Core](https://dotnet.microsoft.com/)
* [WPF (Windows Presentation Foundation)](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/?view=netdesktop-5.0)
* [Entity Framework Core](https://docs.microsoft.com/en-us/ef/)

## Getting Started

To use this application you must have Visual Studio 2019. Open the solution in Visual Studio and publish it wherever you would like to store the application. Now you can start using Project Tracker!

## Usage

![image](https://user-images.githubusercontent.com/14295466/120536731-6e79c080-c3b2-11eb-9c11-2b63b55e35ac.png)

When the application is opened you will be taken to the home page. Here is where all your projects are shown in a list. This list can be searched through and filtered by tag and status. To create a project, click on the add button located in the top right. Multiple projects can be opened at once as this application features tabs for easy multitasking. These tabs can be rearranged by drag and drop. 

![image](https://user-images.githubusercontent.com/14295466/120390651-f94bb400-c2fb-11eb-8b92-da94bc1dbdc6.png)

Tags are not project specific. To create a tag, click on the tag button located to the left of the minimize button. Tags are fully customizable and are a great way to keep your projects, boards and issues organized. Deleting or editing a tag will be reflected for ALL projects so be cautious when making changes to a tag. 

![image](https://user-images.githubusercontent.com/14295466/120537037-cfa19400-c3b2-11eb-9a2b-624a59172f33.png)

After creating a project, double click on it to be taken to the projects page. Here, you can create boards to work on different parts of you project. Each of these boards will have their own set of Kanban groups and issues. This allows for a good breakdown of the different sections of your projects. Boards can be cycled through on the Kanban board page as well for faster navigation.

![image](https://user-images.githubusercontent.com/14295466/120537499-5e161580-c3b3-11eb-8cd7-0f564af570ac.png)

Usage of the Kanban board is straight forward. Create as many groups as needed and then you can create issues under each of the groups. Groups can be rearranged through drag and drop, and issues can be moved to different groups by doing this as well. 


## Roadmap

See the [open issues](https://github.com/TarunBola/ProjectTracker/issues) for a list of proposed features (and known issues).

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

Project Link: [https://github.com/TarunBola/ProjectTracker](https://github.com/TarunBola/ProjectTracker)

## Acknowledgments
* [Extended WPF Toolkit](https://github.com/xceedsoftware/wpftoolkit)
* [XAML Behaviours WPF](https://github.com/Microsoft/XamlBehaviorsWpf)
* [Font Awesome](https://fontawesome.com)
* [Icons8](https://icons8.com/)

<!-- Links and Images -->
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
