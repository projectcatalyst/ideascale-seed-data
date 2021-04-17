**Top Level Files**
- data-changelog.md - Data that has been added, removed or updated between funds
- data-model.ts - Data model to use for API that combines all Ideascale funds data as well as other added data

**Funds File Structure**
- Fund => csv - Ideascale data in CSV format
- Fund => json - Ideascale data in JSON format
- Fund => fund-analysis.ts - Analysis on the Ideascale data used to create the standardisation script
- Fund => process-data.js - Script to standardise Ideascale data
- Fund => fund-standardised.json => Standardised data to use for API

**Standardisation Process**
- Convert data to JSON format
- Analyse data for high value data, necessary Ideascale data to store and low value data that can be ignored
- Create a data model adding any high value data along with necessary Ideascale data
- Specify the steps to standardise the Ideasclae data to create the standardised data set
- Create a script to standardise the data and run it using the Ideascale data

**Notes**
- Comments - Comments data has been added for reference though this is not vital data to expose through the API. The comments data has been omitted from being standardised.
- Date/Time - Date/Time data from Ideascale is assumed to be UTC timezone
- Detailed Plan - Markdown has not been removed from any of the text fields

**TODO**
- Manual standardisation - The Ideascale requested funds amount value is a string that can have the number for the requested amount value nested within other text in the string. This value could be manually extracted for those cases and used in the number field for requestedAmount instead of being standardised to becoming a null value.