import moment from 'moment';

export function formatTime(dateString) {
    return moment(dateString).format('HH:mm');
}
