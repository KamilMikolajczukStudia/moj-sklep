import Operation from './Operation'
import * as operations from './operations.json'

const operationsModel = operations.map(el => new Operation(el))

export default operationsModel
