# LinkedIn Scraper

## Quickstart

#### Requirements

- Node (tested with `12.16.1 LTS`)
- npm (tested with `6.14.1`)

#### Clone repo
```
git clone --depth=1 https://github.com/jsh33hy/linkedin-scraper.git <project_name>
cd <project_name>
```

#### Setup config

Edit [config](./config/config.json)
```json
    // login credentials
    "credentials":{
        "email": "{YOUR-EMAIL}",
        "password": "{YOUR-PASSWORD}"
    },
    //  keywords to search for
    "keywords":[
        "Android",
        "Node"
    ],
    //  urls to scrape
    "urls": [       
        "https://www.linkedin.com/in/some-user/",
        "https://www.linkedin.com/in/some-other-user/",
    ]
}
```

#### Build + Run
```sh
npm install
npm start
```