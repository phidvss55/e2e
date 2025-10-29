import * as reporter from 'cucumber-html-reporter';

const options: reporter.Options = {
  theme: 'bootstrap',
  jsonFile: 'test-results/cucumber-report.json',
  output: 'test-results/cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': '0.3.2',
    'Test Environment': 'STAGING',
    Browser: 'Chrome  54.0.2840.98',
    Platform: 'Windows 10',
    Parallel: 'Scenarios',
    Executed: 'Remote'
  },
  name: 'Automation Report'
};

reporter.generate(options);
