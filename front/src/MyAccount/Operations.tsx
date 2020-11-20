import React, { ReactElement, useContext, useState } from 'react'

import { CellParams, ColDef, DataGrid }    from '@material-ui/data-grid'
import Paper                               from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { HttpContext }            from '../Http'
import { ToMoneyString, useInit } from '../utils'
import { IOperation }             from './Operation'

interface ICellParams<T extends { id: number }> extends CellParams {
  data: T
}

interface IColumn<T extends { id: number }> extends Pick<ColDef, Exclude<keyof ColDef, 'field' | 'renderCell'>> {
  field: keyof T,
  renderCell?: (params: ICellParams<T>) => ReactElement
}

interface IAmountProps {
  data: IOperationPrepared
}

function Amount({ data }: IAmountProps) {
  return <span style={ { color: data.isNegative ? 'red' : 'green' } }>{ data.amount }</span>
}

const columns: IColumn<IOperationPrepared>[] = [
  { field: 'id', headerName: 'Id', width: 75 },
  {
    field: 'amount',
    headerName: 'Kwota',
    width: 200,
    renderCell: ({ data }) => <Amount data={ data } />
  },
  { field: 'userName', headerName: 'Odbiorca / nadawca', width: 300 },
  { field: 'title', headerName: 'Tytuł', width: 400 },
  { field: 'date', headerName: 'Data', width: 300 },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      userSelect: 'none',
      marginBottom: 400,
    }
  }),
)

interface IOperationsEndpoint {
  data: IOperation[]
  message: 'allOperations'
}

interface IOperationPrepared extends Pick<IOperation, Exclude<keyof IOperation, 'isoDate' | 'amount'>> {
  date: string
  amount: string
  isNegative: boolean
}

export default function Operations() {
  const classes = useStyles()
  const { post } = useContext(HttpContext)

  const [ loading, setLoading ] = useState(true)
  const [ operations, setOperations ] = useState([] as IOperationPrepared[])

  useInit(() => {
    async function LoadOperations() {
      const operations = await post<IOperationsEndpoint>('/operations')

      if (operations === null) {
        setLoading(false)
        return
      }

      const prepared = operations.data.map(({ isoDate, amount, ...rest }) => ({
        ...rest,
        date: (new Date(isoDate)).toLocaleString(),
        amount: ToMoneyString(amount),
        isNegative: amount < 0
      }))

      setOperations(prepared)
      setLoading(false)
    }

    LoadOperations().then()
  })

  return (
    <Paper classes={ { root: classes.root } }>
      <DataGrid
        className={ "ala" }
        autoHeight
        pageSize={ 5 }
        rows={ operations }
        loading={ loading }
        hideFooterSelectedRowCount
        columns={ columns as ColDef[] }
      />
    </Paper>
  )
}
