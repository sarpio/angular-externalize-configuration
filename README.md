# Demo Application to show how to externalize configuration

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Configuration steps:
### 1. Define `app.config.json` file containing configuration you want to use
```json
{
    "variable_name":"type",
    "...":"..."
}
```
### 2. Modify `angular.json` file by adding `app.config.json` in "assets" section:
```json
 "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/app.config.json"
            ],
```
### 3. Create app-config interface representing `app.config.json` data and their type
### 4. Create app.config service to implement to fetch data from `app.config.json` file.
### 5. Implement changes in `app.module.ts` by adding:

```javascript
export function setupAppConfigServiceFactory(
  service: AppConfigService
): Function {
  return () => service.load();
}
```
and modify section providers:
```javascript
 providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setupAppConfigServiceFactory,
      deps: [
        AppConfigService
      ],
      multi: true
    }],
```
### 6. Now you can modify your service.
* define apiUrl variable:
```javascript
public apiUrl = '';
```
* inject AppConfigService in the service inside its constructor
```javascript
constructor(private config: AppConfigService) {
    this.apiUrl = config.data.apiUrl!;
  }
```
### 6. Final step.
Now you can use `ng build` to generate finals code id `dist` folder. Folder includes app.config.json file which can be modified it terms of used values including link to rest api withour using `ng build`. 