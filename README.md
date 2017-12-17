# IonicGameLibApp

**Important:**
Due to the IGDB API does not allow CORS, a proxy was configured to be able to run the application on web browsers, using the `ionic serve` command.
To run the app on an emulator or an actual device, open the `src/shared/constants.ts` file and change it's first to lines as follows:

From:
```
// const igdbAPILocation = 'https://api-2445582011268.apicast.io/';
const igdbAPILocation = '/api';
```

To:
```
const igdbAPILocation = 'https://api-2445582011268.apicast.io/';
// const igdbAPILocation = '/api';
```
