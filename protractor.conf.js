exports.config = {
  framework: 'jasmine',
  specs: ['specs/loginAndProfileTest.js'], 
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        'disable-infobars=true',
        '--disable-popup-blocking',
        '--disable-notifications',
        '--start-maximized',
        '--disable-extensions',          
        '--disable-blink-features=AutomationControlled',  
        '--disable-features=PreloadMediaEngagementData',  
        '--disable-site-isolation-trials'
      ]
    }
  },
  directConnect: true,
  chromeDriver: 'C:/Windows/chromedriver.exe'
};
  
  
  
  