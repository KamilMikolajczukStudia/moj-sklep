import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography                          from '@material-ui/core/Typography'
import Paper                               from '@material-ui/core/Paper'
import Select                              from '@material-ui/core/Select'
import MenuItem                            from '@material-ui/core/MenuItem'

import { ESort, ProductsContext } from '../Products'
import { Slider }                 from '@material-ui/core'
import { ToMoneyString }          from '../utils'
import Button                     from '@material-ui/core/Button'
import TextField                  from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    options: {
      padding: theme.spacing(2),
    },
    sortingList: {
      '&:focus': {
        backgroundColor: 'transparent'
      }
    },
    part: {
      marginTop: theme.spacing(4)
    },
    saveButton: {
      display: 'block',
      margin: 'auto'
    }
  }),
)

export function Options() {
  const classes = useStyles()
  const { sorting, applySorting, applyPriceLimit, applySearchFilter, minPrice, maxPrice } = useContext(ProductsContext)

  const [ change, setChanged ] = useState(false)
  const [ _priceFilter, _setPriceFilter ] = useState([ minPrice, maxPrice ] as [ number, number ]);
  const [ _sorting, _setSorting ] = useState(sorting)
  const [ _phrase, _setPhrase ] = useState('')

  useEffect(() => {
    _setPriceFilter([ minPrice, maxPrice ])
  }, [ minPrice, maxPrice ])

  const handleChangeSorting = useCallback((event: any) => {
      if (ESort[event.target?.value] !== undefined) {
        _setSorting(event.target.value)
        setChanged(true)
      }
    },
    []
  )

  const handleSearchChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      _setPhrase(value)
      setChanged(true)
    },
    []
  )

  const handleSortingChange = useCallback((event, newValue) => {
    _setPriceFilter(newValue)
    setChanged(true)
  }, [])

  const handleApply = useCallback(() => {
    applySorting(_sorting)
    applyPriceLimit(_priceFilter)
    applySearchFilter(_phrase)
    setChanged(false)
  }, [ _sorting, _phrase, applySearchFilter, applyPriceLimit, applySorting, _priceFilter ])

  return (
    <Paper className={ classes.options }>
      <Typography gutterBottom variant="h4">
        Opcje
      </Typography>

      <div className={ classes.part }>
        <TextField value={ _phrase } onChange={ handleSearchChange } fullWidth label="Szukaj" />
      </div>

      <div className={ classes.part }>
        <Typography gutterBottom>Sortowanie</Typography>

        <Select
          fullWidth
          value={ _sorting }
          onChange={ handleChangeSorting }
          inputProps={ { className: classes.sortingList } }
        >
          <MenuItem value={ ESort.None }>Brak</MenuItem>
          <MenuItem value={ ESort.PriceAsc }>Cena rosnąco</MenuItem>
          <MenuItem value={ ESort.PriceDesc }>Cena malejąco</MenuItem>
          <MenuItem value={ ESort.Name }>Alfabetycznie</MenuItem>
        </Select>
      </div>

      <div className={ classes.part }>
        <Typography
          gutterBottom>Cena: { ToMoneyString(_priceFilter[0]) } - { ToMoneyString(_priceFilter[1]) }</Typography>

        <Slider
          step={ 0.01 }
          min={ minPrice }
          max={ maxPrice }
          value={ _priceFilter }
          onChange={ handleSortingChange }
          aria-labelledby="range-slider-demo"
        />
      </div>

      <div className={ classes.part }>
        <Button disabled={ !change }
                size="large"
                color="primary"
                variant="contained"
                className={ classes.saveButton }
                onClick={ handleApply }>Zapisz</Button>
      </div>
    </Paper>
  )
}
