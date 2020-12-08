import { Exception } from 'utils'
import { cmp } from '../../../../db'
import { select } from '../../Imports'
import { IWarehouseDao } from 'wholesale/daos/IWarehouse.dso'

export class WarehouseRepository {
  async productQuantity(productId: number) {
    const quantities = await select<IWarehouseDao>('quantity')
      .from('warehouse')
      .where(cmp('idProduktu', '=', productId))
      .run()

    if (quantities.length === 0) {
      throw new Exception(`Product id ${productId} not found`)
    }

    return quantities[0].quantity
  }
}
