**File Explainers**
- /data-changelog.md - Data that has been added, removed or updated between funds
- /data-model.ts - Data model to use for API that combines all Ideascale funds data as well as other added data
- /fund/csv - Ideascale data in CSV format
- /fund/json - Ideascale data in JSON format
- /fund/requires-processing - Data which needs to be manually processed and placed into the processed folder once completed
- /fund/processed - Manually processed data that gets incorporated into the final seed data
- /fund/fund-analysis.ts - Analysis on the Ideascale data used to create the standardisation script
- /fund/process-data.js - Script to standardise Ideascale data
- /fund/fund-standardised.json => Standardised data using the process data script
- /fund/fund-seed-data.json => Finalised seed data to use for the database
- /funds-and-challenges/results - Fund results data in PDF format
- /funds-and-challenges - Fund and challenges seed data

**Standardisation Process**
- Convert data to JSON format
- Analyse data for high value data, necessary Ideascale data to store and low value data that can be ignored
- Create a data model adding any high value data along with necessary Ideascale data
- Specify the steps to standardise the Ideasclae data to create the standardised data set
- Create a script to standardise the data
- Add in any required manual process where the script data can't standardise effectively
- Run the script to produce the fund-seed-data.json file

**Important Notes**
- USD Conversion - Fund 1 & 2 requested amount was given in ADA however this has been standardised to the equivalent USD value. The ADA to USD conversion values were taken from the fund results to make the conversions.
- Comments - Comments data has been added for reference though this is not vital data to expose through the API. The comments data has been omitted from being standardised
- Date/Time - Date/Time data from Ideascale is assumed to be UTC timezone
- Detailed Plan - Markdown has not been removed from any of the text fields