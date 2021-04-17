const fs = require('fs')

const fund2 = require('./json/fund2.json')

const processData = () => {
  const processedList = []

  fund2.forEach(proposal => {
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
      solutionDescription: proposal['Describe your solution to the problem'],
      relevantExperience: proposal['Relevant experience.  What work related to your proposed project have you or your team done so far and when did you start?'], 
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

    processedList.push(standardisedProposal)
  })

  fs.writeFile(
    'fund2-standardised.json',
    JSON.stringify(processedList, null, 2),
    error => {
      if (error) return console.log('Error: ', error)
      else console.log('Data successfully processed')
    }
  )
}

processData()