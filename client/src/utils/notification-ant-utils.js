import PropTypes from 'prop-types';
import notification from "antd/lib/notification";


function antNotificationComponent({type = 'success', description, duration, placement, destroy, icon, ...rest}) {
    if (destroy) {
        notification.destroy()
    }
    const message = type[0].toUpperCase() + type.slice(1)
    notification[type]({
        message, description, duration, placement,
        style: {}
    });
}

antNotificationComponent.defaultProps = {
    type: "success",
    message: 'Success',
    description: "Message",
    duration: 2000,
    placement: "topRight",
};

antNotificationComponent.propTypes = {
    type: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.number,
    placement: PropTypes.string,
    destroy: PropTypes.bool
}


export default antNotificationComponent