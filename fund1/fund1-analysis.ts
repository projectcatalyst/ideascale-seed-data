/*
  --- Data analysis ---

  High value data fields - Data that will be useful in the long term
    - "Date/Time" - Proposal creation date
    - "Title" - Proposal title
    - "Details" - Proposal problem overview
    - "Describe your solution to the problem" - Proposal solution overview
    - "Relevant experience" - Proposal team relevant experience overview
    - "Detailed plan (not required) - Fill in here any additional details" - Full description of proposal
    - "Attachments" - Attachments for a proposal hosted on Ideascale
    - "Requested funds (not required) - Amount requested should be in ada. No fractions please" - Full amount requested for proposal
    - "Website/GitHub repository (not required)" - Website or Github page relevant to proposal
    - "Proposal summary.  What do you hope to get done?  Please seek clarity rather than impressiveness" - Proposal outcome objectives overview

  Ideascale data fields - Fields useful in the context of Ideascale, this data will likely lose value over time when a system replaces Ideascale
    - "Idea ID" - Ideascale internal identifier
    - "URL" - Ideascale proposal URL
    - "Tags" - Tags in Ideascale can include general tags or ones for what type of collaborators the proposal is looking for
    - "Idea Number" - The idea number within the Catalyst Ideascale project
    - "Stage" - Ideascale stage of proposal, e.g. Discuss, Assess, Archive
    - "Author" - Current name of the Ideascale user, the field does not represent a unique identifier
    - "Comments" - Total number of comments

  Low value fields - Fields that have little to no value or have a quickly diminishing value. This original data can still be stored however it is not vital to add to an API data layer
    - "Campaign" - Fund name that includes the word "challenge", can be replaced with "Fund 2"
    - "Campaign Group" - States 'Previous funds', unclear of data value?
    - "Latitude" - Not used
    - "Longitude" - Not used
    - "Private" - Not used
    - "Reviewscale" - Not used
    - "Estimate ROI" - Not used
    - "Pairwise Win %" - Not used
    - "Fund Collected %" - Not used
    - "Last Stage Change" - Internal Ideascale date for updates, data isn't important outside the system. Catalyst already has the dates for each part of the funding stages
    - "Owner" - Not used
    - "Team" - Not used
    - "Total Votes" - Not used
    - "Contributors" - Not used
    - "Vote Up" - Not used
    - "Vote Down" - Not used
*/

/*
  --- Suggested data model ---

  Standardisation rules
    - Empty strings - Santise empty string values and update to null
    - Requested funds - If number then add as requested amount otherwise null. Add full string to field requestedAmountText.
    - Date Time - Convert Date time to ISO format
    - Attachments - Remove string 'NO' and replace with null

  Notes - From the data model below
    - Data likely to stay the same - (title, description, url, attachmentLinks, requestedAmount, createdAt) Proposals will likely always have this data in a similar data structure
    - Data most likely to change - (problemDescription, solutionDescription, relevantExperience, outcomeObjectives) This data could break into multiple fields and different formats over time
    - Ideascale data in JSON - This Ideascale data has some value though is not essential to the proposal data. As a result it can be added as JSON in the new database
    - Ideascale id & url - There is value in allowing for the API having quicker access to the Ideascale id for search and the url for linking the proposal to the source

  Data model:
*/
interface Proposal1 {
  title: string // Title
  problemDescription: string // Details
  solutionDescription: string // Describe your solution to the problem
  relevantExperience: string // Relevant experience
  outcomeObjectives: string // Proposal summary.  What do you hope to get done?  Please seek clarity rather than impressiveness
  description: string // Detailed plan (not required) - Fill in here any additional details
  url: string // Website/GitHub repository (not required) => Website
  createdAt: string // Date/Time
  requestedAmount: number // Requested funds in USD. Only use numbers! No symbols, letters, fractions. Payment will be in ada. => Converted to number or becomes null
  ideascaleId // Idea ID
  ideascaleUrl // URL
  ideascale: { // (stored as JSON)
    stage: string // Stage
    ideaNumber: number // Idea Number
    author: string // Author
    commentsTotal: number // Comments
    attachmentLinks: string // Attachments (list of all attachment urls provided as a string)
    requestedAmountText: string // Stores the default value for the Requested funds
  }
}

