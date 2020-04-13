# LinkedIn Scraper

## Quickstart

#### Requirements

- Node (tested with `12.16.1 LTS`)
- npm (tested with `6.14.1`)

#### Setup config

Edit [config](./config.config.json)
```json
    "credentials":{
        "email": "{YOUR-EMAIL}",
        "password": "{YOUR-PASSWORD}"
    },
    "keywords":[
        //  keywords to search for
    ],
    "urls": [
        //  urls to scrape
    ]
}
```

#### Build + Run
```sh
git clone --depth=1 https://github.com/jsh33hy/linkedin-scraper.git <project_name>
cd <project_name>
npm install
npm start
```
