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

  Ideascale data fields - Fields useful in the context of Ideascale, this data will likely lose value over time when a system replaces Ideascale
    - "Idea ID" - Ideascale internal identifier
    - "URL" - Ideascale proposal URL
    - "Tags" - Tags in Ideascale can include general tags or ones for what type of collaborators the proposal is looking for
    - "Idea Number" - The idea number within the Catalyst Ideascale project
    - "Stage" - Ideascale stage of proposal, e.g. Discuss, Assess, Archive
    - "Author" - Current name of the Ideascale user, the field does not represent a unique identifier
    - "Comments" - Total number of comments
    - "Annotations" - Annotations assessors added to a proposal

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
interface Proposal2 {
  title: string // Title
  problemDescription: string // Details
  solutionDescription: string // Describe your solution to the problem
  relevantExperience: string // Relevant experience
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
    annotations: string // Annotations
    attachmentLinks: string // Attachments (list of all attachment urls provided as a string)
    requestedAmountText: string // Stores the default value for the Requested funds
  }
}

const Fund2ProposalExample = {
  "Date/Time": "29/Sep/20 5:18 AM",
  "Idea ID": 323778,
  "Idea Number": 1767,
  "Stage": "Archive",
  "Author": "Ken Stanton",
  "Campaign": "Fund2 Challenge",
  "Campaign Group": "Previous funds",
  "Total Votes": 0,
  "Vote Up": 0,
  "Vote Down": 0,
  "Comments": 16,
  "Title": "Cardano and FP in Malawi",
  "Details": "Malawi is a poor nation with a large young population. Heavy reliance on foreign aid. Need for more innovative thinking. Not many exports.",
  "Tags": "",
  "URL": "http://ideascale.com/t/UM5UZBbA0",
  "Attachments": "https://cardano.ideascale.com/a/idea/323778/32630/download, https://cardano.ideascale.com/a/idea/323778/33189/download",
  "Owner": "",
  "Latitude": "",
  "Longitude": "",
  "Team": "",
  "Reviewscale": 0,
  "Estimate ROI": "0%",
  "Pairwise Win %": "0%",
  "Fund Collected %": "0%",
  "Last Stage Change": "03/Feb/21",
  "Private": false,
  "Annotations": "https://cardano.ideascale.com/a/dtd/Cardano-and-FP-in-Malawi/323778-48088?show=comments&comment=328878#idea-tab-comments",
  "Describe your solution to the problem": "My plan is to teach functional programming in Malawi, give people access to a global market, and ignite tech culture at a grassroots level.",
  "Relevant experience": "6 Months living in Malawi. 15 years working with Malawians to achieve goals in their communities. 25 years as a hobbyist programmer.",
  "Detailed plan (not required) - Fill in here any additional details": "*   **I cannot legally start a business in Malawi without at least $50,000 worth of funds to invest in the \"Warm Heart of Africa\".** Part of the funds will go towards **supporting 10 people with a good living wage for at least 6 months** and the other part will go towards business expenses and training programs **to teach young people functional programming and the possibilities of Cardano.**\n\n  \n\n**Timeline ( After** **receiving funds ):**\n\n**\\-- Month 1 --**\n\n*   Apply for a business permit to live and work in Malawi long term.\n*   Coordinate with my team over there to set up an organizational structure for the business and get them started with the basics of using Cardano.\n*   Make sure the team starts getting paid so they can focus on our project.\n*   Make travel arrangements.\n*   Have my team find a good location to work and get it set up with power and internet.\n\n**\\-- Month 2 --**\n\n*   Acquire my business permit.\n*   Ship my library and equipment to Malawi and fly there.\n*   Start working on projects with my team through mob programming so that I can train them as developers and make progress on delivering value to the Cardano community at the same time, while taking some time to dive into the theory, history, and features of languages that shape the way we think about writing code.\n*   Start working on a reliable means of exchanging MWK and Ada.\n*   Start building a good relationship with local government and educate them on the opportunities with Cardano for improving reliability and trust in contracts.\n\n**\\-- Month 3 --**\n\n*   Start reaching out to secondary schools about providing free or very cheap training to students and using what we learn from training my team in the previous month to improve the process of getting people started with software development and thinking about globally distributed applications.\n*   Give students the opportunity to learn by helping out with the projects that our team is working on or to start projects of their own.\n*   Part of the training will involve working together as a team and thinking creatively about how to find solutions for problems and opportunities in the market.. the idea is to train teams that could potentially break off and start companies of their own, and hopefully share the initiative to train even more teams.\n*   Develop and refine learning materials for students.\n\n**\\-- Months 4 to 6 --**\n\n*   Continue working on projects and training students as well as other members of the community who are interested in learning about software development.\n*   Focus on producing an MVP that could bring in enough money to become sustainable before we run out of funds.\n*   Explore the potential for hiring on more developers (promising candidates from the training program).\n*   Possibly producing an audio podcast about our progress or maybe some videos of mob programming sessions.\n*   Look for more ways to promote innovative thinking and original Malawian ideas.\n\n  \n\n**Budget (500,000 Ada requested):**\n\n**\\--** **240,000 Ada --**\n\n*   4000 Ada / month per team member, or about $400/mo -- a very good wage in Malawi (10x what some of the poorer people make).\n*   To pay **a team** **of 10 people for 6 months** who will help me develop the plan for applying Cardano to some of the problems in Malawi, and who will be my initial group of functional programming students.\n\n**\\-- 260,000 Ada --**\n\n*   Setting up exchange between MWK and Ada.\n*   Setting up facilities.\n*   Getting reliable power -- one of my team members is an electrician.\n*   Internet costs.\n*   Ramping up after the initial team gains proficiency.\n*   Maintaining contracts on Cardano.\n*   Community outreach -- one team member went to school for community development, and another has overseen social welfare projects for many years such as feeding the poor and building houses for widows and is well known in many parts of Malawi.\n*   Computers for more teams and materials for setting up after-school programs for secondary students.\n*   More work on the business smart contract, so that people in the Cardano community can hire teams with relevant portfolios to work on their projects.\n\n  \n\n**Team Members So Far:**\n\n*   **Jackson Dimba**, the director of ***Hearts and Hands in Action***.. a non-profit based in Salima, Malawi. He's joining the team as an advisor, and will probably help organize community events.\n*   **Gift Lipato**, an electrician. He's eager to learn how to code.\n*   **Vanessa Lipato**, a business woman with an educational background in community development. She wants to learn more about software development and will probably take a leading role in community interaction.\n*   **Madalitso Kalinde**, a financial assistance officer. He's very interested in learning to write applications involving finances.\n\n  \n\n**Some more about me:**\n\nI love Programming, Physics, Linguistics, Category Theory, System Dynamics, Cultural Anthropology, Cellular Biology, Astronomy, and Graphic Design. I started programming when I was 12 (25 years ago) in QBasic with the help of my mom who did some Basic programming for work in the early 80's. For the last 15 years I've spent 2-4 hours a day studying, and mostly focus on programming language design and how language features affect your productivity, developer experience, and the way you think about structuring your code. The things that brought me to Cardano were the use of Haskell, formal verification, and the fact that a hero like Phil Wadler was working on the smart contract language.\n\nMy favorite language is probably Elm, in which I'm highly confident in my skills.. I've also spent a lot of time reading Haskell code.. mostly the Elm compiler. I think Elm is a good place to start teaching, because of it's notoriously helpful compiler messages. It's like Haskell, but simpler.. a good gateway drug to Haskell.\n\nI don't have a lot on my Github page (mostly silly little Elm apps), but I've linked it to my proposal.\n\n  \n\n**Learning and Teaching**\n\n**\\-- Some Theory --**\n\nWhen someone teaches somethin*g, there's often a mental model for the subject in the teacher's head. The goal is to replicate the mental model in the minds of the students, building up new knowledge upon prerequisite structures.*\n\nThis is a valuable approach if the subject you're teaching has a rigid structure, like how an algebra builds upon simple rules to provide structure for describing more complex problems, but relying on a limited source of information and possibly taking a standardized testing approach to assessing a student's competency in the subject produces a more static equilibrium in understanding of the system space of problems to solve related to the topic at hand.\n\nRestrictions are often beneficial if they can steer someone clear of avoidable pitfalls. Such is the case in functional programming where things like immutability can give you assurance that data isn't being changed from underneath you and that you can easily test the correctness of your functions, because the lack of side-effects means that the same inputs won't produce different results. This gives you the freedom to work on the function in isolation from the rest of the system which means holding less code in your head at a time. When you're trying to learn how to solve a problem in the real world, restrictions on how you can approach the problem will structure your strategy for implementing a solution, but the learning process benefits from being able to reach out into the unknown and destructure information from a potentially infinite source.. This is the categorical dual to teaching a known structure.\n\nHaving a medium that allows you to prove the viability of your ideas is a good step towards weeding out any knowledge structures that may contain misconceptions, and if you require students to teach each other what they learn, it forces them to take mental note of the dependency hierarchy of information they are trying to share and also how to explicitly articulate things in a way that's easier to understand.\n\nIf students are taking their education into their own hands, there is potential to produce a wider range of knowledge in the group, which allows for more dynamic coverage of the system space of solutions to a problem. It also means less a reliance on an instructor. There's only the need for someone to focus on facilitating the desired environment for learning to take place and maybe steer people in the right direction if they go off course. It's also easier for students to take the teacher's role after they've gained a little experience, which produces the possibility for exponential growth in the reach of education if you have teams that split and produce more teams.\n\n***\\-- Some Application --***\n\nI see mob programming as a good model to allow students to teach each other and figure out solutions to problems as a group. It also requires less computers, which will make it cheaper to scale up. More eyes on a problem would mean less of a chance of mistakes and more insight into the trade-offs between different approaches.\n\nA group engaged in mob programming also wouldn't require much to scale into a startup because the style of learning involved models how teams usually work in the real world anyway.. People discussing how to move forward, while they take turns at the keyboard typing what the others decide they should. New developers get to start out with opportunities to actually write code even before they might entirely understand what it is that they are typing while the others help them learn.\n\nStruggling through problems, with insight from mistakes in approaches taken, can also produce perseverance in finding a good solutions, even if they might take more time and effort to implement. A well researched and proven system design is often worth waiting for -- which is why, I think, people in our community appreciate Cardano.\n\n  \n\n**Project Ideas:**\n\n*   Web-based, interactive learning materials for functional programming, Cardano use, and smart contract development that is optimized for viewing on a smartphone.\n*   Napkin: A step evaluator for Plutus Core to help people decipher the infamous golden symbols on a certain black table tissue.\n*   A game idea I've been working on with a physics system that incorporates Plutus as an in-game scripting language with the ability to interface with Cardano to store game-state hashes as snapshots of the system as well as player inventories, etc…\n*   Porting plc to the Pony language and use the Haskell version for parity checking. Pony is a Object-Oriented / Actor-Model language, but it eliminates runtime errors with its strong algebraic type system and the need for locks on data with its reference capabilities. It's good for distributing low-latency code across all your cores, and since it's garbage collection happens at the actor level, there's no stop-the-world GC, like you'd find in GHC.. which concerns me for something like a game server.\n*   An app where people can buy and sell things, hire transport for goods, and negotiate the price for each step. It could also include a rating system for sellers and transporters so they have to maintain a good reputation. Payments could be finalized when the goods are delivered. There could also be things like insurance for sellers and drivers so that if a valuable product is lost in transit, the seller can still get paid, or if a driver has to return a product to the sender, the driver can still get paid for the extra work.\n*   An exchange between MWK and Ada. Maybe a stable coin for the kwacha.\n*   Experimentation in higher-level language features built on Plutus Core.. What can be possible if you set aside the historical baggage of currently available options?",
  "Requested funds in USD. Only use numbers! No symbols, letters, fractions. Payment will be in ada.": "500000",
  "Website/GitHub repository (not required)": "https://github.com/thistent"
}

const Fund2CommentsExample = {
  "Date": "03/Jan/21 10:33 AM",
  "Idea ID": 323778,
  "Idea Number": 1767,
  "Author": "Ken Stanton",
  "Comment": "Hey everyone, I just finished editing and publishing my first podcast episode with some of my team members in Malawi.. I admit that it's a little rough, but that's how first episodes can go sometime. For any of you who might have decided to vote for my proposal, I'd like to say zikomo kwambiri (thanks very much—in Chichewa), but either way, I'm gonna try to figure this one out and make my dream to live and teach in Africa a reality. I wish everyone the best in this new year!\n\nhttps://anchor.fm/cardano-malawi/episodes/Discussing-the-Use-of-Cardano-in-Malawi-eof5me",
  "Attachments": "NO"
}

