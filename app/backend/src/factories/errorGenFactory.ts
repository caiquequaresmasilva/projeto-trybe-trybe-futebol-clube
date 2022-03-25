import StatusCode from '../enums/StatusCode';
import { ErrorGen } from '../utils';

export default () => new ErrorGen(StatusCode);
