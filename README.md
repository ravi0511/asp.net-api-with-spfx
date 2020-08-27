# Zacco Work Sample
Welcome to Zacco’s work sample. This sample consists of two components one UI component built using Microsoft spFX (SharePoint Framework) and the other is a REST API using .NET Core 3.1 WebAPI.

## Getting Started
This example is created using Windows but should work fine in Linux or macOS as well.

### Tools
- [Visual Studio Code](https://code.visualstudio.com/)
- [ASP.NET Core](https://asp.net)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [Node.JS 8.x or 10.x LTS](https://nodejs.org/)

## Build and Test

### API with XUnit test project
- /NewsApi
-- `dotnet build` build current version
-- `dotnet test` 
- /NewsApi/NewsApi
-- `dotnet run` must be performed in the NewsApi project folder
### UI
- `npm install` (without Visual Studio Code running)
- `gulp serve` (starts a web instance for the UI Workbench ((use chrome browser))
- [Information about UI Fabrics components](https://developer.microsoft.com/en-us/fabric#/components)

### Run solutions
- Start the WebAPI first
- Start UI project
- [More information about spFX](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)

## Task at hand (spend about 4-8 hours)
- Refactor API to not expose EF (Entity Framework) Model
-- Think about what data is needed where and that we should not send more data then needed to our front end for each task
- Refactor API to be RESTFull
- Extend News with current information and add test cases to test project
-- Publish Date
--- If news are published in future they should only be visible to the author
-- Set Title and Preamble as required and validate input
- Modify UI component to use your new API
- Optional but valuable, do you own CSS styling of the news list as you would like it. 
- Upload solution back to the folder in the one drive link you recieved the solution.

Any questions contact Narasimha or Sindhu at narasimha.kini@zacco.com or sindhu.nayak@zacco.com