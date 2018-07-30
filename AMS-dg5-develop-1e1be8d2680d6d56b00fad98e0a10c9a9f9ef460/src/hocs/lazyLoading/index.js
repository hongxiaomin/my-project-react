import Loadable from 'react-loadable';
import { Loading } from '@delta/common-utils';

const lazyLoading = loader => (
  Loadable({
    loader,
    loading: Loading,
  })
);

export default lazyLoading;
