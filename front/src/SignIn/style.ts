import { makeStyles } from '@material-ui/core/styles'

import tlo from '../img/your-money.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${tlo})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(6)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  logo: {
    width: 64,
    marginBottom: theme.spacing(3)
  }
}))

export default useStyles