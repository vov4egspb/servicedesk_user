import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faPaperclip,
    faUserSecret,
    faFilter,
    faCopy,
    faFileDownload,
    faEnvelope,
    faCheck,
    faTimes,
    faSpinner,
    faQuestionCircle,
    faChevronDown,
    faChevronUp,
    faClock,
    faThLarge,
    faBookmark,
    faChartBar,
    faEye,
    faDollarSign,
    faChevronRight,
    faChevronLeft,
    faMobileAlt,
    faDesktop,
    faStarOfLife,
    faTrashAlt,
    faSmileBeam,
    faBars,
    faSignOutAlt,
    faUserShield,
    faComments,
    faUserCog,
    faUsersCog,
    faList,
    faHistory,
    faTachometerAlt,
    faCog,
    faCalendarAlt,
    faEllipsisV,
    faComment
    
    
} from '@fortawesome/free-solid-svg-icons'


import { faSmile } from '@fortawesome/free-regular-svg-icons'

library.add(
    faPaperclip,
    faComment,
    faEllipsisV,
    faCalendarAlt,
    faCog,
    faTachometerAlt,
    faHistory,
    faList,
    faUserCog,
    faUsersCog,
    faComments,
    faUserShield,
    faSignOutAlt,
    faBars,
    faSmile,
    faTrashAlt,
    faStarOfLife,
    faUserSecret,
    faFilter,
    faCopy,
    faFileDownload,
    faEnvelope,
    faCheck,
    faTimes,
    faSpinner,
    faQuestionCircle,
    faChevronDown,
    faChevronUp,
    faClock,
    faThLarge,
    faBookmark,
    faChartBar,
    faEye,
    faDollarSign,
    faChevronRight,
    faChevronLeft,
    faMobileAlt,
    faDesktop,
    faSmileBeam
)

const fontAwesome = {
    install(Vue) {
        Vue.component('font-awesome-icon', FontAwesomeIcon)
    }
}

export default fontAwesome
