const fs = require('fs')
const fsPromises = fs.promises

const fund2 = require('./json/fund2.json')

const processData = async () => {

  // --- Step 1: Standardise the data ---

  const standardisedList = []

  fund2.forEach(proposal => {
    // Sanitising data
    const url = proposal['Website/GitHub repository (not required)'] || null
    const description = proposal['Detailed plan (not required) - Fill in here any additional details'] || null

    const createdAt = new Date(proposal['Date/Time']).toISOString()

    const requestedFunds = proposal['Requested funds in USD. Only use numbers! No symbols, letters, fractions. Payment will be in ada.']
    const parsedNumber = requestedFunds ? requestedFunds.replace(/\,|\s|\./g,'') : null
    const requestedFundsNumber = parsedNumber && !isNaN(Number(parsedNumber)) ? parseInt(parsedNumber, 10) : 0
    const requestedAmount = !isNaN(requestedFundsNumber) ? requestedFundsNumber : 0
    const requestedAmountText = requestedFunds || null

    const attachmentLinks = proposal['Attachments'] === 'NO' ? null : proposal['Attachments']

    // Putting information in new data model structure
    const standardisedProposal = {
      title: proposal['Title'],
      problemDescription: proposal['Details'],
      solutionDescription: proposal['Describe your solution to the problem'],
      relevantExperience: proposal['Relevant experience'], 
      outcomeObjectives: null, // Not availible in fund 2
      description,
      url,
      createdAt,
      requestedAmount,
      ideascaleId: proposal['Idea ID'],
      ideascaleUrl: proposal['URL'],
      ideascale: {
        stage: proposal['Stage'],
        ideaNumber: proposal['Idea Number'],
        author: proposal['Author'],
        commentsTotal: proposal['Comments'],
        attachmentLinks,
        requestedAmountText
      }
    }

    standardisedList.push(standardisedProposal)
  })

  await fsPromises
    .writeFile('fund2-standardised.json', JSON.stringify(standardisedList, null, 2))
    .then(() => console.log('Standardised data successfully processed'))
    .catch(error => console.log('Error: ', error))

  // --- Step 2: Capture poor data for manual processing ---

  const manualProcessingList = []

  standardisedList.forEach(proposal => {
    if (!proposal.requestedAmount && proposal.ideascale.requestedAmountText)
      manualProcessingList.push({
        ideascaleId: proposal.ideascaleId,
        requestedAmount: proposal.requestedAmount,
        requestedAmountText: proposal.ideascale.requestedAmountText
      })
  })

  await fsPromises
    .writeFile('requires-processing/requested-amount.json', JSON.stringify(manualProcessingList, null, 2))
    .then(() => console.log('Requires processing data successfully added'))
    .catch(error => console.log('Error: ', error))

  // --- Step 3: Combine standardised data to create seed data ---

  let seedDataList = [] 

  // Apply requestedAmount processed data if its been completed
  try {
    // Fund results data that was shared post release was applied manually to the proposals data
    const processedRequestedAmount = require('./processed/requested-amount.json')

    const processedMap = {}
    for (const proposal of processedRequestedAmount) {
      processedMap[proposal.ideascaleId] = proposal 
    }

    standardisedList.forEach(proposal => {
      seedDataList.push({
        ...proposal,
        requestedAmount: processedMap[proposal.ideascaleId]
          ? processedMap[proposal.ideascaleId].requestedAmount
          : proposal.requestedAmount
      })
    })
  } catch (error) {
    console.log('Warning - Request amount data was not been processed')

    // No processed data to apply, standardised list represents the final seed data
    seedDataList = standardisedList
  }

  await fsPromises
    .writeFile('fund2-seed-data.json', JSON.stringify(seedDataList, null, 2))
    .then(() => console.log('Seed data saved successfully'))
    .catch(error => console.log('Error: ', error))
}

processData()