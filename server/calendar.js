const sql = require('mssql')
const config = require('../config/default.js')

const {db: {server, database, user_id, password, encrypt}} = config


module.exports = async (startDate, endDate) =>  {
    try {
        await sql.connect(`Server=${server};Database=${database};User Id=${user_id};Password=${password};Encrypt=${encrypt}`)

        const result = await sql.query`
        DECLARE @StartDate DATE
        DECLARE @EndDate DATE

        /*Даты для измения*/
        SET @StartDate = ${startDate}
        SET @EndDate= ${endDate};

        WITH DATES AS
        (
            SELECT 
            @StartDate AS [Date],
            @StartDate AS initDate,
            @EndDate  AS endDate

            UNION ALL

            SELECT DATEADD(day,1, [Date]), initDate, endDate
            FROM DATES
            WHERE [Date] < endDate
        ), 
        CALENDAR AS
        (
        SELECT 
        (CASE
            WHEN YEAR([Date]) > YEAR(initDate) AND DATEPART(WEEKDAY, [Date]) <> 1
            THEN (YEAR([Date]) - YEAR(initDate)) * 52 + DATEPART(WEEK, [Date])
            WHEN YEAR([Date]) > YEAR(initDate) 
            THEN (YEAR([Date]) - YEAR(initDate)) * 52 + DATEPART(WEEK, [Date]) - 1
            WHEN DATEPART(WEEKDAY, [Date]) = 1
            THEN DATEPART(WEEK, [Date]) - 1
            ELSE DATEPART(WEEK, [Date])
            END) AS [WeekID], 
        DATENAME(WEEKDAY, [Date]) AS [Day],
        CONVERT(VARCHAR(10),[Date],23) AS [Date]
        FROM DATES
        )

        SELECT (CASE
                WHEN [WeekID] % 52 = 0
                THEN 52
                WHEN [WeekID] > 52
                THEN [WeekID] % 52 
                ELSE [WeekID]
                END
            ) as 'Week', 
            isnull([Monday],'') as 'Monday',  
            isnull([Tuesday],'') as 'Tuesday',  
            isnull([Wednesday],'') as 'Wednesday',  
            isnull([Thursday],'') as 'Thursday', 
            isnull([Friday],'') as 'Friday',  
            isnull([Saturday],'') as 'Saturday',  
            isnull([Sunday],'') as 'Sunday'
        FROM CALENDAR
        PIVOT 
        (
        MAX([Date]) 
        FOR [Day] IN ( [Monday], [Tuesday], [Wednesday], [Thursday], [Friday], [Saturday], [Sunday])
        ) a
        ORDER BY [WeekID]

        OPTION (MAXRECURSION 0)`
        return result
      } catch (error) {
        console.error(error)
      }
    }