const Fund1ProposalExample = {
  "Date/Time": "18/Aug/20 9:48 PM",
  "Idea ID": 317202,
  "Idea Number": 185,
  "Stage": "Discuss",
  "Author": "Mercy",
  "Campaign": "Fund1 Challenge",
  "Campaign Group": "Previous funds",
  "Total Votes": 0,
  "Vote Up": 0,
  "Vote Down": 0,
  "Comments": 3,
  "Title": "AfroFinLab Podcast ",
  "Details": "Many of us claim that a higher mission brought us to blockchain. Current Crypto podcasts however does not yet reflect that",
  "Tags": "podcast,education,africa,crypto,cardarno,awareness",
  "URL": "http://ideascale.com/t/UM5UZBYPC",
  "Attachments": "https://cardano.ideascale.com/a/idea/317202/30988/download, https://cardano.ideascale.com/a/idea/317202/31275/download",
  "Owner": "",
  "Contributors": "no contributors",
  "Latitude": "",
  "Longitude": "",
  "Team": "",
  "Reviewscale": 0,
  "Estimate ROI": "0%",
  "Pairwise Win %": "0%",
  "Fund Collected %": "0%",
  "Last Stage Change": "13/Sep/20",
  "Private": false,
  "Requested funds (not required) - Amount requested should be in ada. No fractions please": "110,000 ADA",
  "Detailed plan (not required) - Fill in here any additional details": "With the AfroFinLab Podcast, we strive to ensure that Cardano delivers on its mission of decentralization and pushing power to the margins. Not only do we believe that Cardano will contribute to long overdue solutions to problems facing Africans, but that in doing so, we firmly believe that these solutions will serve as a guiding example to all people of what Cardano can do.\n\nThe AfroFinLab Podcast combines philosophical discussions with real investigations about how all people can adopt and use Cardano-based technology.\n\nFor our audience, we have two groups in mind: people who are already engaged with blockchain/Cardano and people who are new to the space. For people who are already part of the blockchain/Cardano ecosystem, we aim to discuss the big picture: how do we accomplish the goals of decentralization and of pushing power to margins? What would it mean for Cardano's projects in Africa to be successful? How can all community members contribute?\n\nWe also seek to educate newcomers to the space by sharing an overview of what is possible and discussing some of the fundamentals of blockchain and in particular Cardano.\n\nIn weekly episodes we will focus on two recurring themes:\n\n1\\. High level philosophical discussions about the value of Cardano and the problems it might help to solve.\n\n2\\. Real-time interaction with new technologies: for example, live and in real time, collaborating on the writing of a Plutus smart contract that puts in code some of the informal agreements we've made as co-hosts. We hope for this approach to allow all audience members to feel like they too could adopt this technology in response to their own challenges.\n\nWebsite coming soon - secured our domain names last night",
  "Proposal summary.  What do you hope to get done?  Please seek clarity rather than impressiveness": "The AfroFinLab Podcast is a collaboration between community members seeking to deliver on the promises of Cardano, especially in Africa.",
  "Relevant experience.  What work related to your proposed project have you or your team done so far and when did you start?": "We have recorded our first two episodes already, featuring one Cardano Ambassador and three members of Project Catalyst",
  "Website/GitHub repository (not required)": ""
}

const Fund1CommentsExample = {
  "Date": "05/Jan/21 8:55 PM",
  "Idea ID": 317191,
  "Idea Number": 183,
  "Author": "MariaCarmo369",
  "Comment": "@paulmullins  Hi thanks for your comments. Our proposal now call Lovelace Academy I will check it out thanks again and sure if they want come on in my actually channel they are welcome www.youtube.com/tresseisnove\n\nI speak Portuguese and English and would be a pleasure talk to them",
  "Attachments": "NO"
}
