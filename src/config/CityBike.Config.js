// TODO: Improve config solution, not ideal that all url's are included in the build
function apiConfig() {
    return {
        apiUrls: (process.env.NODE_ENV !== 'test'
            ? 
                {
                    locations: 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json',
                    statuses: 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json'
                }
            :   {
                    locations: '/data/stationsLocation.json',
                    statuses: '/data/stationsStatus.json'
                }
            ),
        headers: {
            'Client-Identifier': 'RobertLomeland-JobbSoker'
        }
    }
}

export default apiConfig();