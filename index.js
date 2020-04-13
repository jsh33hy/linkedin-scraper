const scrapedin = require('scrapedin');
const chalk = require('chalk');
const CONFIG = require('./config/config.json');
const VERBOSE = false;

const options = {
    isHeadless: CONFIG.headless,
    email: CONFIG.credentials.email,
    password: CONFIG.credentials.password
};

function parseProfile(profile){
    const keywords = CONFIG.keywords;
    let containsKeyWord = false;
    let keywordMatches = {};

    profile.positions.forEach(position =>{
        keywords.forEach(keyword=>{
            if(position.title && position.title.toUpperCase().indexOf(keyword.toUpperCase()) > -1){
                if(VERBOSE){
                    console.log("TITLE MATCH "+keyword);
                    console.log(position.title);
                }
                containsKeyWord = true;
                keywordMatches[keyword] = true;
            }

            if(position.description && position.description.toUpperCase().indexOf(keyword.toUpperCase()) > -1){
                if(VERBOSE){
                    console.log("DESCRIPTION MATCH "+keyword);
                    console.log(position.description);
                }
                containsKeyWord = true;
                keywordMatches[keyword] = true;
            }
        });
    });

    return {keywordMatches, containsKeyWord};
}

const scrapePage = async function(scraper, url){
    const profile = await scraper(url);
    return parseProfile(profile);
}

const start = async function(a, b) {
    const profileScraper = await scrapedin(options);
    for(i in CONFIG.urls){
        let url = CONFIG.urls[i];
        try{
            console.log(">> scrapping "+url);
            result = await scrapePage(profileScraper, url);
            if(result.containsKeyWord){
                console.log(chalk.bold.green("FOUND MATCH (%s): %s"), Object.keys(result.keywordMatches).join(', '), url);
            }
        }
        catch(e){
            console.log(chalk.bold.red("ERROR scraping page: %s"), url);
            console.log(e);
        }
    }
}
  // Call start
start();