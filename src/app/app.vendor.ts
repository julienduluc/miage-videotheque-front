import {
  faArrowLeft,
  faAsterisk,
  faAtom,
  faBan,
  faBars,
  faBell,
  faBook,
  faCalendarAlt,
  faClock,
  faCloud,
  faDatabase,
  faEdit,
  faExclamationCircle,
  faEye,
  faEyeDropper,
  faEyeSlash,
  faFlag,
  faFolder,
  faHdd,
  faHeart,
  faHome,
  faList,
  faLock,
  faPencilAlt,
  faPlus,
  faRoad,
  faSave,
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faSort,
  faSortDown,
  faSortUp,
  faSync,
  faTachometerAlt,
  faTasks,
  faThList,
  faTimes,
  faTrashAlt,
  faUser,
  faUserCircle,
  faUserPlus,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';

export function vendors(library: any) {
  // Adds the SVG icon to the library so you can use it in your page
  library.addIcons(faUser, faSort, faSortUp, faSortDown, faSync, faEye,
    faBan, faTimes, faArrowLeft, faSave, faPlus, faPencilAlt,
    faBars, faHome, faThList, faUserPlus, faRoad, faTachometerAlt,
    faHeart, faList, faBell, faTasks, faBook, faHdd, faFlag,
    faWrench, faClock, faCloud, faSignOutAlt, faSignInAlt,
    faCalendarAlt, faSearch, faTrashAlt, faAsterisk,
    faLock, faEyeSlash, faEyeDropper, faFolder, faEdit,
    faAtom, faDatabase, faUserCircle, faExclamationCircle);
}
