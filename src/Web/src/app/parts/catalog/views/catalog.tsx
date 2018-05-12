import * as React from 'react';
import { observer } from 'mobx-react';
import { hot } from 'react-hot-loader';
import glamorous from 'glamorous';

import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { inject, models } from '../../../utils';
import { Using, Field, Formatted } from '../../../components/models';

import { StoreType } from '../../../stores';
import { CatalogStoreModel, CatalogStoreType } from '../stores/catalog';

interface CatalogProps {
  store?: CatalogStoreType;
}

const styles = (theme: Theme) => ({
  flex: {
    flex: 1
  },
  shadow4: {
    'box-shadow': '0 4px 2px -2px gray'
  },
  noProduct: {
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: '64.86%', // 370x240
  },
  button: {
    margin: theme.spacing.unit,
  }
});

@observer
class CatalogView extends React.Component<CatalogProps & WithStyles<'flex' | 'shadow4' | 'button' | 'noProduct' | 'media' | 'card'>, {}> {

  private pullProducts = () => {
    const { store } = this.props;
    store.get();
  }

  public render() {
    const { store, classes } = this.props;

    const AppView = glamorous('div')((_) => ({
      flex: '1 1 auto',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    }));
    const MainView = glamorous('main')({
      'width': '75vw',
      'flex': '1',
      'marginTop': 20,
      '@media(max-width: 600px)': {
        margin: 10
      }
    });

    const products = Array.from(store.products.values());
    return (
      <AppView>
        <AppBar position='static' color='secondary' className={classes.shadow4}>
          <Toolbar>
            <Using model={store}>
              <Grid container>
                <Grid item md={4} xs={12}>
                  <Grid container spacing={24}>
                    <Grid item xs={5}>
                      <Field field='catalogBrand' />
                    </Grid>
                    <Grid item xs={5}>
                      <Field field='catalogType' />
                    </Grid>
                    <Grid item xs={2}>
                      <Button className={classes.button} variant='raised' size='small' color='primary' onClick={this.pullProducts}><KeyboardArrowRight /></Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Using>
          </Toolbar>
        </AppBar>
        <MainView>
          {products.length === 0 ?
            <Grid container justify='center'>
              <Grid item xs={4}>
                <Typography variant='display3' className={classes.noProduct}>No products found</Typography>
              </Grid>
            </Grid>
             :
            <Grid container spacing={16} justify='flex-start' alignItems='flex-start'>
              {products.map((product, key) => (
                <Grid item xs key={key}>
                  <Using model={product}>
                    <Card className={classes.card}>
                      <CardMedia className={classes.media} title={product.name} image={product.productPicture || require('../img/placeholder.png')} />
                      <CardContent>
                        <Typography gutterBottom variant='headline' component='h2' className={classes.flex} noWrap>
                          {product.name}
                        </Typography>
                        <Formatted field='price' />
                        <Typography component='p'>
                          {product.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button color='primary' variant='raised' fullWidth className={classes.button} disabled={!product.canOrder}>Add to Cart</Button>
                      </CardActions>
                    </Card>
                  </Using>
                </Grid>
              ))}
            </Grid>
          }
        </MainView>
      </AppView>
    );
  }
}

export default hot(module)(withStyles(styles)(CatalogView));