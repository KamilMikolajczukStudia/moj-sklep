import React from "react"

import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import CssBaseline from "@material-ui/core/CssBaseline"
import Grid from "@material-ui/core/Grid"
import StarIcon from "@material-ui/icons/StarBorder"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  gridCard: {
    display: "flex",
    minHeight: 450,
  },
  card: {
    display: "flex",
    flexDirection: "column",
  },
  flex1: {
    flex: 1,
  },
}))

const tiers = [
  {
    title: "Wolny słuchacz",
    price: 10,
    description: [
      "Ostatni rząd",
      "Brak materiałów promocyjnych",
      "Brak możliwości zadawania pytań",
      "limit 15 osób",
    ],
    buttonText: "Zapisz się już teraz",
    buttonVariant: "outlined",
  },
  {
    title: "Zwykły uczestnik",
    subheader: "Polecane",
    price: 50,
    description: [
      "Środkowe rzędy",
      "Pełny zestaw materiałów",
      "Możliwość zadawania pytań w wyznaczonym czasie",
      "limit 200 osób",
    ],
    buttonText: "Zapisz się",
    buttonVariant: "contained",
  },
  {
    pro: true,
    title: "Uczestnik PRO",
    price: 150,
    description: [
      "Pierwsze rządy",
      "Pełny zestaw materiałów",
      "Spotkanie w mniejszym gronie po wykładzie",
      "Możliwość dyskusji indywidualnej",
      "Limit 20 soób",
    ],
    buttonText: "Bądz PRO",
    buttonVariant: "outlined",
  },
]

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
]

export function Pricing() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="primary"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.toolbarTitle}>
            Bilety na wykład
          </Typography>

          <nav>
            <Link
              variant="button"
              color="inherit"
              href="https://www.sggw.pl/"
              className={classes.link}
            >
              SGGW
            </Link>

            <Link
              variant="button"
              color="inherit"
              href="https://github.com/MikolajczukKamil"
              className={classes.link}
            >
              GitHub
            </Link>

            <Link
              variant="button"
              color="inherit"
              href="https://www.linkedin.com/in/kamil-miko%C5%82ajczuk-61682b16a/"
              className={classes.link}
            >
              LinkedIn
            </Link>
          </nav>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Ceny
        </Typography>

        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Wydział Zastosowań Informatyki i Matematyki zaprasza na wykład pt.
          <cite>
            <br />
            Architektura heksagonalna czyli mikroserwisowe podejście do dużych
            projektów,
            <br />
          </cite>
          który odbędzie się 8 grudnia 2020 17.00 - 18.30 w auli 4.
          <br />
          Wykład poprowadzony zostanie przez studenta Kamila Mikołajczuka.
          <br />
          Podczas wykładu, który będzie miał charakter popularyzatorski, autor
          przybliży w prosty i przystępny sposób meandry architektury
          heksagonalnej
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={6}
              md={4}
              className={classes.gridCard}
            >
              <Card className={classes.card}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.pro ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent className={classes.flex1}>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {tier.price} PLN
                    </Typography>
                  </div>

                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>

                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant as any}
                    color="primary"
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://github.com/MikolajczukKamil">
            Kamil Mikołajczuk
          </Link>{" "}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </React.Fragment>
  )
}
