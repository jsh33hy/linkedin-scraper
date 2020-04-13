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


    keywords.forEach(keyword=>{
        //  check summary
        if(profile.summary && profile.summary.toUpperCase().indexOf(keyword.toUpperCase()) > -1){
            if(VERBOSE){
                console.log("SUMMARY MATCH "+keyword);
                console.log(profile.summary);
            }
            containsKeyWord = true;
            keywordMatches[keyword] = true;
        }   
        
        //  check alternative summary
        if(profile.profileAlternative && profile.profileAlternative.summary && profile.profileAlternative.summary.toUpperCase().indexOf(keyword.toUpperCase()) > -1){
            if(VERBOSE){
                console.log("ALTERNATIVE SUMMARY MATCH "+keyword);
                console.log(profile.profileAlternative.summary);
            }
            containsKeyWord = true;
            keywordMatches[keyword] = true;
        }

        //  check each position
        profile.positions.forEach(position =>{
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

        //  check each skill
        profile.skills.forEach(skill =>{
            if(skill.title && skill.title.toUpperCase().indexOf(keyword.toUpperCase()) > -1){
                if(VERBOSE){
                    console.log("SKILL MATCH "+keyword);
                    console.log(skill.title);
                }
                containsKeyWord = true;
                keywordMatches[keyword] = true;
            }
        })
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
            console.log(">> scraping "+url);
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
    console.log("Done scraping");
}
  // Call start
start();