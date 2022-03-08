# Overview
A front-end web application that allows you to check the current, hourly and daily weather forecast. Location lookup by City Name, Country or Geographic Coordinates is possible. After searching for a location and viewing the forecast, the location is automatically saved for quick and easy lookup in the future.
# Live Demo
Live demo is available [here](https://weather.jgolebiewski.com).
# Getting Started
To run the project locally or in a production setting:
1. Make sure you have node.js and npm installed
2. Clone the repository  
`git clone https://github.com/Jed-g/weather-forecast.git`
3. Navigate to the newly created folder in the console and run  
`npm i`  
to install the project dependencies
4. In **node_modules\react-scripts\config\webpack.config.js** add  
    ```
        externals: {
          "mapbox-gl": 'mapboxgl',
        },
    ```
    to the return object starting on **line 171** i.e.
    ```
              options: {
                sourceMap: true,
              },
            }
          );
        }
        return loaders;
      };
    
      return {
        externals: {
          "mapbox-gl": 'mapboxgl',
        },
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        // Stop compilation early in production
        bail: isEnvProduction,
        devtool: isEnvProduction
    ```
    This is to mark **mapbox-gl** as an external dependency that shouldn't be bundled during the build process and is instead imported as a script from a CDN. There is an unfixed error in the **mapbox-gl** npm package that occurs during the build process which causes the map to not be visible in the final build
5. Change the API keys in **src\api\ENV.json**. The keys provided are for demo purposes and will stop working once the number of requests exceeds a certain threshold.  
**Note!** The API keys are bundled into the final deployment package and so are visible to the user. This is intentional and necessary since there is no back-end layer
7. To run the application in a development environment, run  
`npm run dev`
8. To run the application in a production environment, run  
`npm run build`  
and host the newly created **build** folder on a static website hosting provider of your choice e.g. Netlify
# Features
- Detailed information about current and future weather states

- Location lookup by City Name, Country or Geographic Coordinates

- Location visualization on a map

- Sunrise & Sunset indicator

- Current location autosave for convenience

- Units customization

- Dark/Light mode
