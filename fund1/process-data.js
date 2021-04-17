const fs = require('fs')

const fund1 = require('./json/fund1.json')

const processData = () => {
  const processedList = []

  fund1.forEach(proposal => {
    // Sanitising data
    const url = proposal['Website/GitHub repository (not required)'] || null
    const description = proposal['Detailed plan (not required) - Fill in here any additional details'] || null

    const createdAt = new Date(proposal['Date/Time']).toISOString()

    const requestedFunds = proposal['Requested funds (not required) - Amount requested should be in ada. No fractions please']
    const requestedFundsNumber = Number(requestedFunds)
    const requestedAmount = !isNaN(requestedFundsNumber) ? requestedFundsNumber : null
    const requestedAmountText = requestedFunds || null

    const attachmentLinks = proposal['Attachments'] === 'NO' ? null : proposal['Attachments']

    // Putting information in new data model structure
    const standardisedProposal = {
      title: proposal['Title'],
      problemDescription: proposal['Details'],
      solutionDescription: null, // Not available in fund 1
      relevantExperience: proposal['Relevant experience.  What work related to your proposed project have you or your team done so far and when did you start?'], 
      outcomeObjectives: proposal['Proposal summary.  What do you hope to get done?  Please seek clarity rather than impressiveness'],
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
        attachmentLinks: attachmentLinks,
        requestedAmountText
      }
    }

    processedList.push(standardisedProposal)
  })

  fs.writeFile(
    'fund1-standardised.json',
    JSON.stringify(processedList, null, 2),
    error => {
      if (error) return console.log('Error: ', error)
      else console.log('Data successfully processed')
    }
  )
}

processData()