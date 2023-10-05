interface Data {
    report: {
        id: string
        source: string
        amount: number
        created_at: Date
        updated_at: Date
        type: ReportType
    }[]
}

export enum ReportType {
    INCOME = "income",
    EXPENSE = "expense"
}


export const data: Data = {
    report: [
        {
            id: "uuid1",
            source: "Salary",
            amount: 100000,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME
        },
        {
            id: "uuid2",
            source: "YouTube",
            amount: 25000,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE
        },
        {
            id: "uuid3",
            source: "Netflix",
            amount: 2500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME
        },
        {
            id: "uuid4",
            source: "Twitter",
            amount: 38500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE
        },
        {
            id: "uuid5",
            source: "Sidehustle",
            amount: 8400,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME
        }
    ],
}



