# flights-take-home

Format of API

services:

/calculate
- request: request that includes a list of flights defined by a source and destination airport code. These flights may not be listed in order and must be sorted to find the total flight paths starting and ending at airports. Format would be array of arrays. Examples: [['SFO', 'EWR']], [['ATL', 'EWR'], ['SFO', 'ATL']], [['IND', 'EWR'], ['SFO', 'ATL'], ['GSO', 'IND'], ['ATL', 'GSO']]
- response: successful response would be an array of just source and destination airport code. Example response of above requests: ['SFO', 'EWR']. Unsuccessful responses are []


Considerations:
Further implementation would involve:
  - unit tests to test edge cases and also cases where there are arrays of thousands of lengths
  - detailed validation and error messages
  - caching popular routes
  - authentication and rate limiting for security purposes

Total time taken with documentation: 1hr 3min 23 sec
