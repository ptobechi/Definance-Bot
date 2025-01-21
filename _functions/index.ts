import {
    API_KEY,
    STOCK_API_KEY,
    Stocks
} from "@/config";

export const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
};

export function formatDateToDDMMYY(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of year
  
    return `${day}-${month}-${year}`;
}

// format to usd
export const formatToUSD = (number: any) => {
    // Create a new NumberFormat object with options for USD currency formatting
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  
    // Format the number as USD
    const formattedNumber = formatter.format(number);
  
    return formattedNumber;
};

export const calculateProfit = (
    amount: string,
    start_date: string,
    close_date: string,
    roi: string // Daily ROI as a percentage (e.g., "0.4" for 0.4% daily)
): number => {
    // Convert strings to numbers
    const principal = parseFloat(amount);
    const dailyROI = parseFloat(roi);

    // Edge case: If inputs are invalid, return 0
    if (isNaN(principal) || isNaN(dailyROI)) {
        return 0;
    }

    // Parse the start date and close date
    const startDate = new Date(start_date);
    const closeDate = new Date(close_date);
    const currentDate = new Date(); // Current date

    // Calculate the total number of days in the investment period
    const totalTimeDiff = closeDate.getTime() - startDate.getTime();
    const totalDays = Math.floor(totalTimeDiff / (1000 * 3600 * 24));

    // Calculate the number of days elapsed so far
    const currentTimeDiff = currentDate.getTime() - startDate.getTime();
    const currentDaysElapsed = Math.min(Math.floor(currentTimeDiff / (1000 * 3600 * 24)), totalDays);

    // Calculate the profit based on the days elapsed
    const currentProfit = principal * (dailyROI / 100) * currentDaysElapsed;

    return currentDaysElapsed >= totalDays ? principal * (dailyROI / 100) * totalDays : currentProfit;
};

export const crypto2usd = async (cryptoSymbol: string, usdAmount: string) => {
    try {
        const response = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${cryptoSymbol}`);
        const data = await response.json();
        const cryptoRate = data.data.rates.USD;
        const cryptoAmount = parseFloat(usdAmount) * parseFloat(cryptoRate);
  
        return cryptoAmount.toFixed(5);
    } catch (error) {
        console.error(error);
        return 0.00
    }
}

export const usd2crypto = async (cryptoSymbol: string, usdAmount: string) => {
    try {
        const response = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${cryptoSymbol}`);
        const data = await response.json();
        const cryptoRate = data.data.rates.USD;
        const cryptoAmount = parseFloat(usdAmount) / parseFloat(cryptoRate);


        return cryptoAmount.toFixed(5);
    } catch (error) {
        console.error("Failed to fetch crypto conversion rate:", error);
        return null
    }
}

export async function coinDetail(req: any) {
    const code = req.toUpperCase()

    return await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
        method: "POST",
        headers: new Headers({
            "content-type": "application/json",
            "x-api-key": API_KEY,
        }),
        body: JSON.stringify({
            currency: "USD",
            code,
            meta: true,
        }),
    });
}

// calculate the daily roi for an investment
export const DailyProfit = (amount: any, daily_return: any) => {
    const P3 = parseFloat(amount) * (parseFloat(daily_return) / 100);
  
    return P3;
};

// convert duration to future date
export const futureDate = (date: any) => {
    // Get today's date
    let today = new Date();

    // Add `date` days to today's date
    today.setDate(today.getDate() + parseFloat(date));

    // Extract day, month, and year from the future date
    const day = String(today.getDate()).padStart(2, "0"); // Ensure two digits for day
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure two digits for month
    const year = today.getFullYear();

    // Return the future date in d/m/y format
    return `${month}/${day}/${year}`;
};

// get stocklist and company information
export const getStockCompanyInformation = async (): Promise<any> => {
    try {
        const query = Stocks.join(',');
        const response = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}`, {
            method: "GET",  // Typically, "GET" is used for retrieving data, but check API documentation.
            headers: {
                "Content-Type": "application/json",
                "x-api-key": STOCK_API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching stock company information:", error);
        throw error;
    }
};
