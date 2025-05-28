const queryValue = (query: string, url: string) => {
    try {
        const urlSearchParams = new URLSearchParams(url);
        const searchValue = urlSearchParams.get(query);
        return searchValue;
    } catch (error) {
        console.error("An error occurred while querying the value:", error);
        return null;
    }
};

export default queryValue;
