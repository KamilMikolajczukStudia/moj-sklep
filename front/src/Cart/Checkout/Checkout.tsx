import React, { useCallback, useState } from 'react'
import { makeStyles }                   from '@material-ui/core/styles'

import Stepper       from '@material-ui/core/Stepper'
import Step          from '@material-ui/core/Step'
import StepLabel     from '@material-ui/core/StepLabel'
import Button        from '@material-ui/core/Button'
import Typography    from '@material-ui/core/Typography'
import DialogTitle   from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog        from '@material-ui/core/Dialog'
import IconButton    from '@material-ui/core/IconButton'

import CloseIcon from "@material-ui/icons/Close"

import { AddressForm } from './AddressForm'
import { PaymentForm } from './PaymentForm'
import { Review }      from './Review'
import { forOf, If }   from '../../utils'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  button: {
    margin: theme.spacing(0, 1),
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  content: {
    minHeight: 400
  }
}))

const steps = [ 'Adres wysyłki', 'Płatność', 'Podsumowanie' ]

interface ICheckoutProps {
  open: boolean

  onClose(): void
}

export function Checkout({ open, onClose }: ICheckoutProps) {
  const classes = useStyles()
  const [ activeStep, setActiveStep ] = useState(0)

  const handleNext = useCallback(() => {
    setActiveStep(step => step + 1)
  }, [])

  const handleBack = useCallback(() => {
    setActiveStep(step => step - 1)
  }, [])

  return (
    <Dialog
      fullWidth
      open={ open }
      maxWidth="md"
      scroll="paper"
      onClose={ onClose }
    >
      <DialogTitle className={ classes.dialogTitle }>
        <Typography variant="h6">Kasa</Typography>

        <IconButton className={ classes.closeButton } onClick={ onClose }>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <DialogContent className={ classes.content }>
          <Stepper activeStep={ activeStep } className={ classes.stepper }>
            {
              forOf(steps)((label) =>
                <Step key={ label }>
                  <StepLabel>{ label }</StepLabel>
                </Step>
              )
            }
          </Stepper>

          <If condition={ activeStep === steps.length }>
            <Typography variant="h5" gutterBottom>
              Dziękujemy za złożenie zamówienia
            </Typography>

            <Typography variant="subtitle1">
              Twoje zamówienie zostało zakceptowane, dołożymy wszelkich starań aby dotarło do ciebie w jak najkrótszym
              czasie
            </Typography>
          </If>

          <If condition={ activeStep !== steps.length }>

            <Typography variant="h6" gutterBottom>
              { steps[activeStep] }
            </Typography>

            <If condition={ activeStep === 0 }>
              <AddressForm />
            </If>

            <If condition={ activeStep === 1 }>
              <PaymentForm />
            </If>

            <If condition={ activeStep === 2 }>
              <Review />
            </If>
          </If>
        </DialogContent>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" variant="contained" onClick={ handleBack } className={ classes.button }
                disabled={ activeStep === 0 }>
          Poprzedni
        </Button>

        <Button
          color="primary"
          variant="contained"
          onClick={ handleNext }
          className={ classes.button }
        >
          { activeStep === steps.length - 1 ? 'Zamów' : 'Następny' }
        </Button>
      </DialogActions>
    </Dialog>

  )
}
