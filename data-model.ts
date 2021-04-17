interface Proposal {
  // Data newly added to proposals to use on the website but also available to other projects
  id: string
  fundCategoryId: string // id for FundCategory data model
  tags: [string] // Link to Tag slug ids
  currency: string // Currency code such as ADA or USD
  status: string // Enum values such as PENDING, FUNDED, ARCHIVED

  // Data extracted from Ideascale
  title: string
  problemDescription: string
  solutionDescription: string
  relevantExperience: string
  outcomeObjectives: string
  description: string
  url: string
  createdAt: string
  requestedAmount: number
  ideascaleId: number
  ideascaleUrl: string
  ideascale: {
    stage: string
    ideaNumber: number
    author: string
    commentsTotal: number
    annotations: string
    attachmentLinks: string
    requestedAmountText: string
  }
}

interface FundRound {
  id: string
  name: string // Fund 3
}

interface FundCategory {
  id: string
  fundRoundId: number
  name: string
  fundingAmount: number
  currency: string
}